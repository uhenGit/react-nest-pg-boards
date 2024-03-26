import {
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BoardService } from './boards.service';
import { CreateBoardDto } from './dto';
import { BoardType } from './boards.types';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post('load-board')
  @HttpCode(HttpStatus.OK)
  async loadBoard(
    @Body('boardId') boardId: string,
  ): Promise<BoardType | HttpStatus> {
    return this.boardService.loadBoardById(boardId);
  }

  @Post('create-board')
  @HttpCode(HttpStatus.CREATED)
  async createBoard(@Body() dto: CreateBoardDto): Promise<BoardType> {
    return this.boardService.createBoard(dto);
  }

  @Patch('update-board')
  @HttpCode(HttpStatus.OK)
  async updateBoard(
    @Body('boardName') boardName: string,
    @Body('boardId') id: string,
  ): Promise<BoardType> {
    return this.boardService.updateBoard(boardName, id);
  }

  @Delete('delete-board/:id')
  @HttpCode(HttpStatus.OK)
  async deleteBoard(@Param('id') id: string): Promise<BoardType> {
    return this.boardService.deleteBoard(id);
  }
}
