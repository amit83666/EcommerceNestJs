import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
// Placing orders and order history.
// Updating order status (e.g., marking as shipped).
// Calculating order totals.
@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY') 
    private orderRepository: Repository<Order>,
    @Inject('USER_REPOSITORY') 
    private userRepository: Repository<User>,
    private readonly productService: ProductService
){}
  async create(createOrderDto: CreateOrderDto) {
    const userid = 1;
    const {products, ...orderData } = createOrderDto;


    const user = await this.userRepository.findOne({
      where:{userId:userid},
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userid} not found.`);
    }
    const orderProducts = await Promise.all(
      products.map(async (productItem) => {
        const product = await this.productService.findOne(productItem.productId);
        if (!product) {
          throw new NotFoundException(`Product with ID ${productItem.productId} not found.`);
        }
        return product;
      }),
    );   
    console.log("createOrderDto",createOrderDto);
    const newOrder = this.orderRepository.create({...orderData,user,products:orderProducts});
    return this.orderRepository.save(newOrder);
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
