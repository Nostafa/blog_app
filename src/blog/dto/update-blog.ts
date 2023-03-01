import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto {
  // @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  // @IsOptional()
  @IsNotEmpty()
  @IsString()
  content: string;

  // @IsOptional()
  @IsNotEmpty()
  @IsString()
  author: string;
}
