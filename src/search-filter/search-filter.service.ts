import { Injectable } from '@nestjs/common';
import { CreateSearchFilterDto } from './dto/create-search-filter.dto';
import { UpdateSearchFilterDto } from './dto/update-search-filter.dto';

@Injectable()
export class SearchFilterService {
  create(createSearchFilterDto: CreateSearchFilterDto) {
    return 'This action adds a new searchFilter';
  }

  findAll() {
    return `This action returns all searchFilter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} searchFilter`;
  }

  update(id: number, updateSearchFilterDto: UpdateSearchFilterDto) {
    return `This action updates a #${id} searchFilter`;
  }

  remove(id: number) {
    return `This action removes a #${id} searchFilter`;
  }
}
