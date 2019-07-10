import { BrowserModule } from '@angular/platform-browser';
import { async, TestBed } from '@angular/core/testing';
import {} from 'jasmine';

describe('NgxDateModuleTestTemplate', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [BrowserModule],
        });
    }));

    // ================================================

    describe(':: testing methods', () => {
        it('true should equal true', () => {
            expect(true).toEqual(true);
        });
    });
});

