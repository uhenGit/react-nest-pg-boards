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
import { CardService } from './cards.service';
import { CreateCardDto } from './dto';
import { CardType } from './cards.types';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('get-board-cards/:boardId')
  @HttpCode(HttpStatus.OK)
  async getCards(@Param('boardId') boardId: string): Promise<CardType[]> {
    const res = await this.cardService.getCardsByBoardId(boardId);
    console.log('GET: ', res);
    return res;
  }

  @Post('create-card')
  @HttpCode(HttpStatus.CREATED)
  async createCard(@Body() dto: CreateCardDto): Promise<CardType> {
    const res = await this.cardService.createCard(dto);
    console.log('CREATE: ', res);
    return res;
  }

  @Delete('delete-card/:boardId/:cardId')
  @HttpCode(HttpStatus.OK)
  async deleteCard(
    @Param('boardId') boardId: string,
    @Param('cardId') cardId: string,
  ): Promise<CardType> {
    const res = await this.cardService.deleteCard(boardId, cardId);
    console.log('DELETE: ', res);
    return res;
  }
}
