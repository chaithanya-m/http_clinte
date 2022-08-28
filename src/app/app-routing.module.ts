import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksService } from './services/books.service';


  const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
