import {Injectable} from '@nestjs/common';
import {sign} from 'jsonwebtoken';
import {ConfigService} from '@nestjs/config';




@Injectable()
export class TokenService {
    constructor(private configService:ConfigService){}

    generateToken(payload:any):string{
        const tokenSecret = this.configService.get<string>('TOKEN_SECRET');
        const expiresIn   = this.configService.get<number>('TOKEN_EXPIRATION');
        return sign(payload, tokenSecret, { expiresIn });
    }
    calculateExpiration(durationInSeconds: number): Date {
        const now = new Date();
        const expiration = new Date();
        expiration.setSeconds(now.getSeconds() + durationInSeconds);
        return expiration;
      }
      isTokenExpired(expirationDate: Date): boolean {
        const currentDate = new Date();
        return currentDate > expirationDate;
      }
}