import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SearchFilterService } from './search-filter.service';
import { CreateSearchFilterDto } from './dto/create-search-filter.dto';
import { UpdateSearchFilterDto } from './dto/update-search-filter.dto';

@Controller('search-filter')
export class SearchFilterController {
  constructor(private readonly searchFilterService: SearchFilterService) {}

  @Post()
  create(@Body() createSearchFilterDto: CreateSearchFilterDto) {
    return this.searchFilterService.create(createSearchFilterDto);
  }

  @Get()
  findAll() {
    return this.searchFilterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchFilterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchFilterDto: UpdateSearchFilterDto) {
    return this.searchFilterService.update(+id, updateSearchFilterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchFilterService.remove(+id);
  }
}
