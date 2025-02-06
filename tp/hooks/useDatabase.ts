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
        try {
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
                    FOREIGN KEY(mealId) REFERENCES meal(id) ON DELETE CASCADE
                );
            `);

            console.log("Database initialized");
        } catch (error) {
            console.error("Error initializing database:", error);
        }
    }, [db]);

    const fetchMeals = useCallback(async () => {
        try {
            const result = await db.getAllAsync<Meal>("SELECT * FROM meal");
            setMeals(result);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    }, [db]);

    const fetchFoods = useCallback(async (mealId: number) => {
        try {
            const result = await db.getAllAsync<Food>("SELECT * FROM food WHERE mealId = ?", mealId);
            setFoods(result);
        } catch (error) {
            console.error("Error fetching foods:", error);
        }
    }, [db]);

    const addMeal = useCallback(async (name: string, date: string, totalCalories: number) => {
        try {
            await db.runAsync(
                "INSERT INTO meal (name, date, totalCalories) VALUES (?, ?, ?)",
                name, date, totalCalories
            );
            await fetchMeals();
        } catch (error) {
            console.error("Error adding meal:", error);
        }
    }, [db, fetchMeals]);

    const getLastFood = useCallback(async () => {
        try {
            const result = await db.getFirstAsync<Food>("SELECT * FROM food ORDER BY id DESC LIMIT 1");
            setLastFood(result);
            return result;
        } catch (error) {
            console.error("Error fetching last food:", error);
        }
    }, [db]);

    const addFood = useCallback(async (name: string, calories: number, proteins: number, carbs: number, fats: number, mealId: number) => {
        try {
            console.log("Adding food:", { name, calories, proteins, carbs, fats, mealId });

            await db.runAsync(
                "INSERT INTO food (name, calories, proteins, carbs, fats, mealId) VALUES (?, ?, ?, ?, ?, ?)",
                name, calories, proteins, carbs, fats, mealId
            );

            await fetchFoods(mealId);
            await getLastFood();

        } catch (error) {
            console.error("Error adding food:", error);
        }
    }, [db, fetchFoods, getLastFood]);

    const deleteMeal = useCallback(async (mealId: number) => {
        try {
            await db.runAsync("DELETE FROM food WHERE mealId = ?", mealId);
            await db.runAsync("DELETE FROM meal WHERE id = ?", mealId);
            await fetchMeals();
        } catch (error) {
            console.error("Error deleting meal:", error);
        }
    }, [db, fetchMeals]);

    const getMealById = useCallback(async (mealId: number) => {
        try {
            const result = await db.getFirstAsync<Meal>("SELECT * FROM meal WHERE id = ?", mealId);
            return result;
        } catch (error) {
            console.error("Error fetching meal by id:", error);
        }
    }, [db]);

    useEffect(() => {
        (async () => {
            await initDatabase();
            await fetchMeals();
        })();
    }, [initDatabase, fetchMeals]);

    return { initDatabase, meals, foods, lastFood, fetchMeals, fetchFoods, addMeal, addFood, getLastFood, deleteMeal, getMealById };
}
