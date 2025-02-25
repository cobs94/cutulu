import { NgModule, isDevMode } from '@angular/core';

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
import { ServiceWorkerModule } from '@angular/service-worker';

import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class CustomHammerConfig extends HammerGestureConfig {
    override overrides = {
      press: { time: 500 } // Define el tiempo en milisegundos para detectar "presionar"
    };
  }

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
        { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HammerModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SkillsPipePipe,
        NewCharacterComponent,
        RouterOutlet,
        SheetComponent,
        ListComponent,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ]
})
export class AppModule { }
