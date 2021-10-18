import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { Product } from "./product.model";
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductsController {

  constructor(private readonly productService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  addProduct(
    @Body('id') id: string,
    @Body('creationDate') creationDate: string,
    @Body('description') description: string,
    @Body('imageUrl') imageUrl: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
    @Body('seasoning') seasoning: string,
    @Body('weight') weight: number) {
    return this.productService.insertProduct(
      id,
      creationDate,
      description,
      imageUrl,
      name,
      price,
      quantity,
      seasoning,
      weight
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getProduct(@Param('id') productId: string) {
    return this.productService.getSingleProduct(productId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateProduct(
    @Param('id') productId: string,
    @Body('creationDate') creationDate: string,
    @Body('description') description: string,
    @Body('imageUrl') imageUrl: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
    @Body('seasoning') seasoning: string,
    @Body('weight') weight: number) {
      
    this.productService.updateProduct(
      productId,
      creationDate,
      description,
      imageUrl,
      name,
      price,
      quantity,
      seasoning,
      weight
    ).then(() => console.log('product updated!'));
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  removeProduct(@Param('id') productId: string) {
    this.productService.deleteProduct(productId).then(() => console.log('product deleted!'));
  }
}
