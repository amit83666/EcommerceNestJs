import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderID: number;
  
    @Column()
    orderNumber: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    orderDate: Date;
    
    @Column({type:'decimal', precision:10, scale:2})
    totalAmount: number;

    @Column()
    orderStatus:string;//(e.g., 'Pending', 'Shipped', 'Delivered', 'Cancelled')

    @ManyToOne(()=> User, user => user.orders)
    @JoinColumn({ name: 'UserId' })
    user:User;

    @ManyToMany(()=>Product, product=> product.orders)
    products:Product[];
    
}
