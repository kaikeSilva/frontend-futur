import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CircleProgressBarComponent } from '../components/circle-progress-bar/circle-progress-bar.component';
import { PublicComponent } from './public.component';
import { CircleProgressBarModule } from '../components/circle-progress-bar/circle-progress-bar.module';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';



const routes: Routes = [
  {
  path: '', 
    component: PublicComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  }
];
@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    CircleProgressBarModule,
    HttpClientModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule
  ]
})
export class PublicModule { }
