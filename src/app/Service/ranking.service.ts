import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private httpClient: HttpClient) { }

  url = 'http://localhost:8080/api/';

  getPlayers(): Observable<any> {
    return this.httpClient.get<any>(this.url + "fixed-players")
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };

  postPlayer(player: any): Observable<any> {
    return this.httpClient.post<any>(this.url + "new-player", player)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };

  putPlayer(id: any, player: any): Observable<any> {
    return this.httpClient.put<any>(this.url + id, player)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };

  deletePlayer(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.url + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    
    return throwError(errorMessage);
  };
}


