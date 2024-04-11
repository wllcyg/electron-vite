import { GoodsColum } from 'app/src-electron/db/mode/goods_base_colum';
import { AppDataSource } from 'app/src-electron/db/source';
const orderType = {
  'goods': GoodsColum,
}
 class DbConfig {
// 插入数据操作
  async save({ type, data }) {
    return await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(orderType[type])
      .values([data])
      .execute()
  }
}

const dbConfig = new DbConfig()
export default dbConfig
