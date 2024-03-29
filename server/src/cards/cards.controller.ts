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
import { CardService } from './cards.service';
import { CreateCardDto } from './dto';
import { CardType } from './cards.types';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('create-card')
  @HttpCode(HttpStatus.CREATED)
  async createCard(@Body() dto: CreateCardDto): Promise<CardType> {
    return this.cardService.createCard(dto);
  }

  @Patch('update-card')
  @HttpCode(HttpStatus.OK)
  async updateCard(
    @Body('cardBody') dto: CreateCardDto,
    @Body('cardId') cardId: string,
  ): Promise<CardType> {
    return this.cardService.updateCard(dto, cardId);
  }

  @Patch('update-cards-order')
  @HttpCode(HttpStatus.OK)
  async updateCardsOrder(@Body() cards: CardType[]): Promise<boolean> {
    return this.cardService.updateCardsOrder(cards);
  }

  @Delete('delete-card/:boardId/:cardId')
  @HttpCode(HttpStatus.OK)
  async deleteCard(
    @Param('boardId') boardId: string,
    @Param('cardId') cardId: string,
  ): Promise<CardType> {
    return this.cardService.deleteCard(boardId, cardId);
  }
}
