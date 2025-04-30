import { Routes } from '@angular/router';
import { LoginComponent } from './cutulu/login/login.component';
import { ListComponent } from './cutulu/list/list.component';
import { SheetComponent } from './cutulu/sheet/sheet.component';
import { NewCharacterComponent } from './cutulu/new-character/new-character.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'list', component: ListComponent},
    {path: 'characters/:character', component: SheetComponent},
    {path: 'newCharacter', component: NewCharacterComponent},
    {path: '**', redirectTo: '', pathMatch: 'full' }
];