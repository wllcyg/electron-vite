import { GoodsColum } from '@/db/model/goodsColum';
import { Column, Entity } from 'typeorm';
@Entity()
export class OrderList extends GoodsColum{

  @Column('real')
  // 价格
  price: number;

  //数量
  @Column('decimal')
  count: number;

  //入库时间

  @Column('text')
  createdAt: string;

}