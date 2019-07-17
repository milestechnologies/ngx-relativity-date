export interface ITimeChunk {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
}

export interface ITimeChunkConstructorObject {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}

export class TimeChunk implements ITimeChunk {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    constructor(timeChunkConstructor: ITimeChunkConstructorObject = {}) {
        let defaultTimeChunkObject = {
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        };
        Object.assign(this, defaultTimeChunkObject, timeChunkConstructor);
    }
}
