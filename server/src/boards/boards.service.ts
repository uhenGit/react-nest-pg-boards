import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BoardDto } from './dto';
import { BoardType } from './boards.types';

@Injectable({})
export class BoardService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBoardById(boardId: string): Promise<BoardType | null> {
    try {
      return this.prismaService.board.findFirst({
        where: {
          boardId,
        },
        include: {
          cards: true,
        },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: 'Broken board',
        },
        HttpStatus.I_AM_A_TEAPOT,
        {
          cause: err,
        },
      );
    }
  }

  async createBoard(dto: BoardDto): Promise<BoardType> {
    try {
      return this.prismaService.board.create({
        data: {
          boardId: dto.boardId,
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

  // broken id throws an unhandled error
  async deleteBoard(id: string): Promise<BoardType> {
    try {
      return this.prismaService.board.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: 'Delete board error',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: err,
        },
      );
    }
  }
}
