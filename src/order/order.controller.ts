import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Public } from 'src/auth/public-auth.guard';
import { OrderHistoryDto } from './dto/order-history.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':userId')
  @Public()
  async getOrderHistory(@Param('userId') userId: number): Promise<OrderHistoryDto[]>{
    console.log("userid comtroller ", userId);
    return this.orderService.getOrderHistoryForUser(userId);
  } 

  @Post(':id/update-status')
  @Public()
  async updateOrderStatus(
    @Param('id') id:number,
    @Body('status') newStatus:string,
  ){
    const updatedOrder = await this.orderService.updateOrderStatus(id, newStatus);
    return updatedOrder;
  }

  @Put(':id/calculate-total')
  @Public()
  async calculateAndUpdateOrderTotal(@Param('id') id:number){
    const updatedOrder =await this.orderService.calculateAndUpdateOrderTotal(id);
    return updatedOrder;
  }

  @Post()
  @Public()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
  
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }



}
