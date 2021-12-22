import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  } 

  searchUser(search: string): Observable<{results:User[]}>{
    const data = { and: [{ name: { term: search } }] };
    return this.http.post<{results:User[]}>(`${environment.apiSearchUrl}/people/_search?size=20&lang=en&aggregate=true`, data).pipe(retry(5), catchError(this.handleError));
  }

  searchSkill = (search: string): Observable<{results:User[]}> => {
    const data = {and:[{"skill/role":{"text": search,"proficiency":"proficient"}}]}
    return this.http.post<{results:User[]}>(`${environment.apiSearchUrl}/people/_search?lang=en&size=20&aggregate=true`, data).pipe(retry(5), catchError(this.handleError));
  }
  
}
