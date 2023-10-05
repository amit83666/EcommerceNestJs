import { PartialType } from '@nestjs/mapped-types';
import { CreatePasswordResetDto } from './create-passwordreset.dto';

export class UpdateCategoryDto extends PartialType(CreatePasswordResetDto) {}