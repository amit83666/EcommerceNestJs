import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { SearchFilterModule } from './search-filter/search-filter.module';
import { AdminModule } from './admin/admin.module';
import { UserService } from './user/user.service';
import { userProviders } from './user/user.provider';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PasswordresetModule } from './passwordreset/passwordreset.module';
import { ConfigModule } from '@nestjs/config';
import { CustumConfigModule } from './config/config.module';
import { SharedModule } from './shared/token.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    UserModule,
    CategoryModule,
    OrderModule,
    CartModule,
    PaymentModule,
    ReviewModule,
    SearchFilterModule,
    AdminModule,
    AuthModule,
    PasswordresetModule,
    CustumConfigModule,
    SharedModule,
    EmailModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath:".local.env"
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, ...userProviders],
})
export class AppModule {}
