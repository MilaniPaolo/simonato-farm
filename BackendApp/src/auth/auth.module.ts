import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_KEY}`,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  providers: [AuthService]
})
export class AuthModule {}
