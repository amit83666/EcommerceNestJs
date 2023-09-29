import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProviders } from './product.provider';
import { DatabaseModule } from 'src/database/database.module';
import { categoryProviders } from 'src/category/category.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [ProductController],
  providers: [
    ...categoryProviders,
    ...productProviders,
    ProductService],
}) 
export class ProductModule {}
