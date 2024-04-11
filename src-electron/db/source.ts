import { DataSource } from 'typeorm';
import { GoodsColum } from 'app/src-electron/db/mode/goods_base_colum';
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'test1',
  synchronize: true,
  logging: false,
  entities: [GoodsColum],
});
