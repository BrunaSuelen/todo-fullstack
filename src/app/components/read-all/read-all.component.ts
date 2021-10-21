import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css'],
  providers: [TodoService]
})
export class ReadAllComponent implements OnInit {

  closed: number = 0
  list: Todo[] = [];
  listFinished: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.todoService.findAll().subscribe((resposta) => {
      resposta.forEach(todo => {
        todo.finalizado
          ? this.listFinished.push(todo)
          : this.list.push(todo);

        this.closed = this.listFinished.length;
      })
    })
  }

  delete(id: any): void {
    this.todoService.delete(id).subscribe((resposta) => {
      if (resposta === null) {
        this.todoService.message('Task deletada com sucesso!"');
        this.list = this.list.filter(todo => todo.id !== id);
      }
    })
  }
}
