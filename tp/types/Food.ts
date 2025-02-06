import {BaseEntity} from "./BaseEntity";

export interface Food extends BaseEntity {
    name: string,
    calories: number,
    proteins: number,
    carbs: number,
    fats: number,
    mealId: number,
}