import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo.component';
import { TestComponent } from './components/test.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxDateModule } from '../../../dist';

const dateModuleConfig: {} = {
    customWorkWeek: {
        monday: {
            start: 9,
            end: 17
        },
        tuesday: {
            start: 9,
            end: 17
        },
        wednesday: {
            start: 9,
            end: 17
        },
        thursday: {
            start: 9,
            end: 17
        },
        friday: {
            start: 9,
            end: 17
        },
        saturday: null,
        sunday: null
    }
};

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, DemoComponent, TestComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDateModule.forRoot(dateModuleConfig)
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppModule {}
