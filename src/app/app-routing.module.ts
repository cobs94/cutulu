import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './cutulu/login/login.component';
import { ListComponent } from './cutulu/list/list.component';
import { SheetComponent } from './cutulu/sheet/sheet.component';
import { NewCharacterComponent } from './cutulu/new-character/new-character.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'list', component: ListComponent},
  {path: 'characters/:character', component: SheetComponent},
  {path: 'newCharacter', component: NewCharacterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
