import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from './order.provider';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/user/user.provider';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';
import { categoryProviders } from 'src/category/category.provider';

@Module({
  imports:[DatabaseModule, ProductModule],
  controllers: [OrderController],
  providers: [OrderService,
    ProductService,
  ...orderProviders,
  ...userProviders,
  ...productProviders,
  ...categoryProviders,
  ],
})
export class OrderModule {}
