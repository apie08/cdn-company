import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable  } from 'rxjs';
import { AppUser } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://localhost:5001/api/user/';
  constructor(private http: HttpClient) {
   }

   register(model: any){
    return this.http.post<AppUser>(this.baseUrl + 'register', model).pipe(
      map((response: AppUser) => {
        
      })
    );
   }

   edit(id: any, model: any){
    return this.http.put<AppUser>(this.baseUrl + 'edit-user?id=' + id, model).pipe(
      map((response: AppUser) => {
        
      })
    );
   }

   GetAllUser() : Observable<any>{
    return this.http.get(this.baseUrl);    
   }

   delete(id: any){
    return this.http.delete(this.baseUrl + 'delete-user?id=' + id);
   }


}
