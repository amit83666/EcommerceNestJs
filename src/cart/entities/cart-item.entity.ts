import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "src/product/entities/product.entity";


@Entity()
export class CartItem{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>Cart, (cart)=> cart.cartItems)
    cart:Cart;

    @ManyToOne(()=> Product, (product)=>product.cartItems)
    product:Product;

    @Column()
    quantity:number;
    
}