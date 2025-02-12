import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './cutulu/login/login.component';
import { ListComponent } from './cutulu/list/list.component';
import { SheetComponent } from './cutulu/sheet/sheet.component';
import { SkillsPipePipe } from "./pipes/skills-pipe.pipe";
import { NewCharacterComponent } from './cutulu/new-character/new-character.component';
import { RouterOutlet } from '@angular/router';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ListComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SkillsPipePipe,
        NewCharacterComponent,
        RouterOutlet,
        SheetComponent
    ]
})
export class AppModule { }
