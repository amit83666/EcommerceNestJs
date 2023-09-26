import { Module } from '@nestjs/common';
import { SearchFilterService } from './search-filter.service';
import { SearchFilterController } from './search-filter.controller';

@Module({
  controllers: [SearchFilterController],
  providers: [SearchFilterService],
})
export class SearchFilterModule {}
