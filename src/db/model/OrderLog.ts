import { GoodsColum } from '@/db/model/goodsColum';
import { Column, Entity } from 'typeorm';
@Entity()
export class OrderLog extends GoodsColum{

  @Column('real')
    // 售价
  sell: number;
  @Column('real')
    // 利润
  profit: number;
  // 出库数量
  @Column('decimal')
  outOfWare: number;

  //入库时间
  @Column('text')
  outOfWareDate: string;

  // 出库记录图片
  @Column('text')
  imgUrl: string;

  //备注
  @Column('text')
  remark: string;
}