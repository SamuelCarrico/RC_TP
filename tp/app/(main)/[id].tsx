import MealItem from "../../components/meal-item/MealItem";
import {useCallback, useState} from "react";
import {useFocusEffect} from "expo-router";
import {Meal} from "../../types/Meal";
import {useLocalSearchParams} from "expo-router";
import Database from "../../services/db.service";
import MealDetails from "../../components/meal-details/MealDetails";


export default function DetailMeal() {
    const [meal, setMeal] = useState<Meal>({id: 0, date: new Date(), name: "", totalCalories: 0});
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useLocalSearchParams();

    const loadMeal = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const data = await Database.getMealById(Number(id));
            if (data) setMeal(data);
            else console.error("Repas non trouvé");
        } catch (error) {
            console.error("Erreur lors du chargement du repas :", error);
        }
        setIsLoading(false);
    }, [id]);

    useFocusEffect(() => loadMeal);

    return (
        <MealDetails />);
}