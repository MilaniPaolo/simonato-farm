import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {first, switchMap, takeUntil} from 'rxjs/operators';
import {iif, Observable, of, Subject} from 'rxjs';
import {Product} from 'src/app/shared/models/product.model';
import {ProductService} from 'src/app/features/admin/services/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController, Platform} from '@ionic/angular';
import {CameraService} from 'src/app/features/admin/services/camera.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  private $unsubscribe = new Subject<void>();
  $productDetails: Observable<Product>;
  productForm: FormGroup;
  isNewProduct = true;
  isProductCreated: boolean;
  isProductUpdated: boolean;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cameraService: CameraService,
              private formBuilder: FormBuilder,
              private platform: Platform,
              private changeDetector: ChangeDetectorRef,
              private actionSheetController: ActionSheetController) {
    this.productForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      creationDate: [''],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      quantity: [null, Validators.required],
      seasoning: ['', Validators.required],
      price: [null, Validators.required],
      weight: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      first(),
      takeUntil(this.$unsubscribe),
      switchMap(params => {
        const productId = params.get('id');
        return iif(() => productId !== null,
          this.productService.getProductDetails(productId),
          of(undefined)
        );
      })
    ).subscribe((response: Product) => {
      if (response) {
        this.isNewProduct = false;
        this.productForm.setValue(response);
      }
    });
    this.$productDetails = this.productService.$productDetails;
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
  }

  createProduct() {
    this.isProductCreated = false;
    this.productForm.get('creationDate').setValue(new Date());
    const newProduct: Product = this.productForm.getRawValue();
    this.productService.createProduct(newProduct).subscribe(() => {
      this.isProductCreated = true;
      this.isNewProduct = false;
      this.changeDetector.markForCheck();
    });
  }

  updateProduct(id: string) {
    this.isProductUpdated = false;
    const updatedProduct: Product = this.productForm.getRawValue();
    this.productService.updateProduct(id, updatedProduct).subscribe(() => {
      this.isProductUpdated = true;
      this.productForm.markAsPristine();
      this.productForm.markAsUntouched();
      this.changeDetector.markForCheck();
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Carica immagine',
      buttons: [{
        text: 'Galleria',
        icon: 'images-outline',
        handler: () => {
          if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
            this.pickupImageByFile();
          } else {
            this.cameraService.pickPicture().then((results) => {
              this.setImageUrl(results[0]);
            }, () => { });
          }
        }
      }, {
        text: 'Fotocamera',
        icon: 'aperture-outline',
        handler: () => {
          this.cameraService.takePicture().then((imageData) => {
            this.setImageUrl(imageData);
          }, () => {});
        }
      }, {
        text: 'Annulla',
        icon: 'close',
        role: 'cancel',
        handler: () => {}
      }]
    });

    await actionSheet.present();
  }

  private setImageUrl(imageUrl: string | ArrayBuffer) {
    this.productForm.get('imageUrl').setValue(imageUrl);
    this.productForm.markAsTouched();
  }

  private pickupImageByFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = readerEvent => {
        const content = readerEvent.target.result;
        this.setImageUrl(content);
      };
    };
    input.click();
  }

}
