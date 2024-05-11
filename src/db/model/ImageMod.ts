
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ImageMode {

  @PrimaryGeneratedColumn()
  id: number


  @Column('text', { nullable: true })
  url: string | null;


  @Column('text', { nullable: true })
  type: string | null;

}