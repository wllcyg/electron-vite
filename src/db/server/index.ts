import { AppDataSource } from '../index';
import { GoodsColum } from '../model/goodsColum';

type OrderEntityType = typeof GoodsColum;
const orderType: Record<string, OrderEntityType> = {
  'GoodsColum': GoodsColum
};

export class DbConfig {
// 插入数据操作
  async save({ type, data }: { type: keyof typeof orderType; data: any[] }) {
    return await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(orderType[type])
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .values([data])
      .execute();
  }
}

const dbConfig = new DbConfig();
export default dbConfig;