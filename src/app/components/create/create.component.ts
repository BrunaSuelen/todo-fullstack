import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup = new FormGroup({
    titulo: new FormControl('', [
      Validators.maxLength(50),
      Validators.required,
    ]),
    descricao: new FormControl('', [
      Validators.maxLength(250),
    ]),
    dataParaFinalizar: new FormControl('', [
      Validators.required,
    ]),
    finalizado: new FormControl(false)
  })


  constructor() { }

  ngOnInit(): void {
  }

}
