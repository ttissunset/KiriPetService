const OpenAI = require("openai");
const logger = require("../config/logger");
const { ossClient } = require("../db/oss");
const MessageService = require("../service/chat.service");
const path = require("path");
const crypto = require("crypto");

const openai = new OpenAI({
  // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",千问大模型
  apiKey: "sk-0c301be023514633ad8571be75cafbad",
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

// ai聊天中间件
async function openaiMiddleware(ctx, next) {
  const { content } = ctx.request.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "qwen-max", // 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
      messages: [
        {
          role: "system",
          content: "你是kiripet的智能助手，名叫鬼塚夏美，你也可以称呼我kiri",
        },
        { role: "user", content: content },
      ],
    });

    // 将API的响应数据存储到上下文对象中
    ctx.body = {
      code: 0,
      msg: "连接chat成功",
      result: {
        chatReply: completion.choices[0].message.content,
      },
    };
    // 输出结果到控制台
    console.log(JSON.stringify(completion.choices[0].message.content));

    // 继续执行下一个中间件
    await next();
  } catch (error) {
    // 错误处理
    console.error("Error with OpenAI API:", error);
    ctx.status = 500;
    ctx.body = { error: "Failed to communicate with OpenAI API" };
  }
}

//  带重试的文件上传函数
async function uploadWithRetry(ossPath, fileContent, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await ossClient.put(ossPath, fileContent, options);
      return result;
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      // 计算延迟时间，随重试次数增加
      const delay = Math.min(1000 * Math.pow(2, i), 10000);
      await new Promise((resolve) => setTimeout(resolve, delay));

      logger.warn(`文件上传重试 ${i + 1}/${maxRetries}`);
    }
  }
}

// OSS 文件上传中间件
const ossUpload = async (ctx, next) => {
  try {
    if (!ctx.request.files || !ctx.request.files.file) {
      ctx.throw(400, "没有上传文件");
    }

    const file = ctx.request.files.file;
    const originalName = file.originalFilename || file.name || "unknown";
    const ext = path.extname(originalName);
    const fileName = `${crypto.randomBytes(16).toString("hex")}${ext}`;
    const ossPath = `chat-files/${fileName}`;

    // 获取文件内容
    let fileContent;
    if (file.buffer) {
      fileContent = file.buffer;
    } else if (typeof file.filepath === "string") {
      fileContent = require("fs").readFileSync(file.filepath);
    } else {
      throw new Error("无法读取文件内容");
    }

    // 检查文件大小
    const fileSize = fileContent.length;
    if (fileSize > 200 * 1024 * 1024) {
      // 200MB
      ctx.throw(400, "文件大小超过限制");
    }

    // 使用带重试的上传函数
    const result = await uploadWithRetry(ossPath, fileContent, {
      headers: {
        "Content-Type": file.mimetype || "application/octet-stream",
      },
      // 根据文件大小设置超时时间
      timeout: Math.max(60000, fileSize / 1024), // 至少60秒，每KB增加1毫秒
      progress: (p, checkpoint) => {
        logger.info(`上传进度: ${(p * 100).toFixed(2)}%`);
      },
    });

    ctx.request.body.file_url = result.url;
    logger.info(`文件上传成功: ${result.url}`);

    await next();
  } catch (error) {
    logger.error("文件上传失败:", error);
    ctx.throw(500, `文件上传失败: ${error.message}`);
  }
};

// 发送聊天信息
const sendMsg = async (ctx) => {
  try {
    // 验证必要参数
    const { sender_id, receiver_id, chat_id, content } = ctx.request.body;
    if (!sender_id || !receiver_id || !chat_id || !content) {
      ctx.throw(400, "缺少必要参数");
    }

    const result = await MessageService.sendMessage(ctx.request.body);

    ctx.body = {
      success: true,
      data: result,
    };
    console.log(ctx.request.body);
    logger.info("发送消息成功");
  } catch (error) {
    console.log(ctx.request.body);
    logger.error("发送文本消息失败:", error);
    ctx.throw(500, error.message);
  }
};

// 发送文件
const sendFile = async (ctx) => {
  try {
    // 验证必要参数
    const { sender_id, receiver_id, chat_id } = ctx.request.body;

    if (!sender_id || !receiver_id || !chat_id) {
      ctx.throw(400, "缺少必要参数");
    }

    const result = await MessageService.sendFile(ctx.request.body);

    ctx.body = {
      success: true,
      data: result,
    };
    console.log(ctx.request.body);
    logger.info("发送文件成功");
  } catch (error) {
    console.log(ctx.request.body);
    logger.error("发送文件消息失败:", error);
    ctx.throw(500, error.message);
  }
};

// 根据Chat_id 获取当前聊天室的聊天内容
const getMsgByChatid = async (ctx) => {
  try {
    const chatId = ctx.params.id;
    if (!chatId) {
      ctx.throw(400, "缺少聊天ID");
    }

    const messages = await MessageService.getMessages(chatId);

    ctx.body = {
      success: true,
      data: messages,
    };
    logger.info("获取聊天消息成功");
  } catch (error) {
    logger.error("获取聊天记录失败:", error);
    ctx.throw(500, error.message);
  }
};

module.exports = {
  openaiMiddleware,
  ossUpload,
  sendMsg,
  sendFile,
  getMsgByChatid,
};
