import React, {useState, useCallback} from 'react';
import {ActivityIndicator, Button, Card, MD2Colors} from 'react-native-paper';
import {useFocusEffect} from "expo-router";
import {Animated, ListRenderItemInfo, Text, View} from "react-native";
import FlatList = Animated.FlatList;
import useDatabase from "../../hooks/useDatabase";
import {Meal} from "../../types/Meal";

export default function MealsList() {
    const [mealsList, setMealsList] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const {fetchMeals, meals} = useDatabase();


    useFocusEffect(
        useCallback(() => {
            const loadMeals = async () => {
                setIsLoading(true);
                await fetchMeals();
                setMealsList(meals);
                setIsLoading(false);
                console.log('Meals', meals);
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

    return (
        <View>
            <FlatList
                data={mealsList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}: ListRenderItemInfo<Meal>) => (

                    <Card>
                        <Card.Title title={item.name}/>
                        <Card.Content>
                            <Text>{item.totalCalories}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button mode='elevated' icon='delete'>Supprimer</Button>
                        </Card.Actions>
                    </Card>
                )}
            />
        </View>
    );
}
