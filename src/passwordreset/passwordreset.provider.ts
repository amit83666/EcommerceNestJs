import { DataSource } from 'typeorm';
import { PasswordReset } from './entities/passwordreset.entity';


export const passwordResetProviders = [
  {
    provide: 'PASSWORDRESET_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PasswordReset),
    inject: ['DATA_SOURCE'],
  },
];