import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PasswordReset } from './entities/passwordreset.entity';
import { CustumConfigService } from 'src/config/config.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PasswordresetService {
  constructor(
    @Inject('PASSWORDRESET_REPOSITORY')
    private passwordResetRepository: Repository<PasswordReset>,
    private configService: CustumConfigService,
    private readonly emailService: EmailService,
  ) {}

  async createToken(
    userId: number,
    token: string,
    expiresAt: Date,
  ): Promise<PasswordReset> {
    const passwordReset = this.passwordResetRepository.create({
      user: { userId: userId },
      token,
      expiresAt,
    });
    return this.passwordResetRepository.save(passwordReset);
  }

  async findByToken(token: string): Promise<PasswordReset | undefined> {
    return this.passwordResetRepository.findOne({ where: { token } });
  }

  async deleteToken(id: number): Promise<void> {
    await this.passwordResetRepository.delete(id);
  }
  async requestPasswordReset(email: string, token: string) {
    const resetLink = token;
    await this.emailService.sendPasswordResetEmail(email, resetLink);
  }
}
