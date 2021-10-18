import { Body, Controller, Post, Res } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { Response } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private jwtService: JwtService) {}

  @Post('login')
  login(@Res() response: Response,
        @Body('username') username: string,
        @Body('password') password: string) {
    const payload = { username, password };
    const token = this.jwtService.sign(payload);
    response
      .cookie('access_token', token, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
  }
}
