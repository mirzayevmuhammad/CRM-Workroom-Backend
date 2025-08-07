import { Injectable, Logger } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
@Injectable()
export class SeedersService implements OnModuleInit {
  username: string;
  password: string;
  public logger: Logger = new Logger(SeedersService.name);
  constructor(
    private db: PrismaService,
    private configService: ConfigService,
  ) {
    this.username = this.configService.get('SUPER_ADMIN_USERNAME') as string;
    this.password = this.configService.get('PASSWORD') as string;
  }
  onModuleInit() {
    this.initSeeder();
  }
  async initSeeder() {
    try {
      await this.checkExistingAdmin();
      await this.createAdmin();
      this.logger.log('Create Admin!')
    } catch (error) {
      this.logger.log(error.message);
    }
  }
  async checkExistingAdmin() {
    const findAdmin = await this.db.prisma.user.findFirst({
      where: {
        username: this.username,
      },
    });
    if (!findAdmin) {
      throw new Error('Admin Existed!');
    }
  }
  async createAdmin() {
    const hachedPassword = await bcrypt.hash(this.password, 12);
    await this.db.prisma.user.create({
      data: { username: this.username, password: hachedPassword },
    });
  }
}