const Router = require("koa-router");

const {
  openaiMiddleware,
  ossUpload,
  sendMsg,
  sendFile,
  getMsgByChatid,
} = require("../middleware/chat.middleware");

const router = new Router({ prefix: "/chat" });

// ai聊天
router.post("/chat", openaiMiddleware);

/**
 * 发送文件消息
 * POST /api/send-file
 */
router.post("/send-file", ossUpload, sendFile);

/**
 * 发送文本消息
 * POST /api/send-msg
 */
router.post("/send-msg", sendMsg);

/**
 * 获取聊天记录
 * GET /api/get-msgs/:id
 */
router.get("/get-msgs/:id", getMsgByChatid);

module.exports = router;
