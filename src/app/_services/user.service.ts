import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '@/_models';
import { Observable } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { isError } from 'util';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient) {

    }

    getAdminToken(){
        return this.http.post<any>(`http://localhost:8080/api/auth`, { "username" : "root", "password" : "p@$$w0rd" })
        .pipe(map(resp => { 
            return resp["token"];
        }));
    }

    register(user: User, adminToken:string ) {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + adminToken });
        let options = { headers: headers };

        return this.http.post(`http://localhost:8080/api/users`, {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "username": user.username,
            "temporaryPassword": user.password,
            "roles": [
              0
            ]
          }, options)
        .pipe(map(resp => {
            return resp;
        }));
    }

}