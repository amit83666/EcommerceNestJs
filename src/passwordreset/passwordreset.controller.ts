import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { PasswordresetService } from './passwordreset.service';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/shared/token.service';
import { Public } from 'src/auth/public-auth.guard';
import { ResetPasswordDto } from './dto/ResetPassword.dto';

@Controller('passwordreset')
export class PasswordresetController {
  constructor(
    private readonly passwordresetService: PasswordresetService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('request')
  @Public()
  async requestPasswordReset(@Body() body: { email: string }): Promise<void> {
    const user = await this.userService.findOne(body.email);
    if (!user) {
      throw new NotFoundException(`User with email ${body.email} not found`);
    }
    const resetPayload = {
      userID: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    };
    const token = this.tokenService.generateToken(resetPayload);
    const expiresAt = this.tokenService.calculateExpiration(30000);
    const tdata = await this.passwordresetService.createToken(
      user.userId,
      token,
      expiresAt,
    );
    await this.passwordresetService.requestPasswordReset(
      user.email,
      tdata.token,
    );
  }
  @Post('reset/:token')
  @Public()
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    const passwordReset = await this.passwordresetService.findByToken(token);
    if (
      !passwordReset ||
      this.tokenService.isTokenExpired(passwordReset.expiresAt)
    ) {
      throw new NotFoundException('Invalid or expired token.');
    }
    const data = this.tokenService.verifyToken(token);
    const user = await this.userService.findById(data['userID']);
    if (!user) {
      throw new NotFoundException('User not Found.');
    }
    user.password = resetPasswordDto.newPassword;
    await this.userService.updatePass(user);
    await this.passwordresetService.deleteToken(passwordReset.id);
  }
}
