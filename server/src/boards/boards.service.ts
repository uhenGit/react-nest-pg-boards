import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardDto } from './dto';
import { BoardType } from './boards.types';
import { createHash } from 'crypto';

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

  async createBoard(dto: CreateBoardDto): Promise<BoardType> {
    try {
      const uniqBoardName = `${dto.boardName}${Date.now()}`;
      const hashedName = createHash('sha1')
        .update(uniqBoardName)
        .digest('base64');
      return this.prismaService.board.create({
        data: {
          boardId: hashedName,
          boardName: dto.boardName,
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
