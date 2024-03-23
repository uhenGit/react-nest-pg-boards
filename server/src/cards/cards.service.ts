import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto';
import { CardType } from './cards.types';

@Injectable({})
export class CardService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCardsByBoardId(boardId: string): Promise<CardType[]> {
    try {
      return this.prismaService.card.findMany({
        where: {
          boardId,
        },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: 'Get cards error',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: err,
        },
      );
    }
  }

  async createCard(dto: CreateCardDto): Promise<CardType> {
    try {
      return this.prismaService.card.create({
        data: {
          ...dto,
          status: 'todo',
        },
      });
    } catch (err) {
      // some kind of fix exists on github, but unsuccess in this case
      // https://github.com/prisma/prisma/issues/17945
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('ERROR Create: ', err.message);
        return null;
      }

      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateCard(dto: CreateCardDto, cardId: string): Promise<CardType> {
    try {
      return this.prismaService.card.update({
        where: {
          id: cardId,
        },
        data: {
          title: dto.title,
          description: dto.description,
          status: dto.status,
        },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCard(boardId: string, cardId: string): Promise<CardType> {
    try {
      return this.prismaService.card.delete({
        where: {
          boardId,
          id: cardId,
        },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: 'Delete card error',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
