import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}
  @Get()
  getListFilms() {
    return this.filmService.getAll();
  }
  @Get(':id/schedule')
  getFilmsSchedule(@Param('id') id: string) {
    return this.filmService.getSchedule(id);
  }
}
