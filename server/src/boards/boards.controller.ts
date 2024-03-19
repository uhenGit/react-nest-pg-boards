import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BoardService } from './boards.service';
import { BoardDto } from './dto';
import { BoardType } from './boards.types';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('get-board/:boardId')
  async getBoard(@Param('boardId') boardId: string): Promise<BoardType | null> {
    return this.boardService.getBoardById(boardId);
  }

  @Post('create-board')
  @HttpCode(HttpStatus.CREATED)
  async createBoard(@Body() dto: BoardDto): Promise<BoardType> {
    return this.boardService.createBoard(dto);
  }

  @Delete('delete-board/:id')
  @HttpCode(HttpStatus.OK)
  async deleteBoard(@Param('id') id: string): Promise<BoardType> {
    return this.boardService.deleteBoard(id);
  }
}
