import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';
import { SeedersService } from '../seeders/seeders.service';

@Module({
  imports: [],
  providers: [PrismaService, RedisService, SeedersService],
  exports: [PrismaService, RedisService],
})
export class DatabaseModule {}
