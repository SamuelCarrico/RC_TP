import SearchBar from "../../components/search-bar/SearchBar";
import {SafeAreaView} from "react-native-safe-area-context";
import CameraButton from "../../components/buttons/CameraButton";
import LastFoodCard from "../../components/last-food/LastFoodCard";
import {useEffect, useState} from "react";
import useDatabase from "../../hooks/useDatabase";
import {Food} from "../../types/Food";

export default function Add() {
    const [lastFood, setLastFood] = useState<Food>({
        id: 0,
        name: "",
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
        mealId: 0,
    });
    const { foods, fetchFoods } = useDatabase();

    useEffect(() => {
        const loadLastFood = async () => {
            await fetchFoods(1);
            setLastFood(foods[foods.length - 1]);
        };
        loadLastFood();
    }, [foods]);
    return (
        <SafeAreaView>
            <SearchBar/>
            <CameraButton/>
            {lastFood && <LastFoodCard food={lastFood}/>}
        </SafeAreaView>
    );
}