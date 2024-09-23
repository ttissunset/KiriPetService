const User = require('../model/user.model')

class UserService {
  // 创建用户
  async createUser(user_name, password, email) {
    const res = await User.create({ user_name, password, email })

    return res.dataValues
  }

  async getUserinfo({ id, user_name, password, email, is_admin }) {
    // 定义where查询条件
    const whereOpt = {}

    // 判断是否传有对应的参数，如果有则即将该参数拷贝到 whereOpt 中
    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    // 通过 User.findOne() 获取查询到的第一条数据
    const res = await User.findOne({
      // 通过 attributes 数组中的特定属性值对数据表进行 select 查询
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      // where 查询条件
      where: whereOpt,
    })

    // 判断是否有返回结果
    return res ? res.dataValues : null
  }
}

module.exports = new UserService()
