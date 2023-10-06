import { Module } from '@nestjs/common';
import { PasswordresetService } from './passwordreset.service';
import { PasswordresetController } from './passwordreset.controller';
import { passwordResetProviders } from './passwordreset.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { userProviders } from 'src/user/user.provider';
import { TokenService } from 'src/shared/token.service';
import { CustumConfigModule } from 'src/config/config.module';
import { CustumConfigService } from 'src/config/config.service';
import { ConfigService } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [DatabaseModule, UserModule, CustumConfigModule, EmailModule],
  controllers: [PasswordresetController],
  providers: [
    PasswordresetService,
    UserService,
    TokenService,
    CustumConfigService,
    ConfigService,
    EmailService,
    ...passwordResetProviders,
    ...userProviders,
  ],
})
export class PasswordresetModule {}
