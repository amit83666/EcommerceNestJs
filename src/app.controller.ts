import { Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './auth/public-auth.guard';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService: AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req){
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
