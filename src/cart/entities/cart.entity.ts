import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart-item.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> User, (user) =>user.carts)
    user:User;

    @OneToMany(()=> CartItem, (item)=> item.cart)
    cartItems:CartItem[];
}
