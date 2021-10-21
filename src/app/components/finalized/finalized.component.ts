import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-finalized',
  templateUrl: './finalized.component.html',
  styleUrls: ['./finalized.component.css']
})
export class FinalizedComponent implements OnInit {

  listFinished: Todo[] = [];

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.todoService.findAll().subscribe((resposta) => {
      resposta.forEach(todo => {
        if (todo.finalizado) this.listFinished.push(todo);
      })
    })
  }
}
