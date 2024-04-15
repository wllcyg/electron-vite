import { Repository } from 'typeorm';
import { AppDataSource} from '../index';
import { GoodsColum } from '../model/goodsColum';
import { OrderList } from '@/db/model/OrderList';
import { OrderLog } from '@/db/model/OrderLog';
import { ResType } from '@/pages/type';
type OrderEntityType = typeof GoodsColum;
const orderType: Record<string, OrderEntityType> = {
  'GoodsColum': GoodsColum,
  'OrderList':OrderList,
  'OrderLog':OrderLog
};

export class DbConfig {
// 插入数据操作
  async save({ type, data }: { type: keyof typeof orderType; data: any[] }) {
    let res:ResType
    return new Promise((resolve,reject) => {
      AppDataSource
        .createQueryBuilder()
        .insert()
        .into(orderType[type])
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .values([data])
        .execute().then(e => {
          res = {code:200,msg:'操作成功!'}
          resolve(res)
      }).catch(e => {
          res = {code:203,msg:'操作失败请稍后!'}
          reject(res)
      });
    })
  }
  async pageList(){
    return new Promise((resolve,reject) => {

    })
  }
}

const dbConfig = new DbConfig();
export default dbConfig;
