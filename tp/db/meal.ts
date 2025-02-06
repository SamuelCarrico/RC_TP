import {Meal} from "../types/Meal";
import * as SQLite from 'expo-sqlite';


const createMealTable = `PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS meal (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    date TEXT NOT NULL,
                    totalCalories INTEGER NOT NULL
                );`

const createFoodTable = `  PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS food (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                calories INTEGER NOT NULL,
                proteins INTEGER NOT NULL,
                carbs INTEGER NOT NULL,
                fats INTEGER NOT NULL,
                mealId INTEGER NOT NULL,
                FOREIGN KEY(mealId) REFERENCES meal(id)
            );`



let db: SQLite.SQLiteDatabase | null = null;

export async function getMeals() {
    try {
        const db = await getDB();
        return await fetchMeals(db);
    } catch (error) {
        console.error("Error fetching meals:", error);
    }
}

export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
    if (db) return db;
    db = await SQLite.openDatabaseAsync('meal-dash2.db');
    await db.withTransactionAsync(async () => {
        if (!db) {
            return;
        }
        await db.execAsync(createMealTable);
        await db.execAsync(createFoodTable);
    });
    return db;
};

async function fetchMeals(db: SQLite.SQLiteDatabase) {
    try {
       return await db.getAllAsync<Meal>("SELECT * FROM meal");
    } catch (error) {
        console.error("Error fetching meals:", error);
    }
}