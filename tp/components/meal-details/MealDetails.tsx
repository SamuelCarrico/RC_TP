import {ActivityIndicator, Button, Card} from "react-native-paper";
import {Meal} from "../../types/Meal";
import useDatabase from "../../hooks/useDatabase";
import {Text} from "react-native";
import {useEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";

export default function MealDetails() {
    const {getMealById, deleteMeal} = useDatabase();
    const [isLoading, setIsLoading] = useState(true);
    const [meal, setMeal] = useState<Meal>({id: 0, date: new Date(), name: "", totalCalories: 0});
    const {id} = useLocalSearchParams();

    useEffect(() => {
        const loadMeal = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const data = await getMealById(Number(id));
                if (data) setMeal(data);
                else console.error("Repas non trouvé");
            } catch (error) {
                console.error("Erreur lors du chargement du repas :", error);
            }
            setIsLoading(false);
        };
        loadMeal();
        console.log("id", id);
        console.log(meal);
    }, [id]);


    if (isLoading) {
        return (<ActivityIndicator animating={true}/>);
    }

    if (!meal) {
        return (<Text>Repas non trouvé ou supprimé</Text>);
    }

    return (!isLoading  && (<Card>
        <Card.Title title={meal.name ?? ""}/>
        <Card.Content>
            <Text>Repas du : {(meal.date) ? meal.date as unknown as string : 'Date inconnue'}</Text>
            <Text>{meal.totalCalories} kcal</Text>
        </Card.Content>
        <Card.Actions>
            <Button mode={'contained'} onPress={() => deleteMeal(meal.id)}>Supprimer le plat</Button>
        </Card.Actions>
    </Card>));
}