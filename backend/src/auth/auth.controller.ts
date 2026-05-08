import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAdultDto } from './dto/login-adult.dto';
import { LoginStudentDto } from './dto/login-student.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Exchange a Supabase token for a platform JWT (parents / teachers)' })
  login(@Body() dto: LoginAdultDto) {
    return this.authService.loginWithSupabaseToken(dto.token);
  }

  @Post('student-login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Exchange a student access code for a platform JWT' })
  studentLogin(@Body() dto: LoginStudentDto) {
    return this.authService.loginWithStudentCode(dto.code);
  }
}
