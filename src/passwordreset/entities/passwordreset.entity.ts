import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class PasswordReset {
  userUserId(userUserId: any) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User,(user) => user.passwordResets)
  user: User;

  @Column()
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
