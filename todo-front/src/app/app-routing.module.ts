import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { FinalizedComponent } from './components/finalized/finalized.component';
import { ReadAllComponent } from './components/read-all/read-all.component';

const routes: Routes = [
  { path: '', component: ReadAllComponent },
  { path: 'finalizados', component: FinalizedComponent },
  { path: 'criar', component: CreateComponent },
  { path: 'editar/:id', component: CreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
