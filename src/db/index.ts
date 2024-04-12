import { DataSource } from 'typeorm'
import { GoodsColum } from './model/goodsColum';
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [GoodsColum],
})