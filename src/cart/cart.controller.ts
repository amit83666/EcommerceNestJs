import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Public } from 'src/auth/public-auth.guard';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @Public()
  async create(@Body('userId') userId:number) {
    return this.cartService.create(userId);
  }

  @Get(':id')
  @Public()
  async findAll(@Param('id') id:number) {
    return this.cartService.findById(id);
  }
  @Post(':userId/add-item')
  @Public()
  async addItemToCart(
    @Param('userId') userId:number,
    @Body() addItemDto:AddCartItemDto
  ){
    return this.cartService.addItemToCart(userId, addItemDto);
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
}
