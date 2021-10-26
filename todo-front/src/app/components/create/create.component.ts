import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getIdByParameter();
    this.initForm();
  }

  async getIdByParameter(): Promise<void> {
    const PARAMS = await this.route.queryParams
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

  parseStringInDate(date: any): Date {
    const [DAY, MONTH, YEAR] = date.split('/');
    return new Date(`${YEAR}-${MONTH}-${DAY}`);
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
      finalizado: new FormControl(this.task?.finalizado)
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
