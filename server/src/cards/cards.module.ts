import { Module } from '@nestjs/common';
import { CardController } from './cards.controller';
import { CardService } from './cards.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CardController],
  providers: [CardService, PrismaService],
})
export class CardModule {}
