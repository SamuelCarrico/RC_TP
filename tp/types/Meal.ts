import {BaseEntity} from "./BaseEntity";

export interface Meal extends BaseEntity {
    name: string
    date: Date,
    totalCalories: number,
}