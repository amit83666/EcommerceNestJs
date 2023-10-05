import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
 
  constructor(
    @Inject('USER_REPOSITORY') 
    private userRepository: Repository<User>,
){}
  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
  findById(id: any) {
    return this.userRepository.findOne({where:{userId:id}});
    // throw new Error('Method not implemented.');
  }
  findAll() {
    return `This action returns all user`;
  }
  //login
  async findOne(email: string) {
    return this.userRepository.findOne({where:{email}});
  }

  update(userId: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${userId} user`;
  }
  updatePass(updateUserDto: UpdateUserDto){
    return this.userRepository.save(updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
