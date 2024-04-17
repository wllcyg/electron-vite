import { ILike } from 'typeorm';

import { AppDataSource } from '../index';
import { GoodsColum } from '../model/goodsColum';
import { OrderList } from '@/db/model/OrderList';
import { OrderLog } from '@/db/model/OrderLog';
import { ResType } from '@/pages/type';
interface Params {
  [key: string]: any; // 定义字符串类型的索引签名
}
type OrderEntityType = typeof GoodsColum;
const orderType: Record<string, OrderEntityType> = {
  'GoodsColum': GoodsColum,
  'OrderList': OrderList,
  'OrderLog': OrderLog
};

export class DbConfig {
// 插入数据操作
  resSucess: ResType = { code: 200, msg: '操作成功!' };
  resError: ResType = { code: 203, msg: '操作失败请稍后!' };
  private _page: number;
  private _size: number;

  async save({ type, data }: { type: keyof typeof orderType; data: any[] }) {

    return new Promise((resolve, reject) => {
      AppDataSource
        .createQueryBuilder()
        .insert()
        .into(orderType[type])
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .values([data])
        .execute().then(e => {
        resolve(this.resSucess);
      }).catch(e => {
        reject(this.resError);
      });
    });
  }

  async findValue({ type = 'OrderList', page = 1, size = 10, params={} }) {
    return new Promise((resolve, reject) => {
      const queryBuilder = AppDataSource
        .getRepository(orderType[type])
        .createQueryBuilder(type);
      Object.keys(params).forEach((column,index) => {
        if (params[column]){
          if (index === 0) {
            queryBuilder.where({[`${column}`]:ILike(`%${params[column]}%`)});
          }else{
            queryBuilder.andWhere({[`${column}`]:ILike(`%${params[column]}%`)})
          }
        }
      });
      queryBuilder
        .skip((size * (page - 1)))
        .take(size)
        .getManyAndCount()
        .then(e => {
          resolve({ ...this.resSucess, data: { result: e[0], count: e[1] } });
        }).catch(() => {
        reject(this.resError);
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  findOne({ type = 'OrderList', id }) {
    console.log(type, id, 'OrderListOrderListOrderList');
    return new Promise((resolve, reject) => {
      AppDataSource
        .getRepository(orderType[type])
        .createQueryBuilder(type)
        .where({ id })
        .getOne()
        .then(e => {
          resolve({ ...this.resSucess, data: e });
        })
        .catch(err => {
          reject(this.resError);
          console.log(err);
        });
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  updateValue({ type = 'OrderList', data }) {
    console.log('OrderList111111', data);
    return new Promise((resolve, reject) => {
      AppDataSource
        .createQueryBuilder()
        .update(orderType[type])
        .set(data)
        .where({ id: data.id })
        .execute()
        .then(() => {
          resolve(this.resSucess);
        })
        .catch(() => {
          reject(this.resError);
        });
    });
  }

  //  删除数据
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  deleteItem({ type = 'OrderList', id }) {
    return new Promise((resolve, reject) => {
      AppDataSource
        .createQueryBuilder()
        .delete()
        .from(orderType[type])
        .where({ id })
        .execute()
        .then(() => {
          resolve(this.resSucess);
        })
        .catch(() => {
          reject(this.resError);
        });

    });
  }
}

const dbConfig = new DbConfig();
export default dbConfig;
