import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelativityDate } from './relativity-date/relativity-date.library';
import { IDateModuleConfiguration } from './config/relativity-date-config.library';

// here we are modifying the global Date object to add a new property to its interface
// This new property of relativityDate allows the Date object to use the RelativityDate
// object as if it were extension methods off of the Date object.
declare global {
    // tslint:disable-next-line: interface-name
    interface Date {
        /**
         * extension property from a Date object that is an instance of the RelativityDate class loaded
         * with that Date object as its context.
         * TODO CCC: add better intellisense for this object and figure out how to share the jsDocs so don't have to rewrite them all the time
         */
        relativityDate: RelativityDate;
    }
}

@NgModule({
    imports: [CommonModule]
})
export class NgxRelativityDateModule {
    static forRoot(
        customConfiguration?: IDateModuleConfiguration
    ): ModuleWithProviders {
        // here we are modifying the Date prototype to define the relativityDate property as
        // a getter that returns a new RelativityDate class instance using customConfiguration
        Object.defineProperty(Date.prototype, 'relativityDate', {
            get: function(): RelativityDate {
                return new RelativityDate(this, true, customConfiguration);
            }
        });

        return {
            ngModule: NgxRelativityDateModule
        };
    }
}
