import { IsAlphanumeric, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginStudentDto {
  @ApiProperty({ description: '6-character alphanumeric student access code' })
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(6, 6)
  code: string;
}
