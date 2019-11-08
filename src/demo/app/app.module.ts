import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HighlightModule } from 'ngx-highlightjs';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test.component';
import { AppRoutingModule } from './app-routing.module';
import {
    NgxRelativityDateModule,
    IDateModuleConfiguration
} from '../../../dist';

const myCustomConfiguration: IDateModuleConfiguration = {}; // TODO

import { SimpleDateRetrievalComponent } from './components/simple-date-retrieval.component';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { AboutComponent } from './components/About/about.component';
import { APIComponent } from './components/api/api.component';

export function hljsLanguages(): any {
    return [
        { name: 'typescript', func: typescript },
        { name: 'xml', func: xml }
    ];
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        TestComponent,
        SimpleDateRetrievalComponent,
        AboutComponent,
        APIComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightModule.forRoot({
            languages: hljsLanguages
        }),
        NgxRelativityDateModule.forRoot()
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppModule {}
