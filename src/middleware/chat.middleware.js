const OpenAI = require("openai");

const openai = new OpenAI({
  // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",千问大模型
  apiKey: "sk-05df9fce51c643d09e263bf0a858df7a",
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

async function openaiMiddleware(ctx, next) {
  const { content } = ctx.request.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "qwen-max", // 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
      messages: [
        { role: "system", content: "你是kiripet的智能助手，名叫鬼塚夏美，你也可以称呼我kiri" },
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

module.exports = {
  openaiMiddleware,
};
