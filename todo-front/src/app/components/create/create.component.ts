import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
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
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<any>
  ) { }

  async ngOnInit(): Promise<void> {
    this.dateAdapter.setLocale('pt');
    await this.getIdByParameter();
    this.initForm();
  }

  async getIdByParameter(): Promise<void> {
    const PARAMS = await this.route.params
      .pipe(take(1))
      .toPromise();

    if (PARAMS['id']) {
      this.taskId = PARAMS['id'];
      await this.getTaskData();
    }
  }

  getTaskData(): Promise<Todo> {
    return this.todoService
      .findById(this.taskId)
      .toPromise()
      .then((task: Todo) => this.task = task);
  }

  parseStringInDate(date: any): Date | void {
    if (date) {
      const [DAY, MONTH, YEAR] = date.split('/');
      return new Date(`${YEAR}-${MONTH}-${DAY}`);
    }
  }

  initForm(): void {
    const DATE = this.parseStringInDate(this.task?.dataParaFinalizar);

    this.form = new FormGroup({
      titulo: new FormControl(this.task?.titulo || '', [
        Validators.maxLength(50),
        Validators.required,
      ]),
      descricao: new FormControl(this.task?.descricao || '', [
        Validators.maxLength(250),
      ]),
      dataParaFinalizar: new FormControl(DATE || '', [
        Validators.required,
      ]),
      finalizado: new FormControl(this.task?.finalizado || false)
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

  prepareTask(task: Todo): Todo {
    task.id = this.taskId?.toString();
    task.dataParaFinalizar = this.formatDate(task.dataParaFinalizar);

    return task;
  }

  save(task: Todo): void {
    task = this.prepareTask(task);

    this.todoService
    [this.taskId ? 'update' : 'create'](task)
      .subscribe(() => {
        this.todoService.message(`Task ${this.taskId ? 'atualizada' : 'criada'} com sucesso!`);
        this.router.navigate(['/']);
      })
  }
}
