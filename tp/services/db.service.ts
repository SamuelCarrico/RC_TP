import * as SQLite from 'expo-sqlite';
import {Meal} from "../types/Meal";
import {Food} from "../types/Food";
import {defaultDatabaseDirectory} from "expo-sqlite";

//Obsolete
class DatabaseService {
    private static instance: DatabaseService;
    private db?: SQLite.SQLiteDatabase;

    private constructor() {
        this.init();
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public async init() {
        this.db = await SQLite.openDatabaseAsync('meal-dash.db', defaultDatabaseDirectory);
        await this.initMealTable();
        await this.initFoodTable();
        console.log('Database initialized');
    }

    private async initMealTable() {
        if (!this.db) throw new Error('Database not initialized');
        await this.db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS meal (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                date TEXT NOT NULL,
                totalCalories INTEGER NOT NULL
            );
        `);
    }

    private async initFoodTable() {
        if (!this.db) throw new Error('Database not initialized');
        await this.db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS food (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                calories INTEGER NOT NULL,
                proteins INTEGER NOT NULL,
                carbs INTEGER NOT NULL,
                fats INTEGER NOT NULL,
                mealId INTEGER NOT NULL,
                FOREIGN KEY(mealId) REFERENCES meal(id)
            );
        `);
    }

    public async insertMeal(name: string, date: string, totalCalories: number): Promise<number> {
        if (!this.db) throw new Error('Database not initialized');

        const result = await this.db.runAsync(
            'INSERT INTO meal (name, date, totalCalories) VALUES (?, ?, ?)',
            name, date, totalCalories
        );
        return result.lastInsertRowId;
    }

    public async getMeals(): Promise<Meal[]> {
        if (!this.db) throw new Error('Database not initialized');
        const result: Meal[] = await this.db.getAllAsync('SELECT * FROM meal');
        return result.map(row => ({
            id: row.id,
            name: row.name,
            date: new Date(row.date),
            totalCalories: row.totalCalories
        }));
    }

    public async getMealById(id: number): Promise<Meal | null> {
        if (!this.db) throw new Error('Database not initialized');
        const result: Meal[] = await this.db.getAllAsync(
            'SELECT * FROM meal WHERE id = ?',
            id
        );
        return {
            name: result[0].name,
            id: result[0].id,
            date: new Date(result[0].date),
            totalCalories: result[0].totalCalories
        };
    }

    public async insertFood(name: string, calories: number, proteins: number, carbs: number, fats: number, mealId: number): Promise<number> {
        if (!this.db) throw new Error('Database not initialized');
        console.log(name, calories, proteins, carbs, fats, mealId);
        const result = await this.db.runAsync(
            'INSERT INTO food (name, calories, proteins, carbs, fats, mealId) VALUES (?, ?, ?, ?, ?, ?)',
            name, calories, proteins, carbs, fats, mealId
        );
        console.log(result);
        return result.lastInsertRowId;
    }

    public async getFoods(mealId: number): Promise<Food[]> {
        if (!this.db) throw new Error('Database not initialized');
        const result: Food[] = await this.db.getAllAsync(
            'SELECT * FROM food WHERE mealId = ?',
            mealId
        );
        return result.map(row => ({
            id: row.id,
            calories: row.calories,
            proteins: row.proteins,
            carbs: row.carbs,
            fats: row.fats,
            name: row.name,
            mealId: row.mealId
        }));
    }

    public async searchFoods(name: string): Promise<Food[]> {
        if (!this.db) throw new Error('Database not initialized');
        const result: Food[] = await this.db.getAllAsync(
            'SELECT * FROM food WHERE name LIKE ?',
            `%${name}%`
        );
        return result.map(row => ({
            id: row.id,
            calories: row.calories,
            proteins: row.proteins,
            carbs: row.carbs,
            fats: row.fats,
            name: row.name,
            mealId: row.mealId
        }));
    }

    public async searchMeals(date: string): Promise<Meal[]> {
        if (!this.db) throw new Error('Database not initialized');
        const result: Meal[] = await this.db.getAllAsync(
            'SELECT * FROM meal WHERE date LIKE ?',
            `%${date}%`
        );
        return result.map(row => ({
            id: row.id,
            name: row.name,
            date: new Date(row.date),
            totalCalories: row.totalCalories
        }));
    }
}

export default DatabaseService.getInstance();
