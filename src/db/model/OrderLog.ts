import { GoodsColum } from '../model/goodsColum';
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

  //出库时间
  @Column('text')
  outOfWareDate: string;

  // 出库记录图片
  @Column('text',{nullable:true})
  imgUrl: string | null;

  //备注
  @Column('text',{nullable:true})
  remark: string | null;
}