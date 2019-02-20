import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(protected http: HttpClient) {

  }

  getAll(path: string): Observable <any[]> {
      return this.http.get<any[]>(path)
      .pipe(
        map(response => {
          // console.log(response);
          return response as any[]}),
        catchError(e => throwError(new Error('SOMETHING BAD HAPPENED')))
      )
  }

  postOne(path: string, body: any):Observable <any> {
    return this.http.post(path, body).pipe(
      map(response=>response as any[]),
      catchError(e => throwError(new Error('SOMETHING BAD HAPPENED')))
    )
  }

}
