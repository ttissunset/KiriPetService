const logger = require("../config/logger");
const seq = require('../db/seq')


class MessageService {
  /**
   * 创建聊天表
   * @param {string} chatId - 聊天ID
   */
  static async createChatTable(chatId) {
    try {
      await seq.query("USE chat;");
      await seq.query(`
        CREATE TABLE IF NOT EXISTS chat_${chatId} (
          id INT PRIMARY KEY AUTO_INCREMENT,
          sender_id VARCHAR(50) NOT NULL,
          receiver_id VARCHAR(50) NOT NULL,
          chat_id VARCHAR(50) NOT NULL,
          message_type ENUM('text', 'file') NOT NULL,
          content TEXT,
          file_url VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_chat_id (chat_id)
        )
      `);
      logger.info(`创建聊天表成功: chat_${chatId}`);
    } catch (error) {
      logger.error(`创建聊天表失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * 发送文件消息
   * @param {Object} messageData - 消息数据
   */
  static async sendFile(messageData) {
    const { chat_id, sender_id, receiver_id, file_url } = messageData;

    try {
      await seq.query("USE chat;");
      await this.createChatTable(chat_id);

      // 先插入数据
      const [result] = await seq.query(
        `
          INSERT INTO chat_${chat_id} 
          (sender_id, receiver_id, chat_id, message_type, file_url) 
          VALUES (?, ?, ?, 'file', ?)
        `,
        {
          replacements: [sender_id, receiver_id, chat_id, file_url],
        }
      );

      // 获取插入的数据
      const [insertedMessage] = await seq.query(
        `
          SELECT * FROM chat_${chat_id} WHERE id = LAST_INSERT_ID()
        `,
        {
          type: seq.QueryTypes.SELECT,
        }
      );

      return insertedMessage;
    } catch (error) {
      logger.error(`发送文件消息失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * 发送文本消息
   * @param {Object} messageData - 消息数据
   */
  static async sendMessage(messageData) {
    const { chat_id, sender_id, receiver_id, content } = messageData;

    try {
      await seq.query("USE chat;");
      await this.createChatTable(chat_id);

      // 先插入数据
      const [result] = await seq.query(
        `
          INSERT INTO chat_${chat_id} 
          (sender_id, receiver_id, chat_id, message_type, content) 
          VALUES (?, ?, ?, 'text', ?)
        `,
        {
          replacements: [sender_id, receiver_id, chat_id, content],
        }
      );

      // 获取插入的数据
      const [insertedMessage] = await seq.query(
        `
          SELECT * FROM chat_${chat_id} WHERE id = LAST_INSERT_ID()
        `,
        {
          type: seq.QueryTypes.SELECT,
        }
      );

      return insertedMessage;
    } catch (error) {
      logger.error(`发送文本消息失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * 获取聊天记录
   * @param {string} chatId - 聊天室ID
   */
  static async getMessages(chatId) {
    try {
      await seq.query("USE chat;");

      const messages = await seq.query(
        `
          SELECT * FROM chat_${chatId} 
          ORDER BY created_at ASC
        `,
        {
          type: seq.QueryTypes.SELECT,
        }
      );

      return messages;
    } catch (error) {
      // 如果表不存在，返回空数组
      if (error.original && error.original.code === "ER_NO_SUCH_TABLE") {
        return [];
      }
      logger.error(`获取聊天记录失败: ${error.message}`);
      throw error;
    }
  }
}

module.exports = MessageService;
