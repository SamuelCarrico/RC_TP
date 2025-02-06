import {Card, Text} from "react-native-paper";
import {Food} from "../../types/Food";
import {View} from "react-native";
import styles from "../../styles/styles";

export default function LastFoodCard({food}: { food: Food }) {
    return (
        <View>
            <Text style={styles.lastFoodText}>Dernier aliment ajouté</Text>
            <Card style={{margin: 10, padding: 10, borderRadius: 10}}>
                <Card.Title title={food.name} subtitle={`Calories: ${food.calories} kcal`}/>
                <Card.Content>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text>Protéines : {food.proteins}g</Text>
                        <Text>Sucres : {food.carbs}g</Text>
                        <Text>Graisses : {food.fats}g</Text>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}
