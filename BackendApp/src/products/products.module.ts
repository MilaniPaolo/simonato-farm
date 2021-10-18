import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [
    ProductsController
  ],
  imports: [
    AuthModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule {}
