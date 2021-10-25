import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  taskId!: number;
  task!: Todo;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getIdByParameter();
    this.initForm();
  }

  getTaskData(): void {
    this.todoService.findById(this.taskId)
      .subscribe((task: Todo) => this.task = task);
  }

  getIdByParameter(): void {
    this.route.queryParams
      .subscribe((params: Params) => {
        this.taskId = params['id'];
        this.getTaskData();
      });
  }

  initForm(): void {
    this.form = new FormGroup({
      titulo: new FormControl(this.task.titulo || '', [
        Validators.maxLength(50),
        Validators.required,
      ]),
      descricao: new FormControl(this.task.descricao || '', [
        Validators.maxLength(250),
      ]),
      dataParaFinalizar: new FormControl(this.task.dataParaFinalizar || '', [
        Validators.required,
      ]),
      finalizado: new FormControl(this.task.finalizado || false)
    })
  }

  validate(): void {
    this.form.valid
      ? this.save(this.form.value)
      : this.todoService.message('O Formulário está inválido. Por favor verifique os campos');
  }

  formatDate(dataParaFinalizar: string | Date): string {
    const DATE = new Date(dataParaFinalizar);
    return `${DATE.getDate()}/${DATE.getMonth()}/${DATE.getFullYear()}`
  }

  save(item: Todo): void {
    item.dataParaFinalizar = this.formatDate(item.dataParaFinalizar);

    this.todoService.create(item).subscribe(() => {
      this.todoService.message('Task criada com sucesso!');
      this.initForm();
      this.router.navigate(['/']);
    })
  }
}
