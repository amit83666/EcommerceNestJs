import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    cid: number;
  
    @Column()
    cname: string;
  
    @Column()
    cdescription: string;
    
    @ManyToMany(() => Product, (product) => product.categories)
    products: Product[];
}
