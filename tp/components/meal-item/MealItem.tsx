import { Card } from "react-native-paper";
import {Meal} from "../../types/Meal";
import {View, Text, Button} from "react-native";

export default function MealItem(meal: Meal) {
    return (<View>
        <Card>
            <Card.Title title={meal.name ?? ""} />
            <Card.Content>
                <View>
                    <Text>{meal.date.toISOString()}</Text>
                    <Text>{meal.totalCalories}</Text>
                </View>
            </Card.Content>
            <Card.Actions>
                <Button title={'Voir les aliments'} onPress={() => {}}/>
            </Card.Actions>
        </Card>
    </View>)
}