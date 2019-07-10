import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
    template: `
        <div class="jumbotron demo-description-block">
            <h4><em>How it works</em></h4>
            <p>
                messaging here about what to do and how it works. this should be
                the major text on the page, with all other text and instructions
                contained in comments in the code sample
            </p>
        </div>

        <button class="btn btn-primary">
            button here
        </button>
        <br />
        <br />
        [code sample goes here]
    `,
})
export class DemoComponent {
    constructor() {}
}
