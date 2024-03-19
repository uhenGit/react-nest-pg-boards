import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BoardModule } from './boards/boards.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BoardModule,
    PrismaModule,
  ],
})
export class AppModule {}
