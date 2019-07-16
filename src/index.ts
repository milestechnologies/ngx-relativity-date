import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MtDate } from './date.library';
import { IDateModuleConfiguration } from './default-configuration.library';

declare global {
    // tslint:disable-next-line: interface-name
    interface Date {
        mtDate: MtDate;
    }
}

@NgModule({
    imports: [CommonModule]
})
export class NgxDateModule {
    static forRoot(customConfiguration?: IDateModuleConfiguration): any {
        Object.defineProperty(Date.prototype, 'mtDate', {
            get: function(): MtDate {
                return new MtDate(this, true, customConfiguration);
            }
        });
        if (customConfiguration) {
            console.log('custom configuration file detected');
            return {
                ngModule: NgxDateModule,
                providers: [
                    { provide: 'config', useValue: customConfiguration }
                ]
            };
        }
        console.log(
            'no custom configuration file detected - using default configuration'
        );
        return {
            ngModule: NgxDateModule
        };
    }
}
