import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo.component';
import { TestComponent } from './components/test.component';
import { SimpleDateRetrievalComponent } from './components/simple-date-retrieval.component';
import { AddSubtractDateComponent } from './components/add-subtract-date-demo/add-subtract-date.component';
import { TimeDescriptionComponent } from './components/time-description-demo/time-description.component';
import { ToFromComponent } from './components/to-from-demo/to-from.component';

const appRoutes: Routes = [
    {
        component: DemoComponent,
        path: 'home'
    },
    {
        component: TestComponent,
        path: 'test'
    },
    {
        component: SimpleDateRetrievalComponent,
        path: 'getdate'
    },
    {
        component: AddSubtractDateComponent,
        path: 'addsubdemo'
    },
    {
        component: TimeDescriptionComponent,
        path: 'timedesc'
    },
    {
        component: ToFromComponent,
        path: 'tofrom'
    },
    {
        component: DemoComponent,
        path: '**'
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })
    ]
})
export class AppRoutingModule {}
