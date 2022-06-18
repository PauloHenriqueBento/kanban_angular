import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Task[]>{
    return this.http.get<Task[]>(`${environment.apiEndpoint}/task`);
  }

  inserir(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.apiEndpoint}/task`, task)
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`${environment.apiEndpoint}/task/${id}`)
  }

  atualizar(task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.apiEndpoint}/task/${task.id}`, task)
  }
}
