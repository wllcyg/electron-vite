import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

// 这是测试用例
@Entity()
export class GoodsColum {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text') // 名称
  ordername: string

  @Column('text') //规格
  specification: string
  /**
   * category
   * @param
   *
   * */
  @Column('int') // 类别
  category: number
}