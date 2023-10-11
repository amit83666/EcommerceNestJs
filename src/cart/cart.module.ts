import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cartProviders } from './cart.provider';
import { cartItemProviders } from './cartItems.provider';
import { productProviders } from 'src/product/product.provider';
import { userProviders } from 'src/user/user.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [CartController],
  providers: [CartService,
  ...cartProviders,
...cartItemProviders,
...productProviders,
...userProviders,
],
})
export class CartModule {}
