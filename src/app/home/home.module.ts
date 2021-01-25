import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Routes,RouterModule } from  '@angular/router';
import { HomeComponent } from './home.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  { path: '', component: HomeComponent}  
];


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),    
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  
  ]
})
export class HomeModule { }
