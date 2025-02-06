import React, {useState, useCallback} from 'react';
import {ActivityIndicator, Button, Card, MD2Colors} from 'react-native-paper';
import {useFocusEffect} from "expo-router";
import {Animated, ListRenderItemInfo, Text, View} from "react-native";
import FlatList = Animated.FlatList;
import useDatabase from "../../hooks/useDatabase";
import {Meal} from "../../types/Meal";
import MealItem from "../meal-item/MealItem";

export default function MealsList() {
    const [mealsList, setMealsList] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const {fetchMeals, meals, deleteMeal} = useDatabase();


    useFocusEffect(
        useCallback(() => {
            const loadMeals = async () => {
                setIsLoading(true);
                await fetchMeals();
                setMealsList(meals);
                setIsLoading(false);
            };
            loadMeals();

            return () => setMealsList([]);
        }, [])
    );

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator animating={true} color={MD2Colors.green100}/>
            </View>
        );
    }
    //TODO

    if (mealsList.length === 0) {
        return (
            <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{fontSize: 20}}>Aucun  repas enregistré !</Text>
                <Text style={{fontSize: 15, fontStyle: "italic"}}>Bug de remonté  des données. Quand j'actualise avec Ctrl+S dans l'éditeur de code, ca charge la base de données. </Text>
            </View>
        );
    }

    return (
        <View>
            <FlatList
                ItemSeparatorComponent={() => <View style={{height: 20}} />}
                data={mealsList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}: ListRenderItemInfo<Meal>) => (
                    <MealItem id={item.id} date={item.date} name={item.name} totalCalories={item.totalCalories}/>
                )}
            />
        </View>
    );
}
