import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

//=Prisma====================================================

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  // envFilePath: '.env', 
});

//=====================================================

@Module({
  imports: [UsersModule, configModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
