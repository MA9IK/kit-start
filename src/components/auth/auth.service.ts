import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({
      email: email,
    });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findUser(data: object): Promise<any> {
    console.log(data);
    const user = await this.usersService.findOne(data);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async login(user: any) {
    const payload = {
      user: {
        id: user.user.id,
        email: user.user.email,
        name: user.user.name,
        created_at: user.user.created_at,
        updated_at: user.user.updated_at,
      },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: CreateUserDto) {
    data.password = await bcrypt.hash(data.password, 10);
    let response = await this.usersService.create(data);
    if (!response) {
      throw new UnauthorizedException('User already exists');
    }

    const { password, ...result } = response;
    return result;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return await this.usersService.update(id, data);
  }

  async deleteUser(id: string) {
    return await this.usersService.delete(id);
  }

  decodeToken(token: string): any {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  async verifyUser(token: string) {
    try {
      const decodedToken = this.decodeToken(token);
      if (!decodedToken) {
        throw new UnauthorizedException('User not found');
      }
      return await this.findUser({ id: decodedToken.user.id });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
