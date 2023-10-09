import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { OrderHistoryDto } from './dto/order-history.dto';
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
    private readonly productService: ProductService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const userid = 1;
    const { products, ...orderData } = createOrderDto;

    const user = await this.userRepository.findOne({
      where: { userId: userid },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userid} not found.`);
    }
    const orderProducts = await Promise.all(
      products.map(async (productItem) => {
        const product = await this.productService.findOne(
          productItem.productId,
        );
        if (!product) {
          throw new NotFoundException(
            `Product with ID ${productItem.productId} not found.`,
          );
        }
        return product;
      }),
    );
    const newOrder = this.orderRepository.create({
      ...orderData,
      user,
      products: orderProducts,
    });
    return this.orderRepository.save(newOrder);
  }

  async getOrderHistoryForUser(userId: number): Promise<OrderHistoryDto[]> {
    const orders = await this.orderRepository.find({
      where: { user: { userId } },
      select: ['orderID', 'orderDate', 'totalAmount'],
      order: { orderDate: 'DESC' },
    });
    return orders.map((order) => ({
      orderId: order.orderID,
      orderDate: order.orderDate,
      totalAmount: order.totalAmount,
    }));
  }

  async updateOrderStatus(OrderID: number, newStatus: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { orderID: OrderID },
    });
    if (!order) {
      throw new Error(`Order with ID ${OrderID} not found`);
    }
    order.orderStatus = newStatus;
    const updatedOrder = await this.orderRepository.save(order);
    return updatedOrder;
  }

  async calculateAndUpdateOrderTotal(orderID: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { orderID: orderID },
      relations: ['products'],
    });
    if (!order) {
      throw new Error(`Order with ID ${orderID} not found.`);
    }
    let totalAmount = 0;
    for (const product of order.products) {
      totalAmount += +product.price * +product.quantity;
    }
    order.totalAmount = totalAmount;
    const updatedOrder = await this.orderRepository.save(order);
    return updatedOrder;
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
