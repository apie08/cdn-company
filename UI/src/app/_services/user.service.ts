import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable  } from 'rxjs';
import { AppUser } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
   }

   register(model: any){
    return this.http.post<AppUser>(this.baseUrl + 'user/register', model).pipe(
      map((response: AppUser) => {
        
      })
    );
   }

   edit(id: any, model: any){
    return this.http.put<AppUser>(this.baseUrl + 'user/edit-user?id=' + id, model).pipe(
      map((response: AppUser) => {
        
      })
    );
   }

   GetAllUser() : Observable<any>{
    return this.http.get(this.baseUrl + 'user');    
   }

   delete(id: any){
    return this.http.delete(this.baseUrl + 'user/delete-user?id=' + id);
   }


}
