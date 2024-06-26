import { DataSource } from 'typeorm'
import { GoodsColum } from './model/goodsColum';
import { OrderLog } from './model/OrderLog';
import { OrderList } from './model/OrderList';
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'uat',
  synchronize: true,
  logging: false,
  entities: [GoodsColum,OrderLog,OrderList],
})