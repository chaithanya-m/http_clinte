import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Subscriber } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';
import { flush } from '@angular/core/testing';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test_http'
  xyz :any[]=[]
  updates:boolean=false
  users: any = [];
  user_id:any
 
  

  constructor(private fb: FormBuilder, private booksService: BooksService) {
    
  }  
  ngOnInit(): void {
    this.getAllUsers();
  }
  
  data = this.fb.group({                                                                                                                   
    name:['',[Validators.required, Validators.minLength(5)]] ,
    email: ['',[Validators.required, ]],
    phone: ['',[Validators.required, Validators.minLength(10)]]
  })
  //get the data
  getAllUsers(){
    this.booksService.list().subscribe(
      (users: any) => {
        // this.books = books;
        this.users = users;

      },
      (error: any) => {
        console.log(error);
      });
  }
  //add new data
    
  onSubmit(){
    const new_data = 
    {
      name : this.data.getRawValue().name,
      email : this.data.getRawValue().email,
      phone : this.data.getRawValue().phone
    };
    
    this.booksService.create(new_data)
      .subscribe(
        response => {
          console.log(response);
          this.getAllUsers()
          
        },
        error => {
          console.log(error);
        });
        this.data.reset('');
       
  }

//Delete
  delete(id:string){
    
    this.booksService.delete(id)
    
    .subscribe(
      response => {
       this.getAllUsers()
      },
      error => {
        console.log(error);
      });
  }
// Update data
  change_data(id:string,name:string,email:string,phone:string){
    this.data = this.fb.group({ 
      name:name,
      email:email,
      phone:phone

    });
    this.user_id=id
    this.updates=true
  }
  Changes(): void{
    let req ={
      name : this.data.getRawValue().name,
      email : this.data.getRawValue().email,
      phone : this.data.getRawValue().phone
    }
   
    this.booksService.update(this.user_id, req).subscribe(response => {
      debugger;
        console.log(response)
        this.getAllUsers()
        this.updates=false
        
      },
      error => {
        console.log(error);
      });
     
  }
}

  



