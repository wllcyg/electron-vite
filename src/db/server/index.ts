import { AppDataSource } from '../index';
import { GoodsColum } from '../model/goodsColum';
import { OrderList } from '@/db/model/OrderList';
import { OrderLog } from '@/db/model/OrderLog';
type OrderEntityType = typeof GoodsColum;
const orderType: Record<string, OrderEntityType> = {
  'GoodsColum': GoodsColum,
  'OrderList':OrderList,
  'OrderLog':OrderLog
};

export class DbConfig {
// 插入数据操作
  async save({ type, data }: { type: keyof typeof orderType; data: any[] }) {
    return new Promise((resolve,reject) => {
      AppDataSource
        .createQueryBuilder()
        .insert()
        .into(orderType[type])
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .values([data])
        .execute().then(e => {
        resolve({code:200,msg:'操作成功!'})
      }).catch(e => {
        reject({code:203,msg:'操作失败请稍后!'})
      });
    })
  }
}

const dbConfig = new DbConfig();
export default dbConfig;