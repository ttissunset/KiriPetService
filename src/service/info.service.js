const Info = require("../model/info.model");

class InfoService {
  // 添加宠物百科信息
  async createInfos(infos) {
    const res = await Info.create(infos);
    return res.dataValues;
  }

  // 更新宠物百科信息
  async upadetaInfos(id, infos) {
    // 通过 id 查询对应的宠物信息，并通过 ginfos 替代原有数据
    const res = await Info.update(goods, { where: { id } });
    // 如果有更新成功，则至少返回一条数据
    return res[0] > 0 ? true : false;
  }

  // 删除数据
  async removeInfos(id) {
    // 通过id删除数据表中宠物百科信息
    const res = await Info.destroy({ where: { id } });
    return res > 0 ? true : false;
  }

  //查询宠物百科中的信息
  async findInfos(pageNum, pageSize) {
    // 获取总数和获取分页数据
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Goods.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
    });

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
}

module.exports = new InfoService();
