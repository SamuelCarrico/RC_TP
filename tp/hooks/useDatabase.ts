import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { Meal } from "../types/Meal";
import { Food } from "../types/Food";

export default function useDatabase() {
    const db = useSQLiteContext();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [foods, setFoods] = useState<Food[]>([]);
    const [lastFood, setLastFood] = useState<Food | null>(null);

    const initDatabase = useCallback(async () => {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS meal (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                date TEXT NOT NULL,
                totalCalories INTEGER NOT NULL
            );
        `);
        await db.execAsync(`
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

        // Mock
        // TODO A RETIRER
        await db.runAsync(
            "INSERT INTO meal (name, date, totalCalories) VALUES (?, ?, ?)",
            "Petit déjeuner", "2021-10-10", 1000
        );
        await db.runAsync(
            "INSERT INTO food (name, calories, proteins, carbs, fats, mealId) VALUES (?, ?, ?, ?, ?, ?)",
            "Pain", 200, 10, 30, 5, 1
        );
        console.log("Database initialized");
    }, []);

    const fetchMeals = useCallback(async () => {
        const result = await db.getAllAsync<Meal>("SELECT * FROM meal");
        setMeals(result);
    }, [db]);

    const fetchFoods = useCallback(async (mealId: number) => {
        const result = await db.getAllAsync<Food>("SELECT * FROM food WHERE mealId = ?", mealId);
        setFoods(result);
    }, [db]);

    const addMeal = useCallback(async (name: string, date: string, totalCalories: number) => {
        await db.runAsync(
            "INSERT INTO meal (name, date, totalCalories) VALUES (?, ?, ?)",
            name, date, totalCalories
        );
        await fetchMeals();
    }, [db, fetchMeals]);

    const getLastFood = useCallback(async () => {
        const result = await db.getFirstAsync<Food>("SELECT * FROM food ORDER BY id DESC LIMIT 1");
        setLastFood(result);
        return result;
    }, [db]);

    const addFood = useCallback(async (name: string, calories: number, proteins: number, carbs: number, fats: number, mealId: number) => {
        try {
            await db.runAsync(
                "INSERT INTO food (name, calories, proteins, carbs, fats, mealId) VALUES (?, ?, ?, ?, ?, ?)",
                name, calories, proteins, carbs, fats, mealId
            );
            await fetchFoods(mealId);
            await getLastFood();
        } catch (e) {
            console.error("Error adding food:", e);
        }
    }, [db, fetchFoods, getLastFood]);



    useEffect(() => {
        initDatabase();
        fetchMeals();
    }, [initDatabase, fetchMeals]);

    return { meals, foods, lastFood, fetchMeals, fetchFoods, addMeal, addFood, getLastFood };
}
