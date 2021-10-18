import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminPage } from './admin.page';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule} from '../../shared/shared.module';
import { ProductDetailsComponent} from './components/product-details/product-details.component';
import { ProductService } from './services/product.service';
import { CameraService } from './services/camera.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: AdminPage, canActivate: [AuthGuard] },
  { path: 'product', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    AdminPage,
    LoginComponent,
    ProductDetailsComponent
  ],
  providers: [
    ProductService,
    CameraService,
    AuthService,
    AuthGuard
  ]
})
export class AdminPageModule {}
