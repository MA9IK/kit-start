import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users as User } from './enteties/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(data: number | any): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: data });
  }

  async create(data: CreateUserDto): Promise<User> {
    try {
      return await this.usersRepository.save(data);
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const user = await this.findOne({ id: id });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      user.updated_at = new Date();

      if (data.email) {
        user.isEmailConfirmed = false;
      }

      Object.assign(user, data);
      await this.usersRepository.update(id, user);

      return {
        success: true,
        message: 'User updated successfully',
      };
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        'User already exists or user not found, please try again',
      );
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const user = await this.findOne({ id: id });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      await this.usersRepository.delete(id);
      return {
        success: true,
      };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('User not found');
    }
  }

  async markEmailAsConfirmed(email: string) {
    return await this.usersRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }

  async updatePassword(email: string, data: UpdatePasswordDto) {
    try {
      await this.usersRepository.update(
        { email },
        {
          password: await bcrypt.hash(data.password, 10),
          updated_at: new Date(),
        },
      );

      return {
        success: true,
        message: 'User updated successfully',
      };
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        'User already exists or user not found, please try again',
      );
    }
  }
}
