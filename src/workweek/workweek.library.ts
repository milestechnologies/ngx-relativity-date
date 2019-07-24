/*
 * interface for work week definition
 */
export interface IWorkWeekDefinition {
    sunday: { start: number; end: number };
    monday: { start: number; end: number };
    tuesday: { start: number; end: number };
    wednesday: { start: number; end: number };
    thursday: { start: number; end: number };
    friday: { start: number; end: number };
    saturday: { start: number; end: number };
}

export const weekdayKey = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];
