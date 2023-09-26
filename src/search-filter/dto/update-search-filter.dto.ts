import { PartialType } from '@nestjs/mapped-types';
import { CreateSearchFilterDto } from './create-search-filter.dto';

export class UpdateSearchFilterDto extends PartialType(CreateSearchFilterDto) {}
