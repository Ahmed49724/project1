import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAdultDto {
  @ApiProperty({ description: 'Supabase access_token from OAuth or magic-link flow' })
  @IsString()
  @IsNotEmpty()
  token: string;
}
