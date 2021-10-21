import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseURl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar
  ) { }

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseURl);
  }

  delete(id: any): Observable<void> {
    const URL = `${this.baseURl}/${id}`
    return this.http.delete<void>(URL);
  }

  message(msg: string): void {
    this.snack.open(
      `${msg}`,
      'OK',
      {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 4000
      }
    )
  }
}
