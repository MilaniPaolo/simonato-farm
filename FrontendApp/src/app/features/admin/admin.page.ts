import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  $products: Observable<Product[]>;

  constructor(private productService: ProductService,
              private router: Router,
              private alertController: AlertController) {}

  ngOnInit() {
    this.productService.getAllProducts();
    this.$products = this.productService.$products;
  }

  async productSelected(id: string) {
    await this.router.navigate([`admin/product/${id}`]);
  }

  async addProduct() {
    await this.router.navigate([`admin/product`]);
  }

  async deleteProduct(id: string) {
    await this.presentAlertConfirm(id);
  }

  private async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'Attenzione!',
      message: 'Sei sicuro di voler rimuovere questo prodotto?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Conferma',
          handler: () => {
            this.productService.deleteProduct(id)
              .subscribe(() => this.productService.getAllProducts());
          }
        }
      ]
    });

    await alert.present();
  }

}
