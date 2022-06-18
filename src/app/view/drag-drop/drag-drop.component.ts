import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  tasks = new Array<Task>();
  task?: Task;
  editando = false;

  doing?:any = [];
  done?:any = [];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.taskService.listar().subscribe(tasks =>{
      this.tasks = tasks;
    })
  }

  novo() {
    this.task = new Task();
    this.editando = false;
  }

  salvar() {
    if (this.task){
      if(!this.editando) {
        this.taskService.inserir(this.task).subscribe(task => {
          this.listar();
          this.task = undefined;
        })
      } else {
        this.taskService.atualizar(this.task).subscribe(task =>{
          this.listar();
          this.task = undefined;
        })
      }
    }
  }

  excluir(id: number){
    this.taskService.remover(id).subscribe(() => {
      this.listar();
    })
  }

  editar(task: Task){
    this.task = task;
    this.editando = true;
  }

  cancelar() {
    this.task = undefined;
  }

}
