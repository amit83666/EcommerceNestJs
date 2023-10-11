import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @Inject('CART_REPOSITORY')
    private readonly cartRepository:Repository<Cart>,
    @Inject('CARTITEMS_REPOSITORY')
    private readonly cartItemRepository:Repository<CartItem>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<Product>,
  ){}
  async create(userId:number):Promise<Cart>{
    const cart = this.cartRepository.create({user:{userId}});
    return this.cartRepository.save(cart);
  }

  async findById(id: number):Promise<Cart | null>{
    return this.cartRepository.findOne({where:{id},relations:['cartItems']});
  }


  // async addItemToCart(id:number,addItemDto:AddCartItemDto):Promise<CartItem>{
  //   const user = await this.userRepository.findOne({where:{userId:id}, relations: ['carts'] });
  //   console.log("uuuuuser ", user);
  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found.`);
  //   }
  //   const product = await this.productRepository.findOne({where:{id:addItemDto.productId}});
  //   if (!product) {
  //     throw new NotFoundException(`Product with ID ${addItemDto.productId} not found.`);
  //   }
  //   console.log("product", product);

  //   const cartItem = this.cartItemRepository.create({

  //     product,
  //     quantity: addItemDto.quantity,
  //   });
  //   await this.cartItemRepository.save(cartItem);
  //   user.carts[0].cartItem.push(cartItem);
  //   await this.cartRepository.save(user.carts[0]);
    
  // return cartItem;
    // const addtoCart =  await this.cartRepository.findOne({where:{id:addItemDto.cartId}, relations:['cartItem'] })
    // console.log("addtoCart", addtoCart.cartItem);


    // const existingCartItem = user.cartItems.find((item) => item.product.id === addItemDto.productId);
    // const existingCartItem = user.

    // if (existingCartItem) {
      // If the product is already in the cart, update the quantity
    //   existingCartItem.quantity += addItemDto.quantity;
    //   await this.cartItemRepository.save(existingCartItem);
    //   return existingCartItem;
    // } else {
    //   // If the product is not in the cart, create a new cart item
    //   const newCartItem = this.cartItemRepository.create({
    //     user,
    //     product,
    //     quantity: addItemDto.quantity,
    //   });

    //   await this.cartItemRepository.save(newCartItem);
    //   return newCartItem;
    // return
  // }
  async addItemToCart(cartId : number, addItemDto:AddCartItemDto):Promise<CartItem>{
    const cart = await this.cartRepository.findOne({where:{id:cartId}, relations: ['cartItems']});
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} not found.`);
    }
    console.log("cart", cart);
    const product = await this.productRepository.findOne({where:{id:addItemDto.productId}});
    if (!product) {
      throw new NotFoundException(`Product with ID ${addItemDto.productId} not found.`);
    }
    console.log("product", product);
    const existingCartItem = cart.cartItems.find((item) => item.product.id === addItemDto.productId);
    console.log("existingCartItem",existingCartItem);
    
    if(existingCartItem){
      existingCartItem.quantity += addItemDto.quantity;
      return this.cartItemRepository.save(existingCartItem);
    }else{
      const newCartItem = this.cartItemRepository.create({
        cart,
        product,
        quantity:addItemDto.quantity
      })
    return this.cartItemRepository.save(newCartItem);
  }}
 
  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
