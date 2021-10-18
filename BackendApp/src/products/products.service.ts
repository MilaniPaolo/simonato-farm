import { Injectable } from "@nestjs/common";
import { Product } from "./product.model";
import { db } from "src/main";

@Injectable()
export class ProductsService {

  async insertProduct(
    id: string,
    creationDate: string,
    description: string,
    imageUrl: string,
    name: string,
    price: number,
    quantity: number,
    seasoning: string,
    weight: number): Promise<any> {
      
    const productId = Math.random().toString();
    const newProduct: Product = {
      id: productId,
      creationDate,
      description,
      imageUrl,
      name,
      price,
      quantity,
      seasoning,
      weight
    };
    
    const productRef = db.collection('product').doc(productId);
    await productRef.set(newProduct).then(() => console.log('Pruduct created'));
  }

  async getProducts(): Promise<Product[]> {
    let products: Product[] = [];

    const productRef = db.collection('product');
    const snapshot = await productRef.get();

    snapshot.forEach(product => {
      products = [...products, product.data()];
    });

    return products;
  }

  async getSingleProduct(productId: string): Promise<Product> {
    const productRef = db.collection('product').doc(productId);
    const product = await productRef.get();
    return {...product.data()};
  }

  async updateProduct(
    productId: string,
    creationDate: string,
    description: string,
    imageUrl: string,
    name: string,
    price: number,
    quantity: number,
    seasoning: string,
    weight: number) {

    const productRef = db.collection('product').doc(productId);
    const product = await productRef.get();
    const updatedProduct: Product = {
      creationDate: creationDate ?? product.data().creationDate,
      description: description ?? product.data().description,
      imageUrl: imageUrl ?? product.data().imageUrl,
      name: name ?? product.data().name,
      price: price ?? product.data().price,
      quantity: quantity ?? product.data().quantity,
      seasoning: seasoning ?? product.data().seasoning,
      weight: weight ?? product.data().weight
    };

    await productRef.update(updatedProduct);
  }

  async deleteProduct(productId) {
    const productRef = db.collection('product').doc(productId);
    await productRef.delete();
  }
}
