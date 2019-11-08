import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test.component';
import { SimpleDateRetrievalComponent } from './components/simple-date-retrieval.component';
import { AboutComponent } from './components/About/about.component';
import { APIComponent } from './components/api/api.component';

const appRoutes: Routes = [
    {
        component: APIComponent,
        path: 'api'
    },
    {
        component: AboutComponent,
        path: '**'
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })
    ]
})
export class AppRoutingModule {}
