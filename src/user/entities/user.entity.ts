import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/order/entities/order.entity";
import { PasswordReset } from "src/passwordreset/entities/passwordreset.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number; 

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    roles:string;

    @OneToMany(()=> Order, order => order.user)
    orders:Order[];

    @OneToMany(() => PasswordReset, (passwordReset) => passwordReset.user)
    passwordResets: PasswordReset[];

    @OneToMany(()=> Cart, (cart)=> cart.user)
    carts:Cart[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}