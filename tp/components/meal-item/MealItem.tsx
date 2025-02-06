import {Button, Card} from "react-native-paper";
import {Meal} from "../../types/Meal";
import {View, Text} from "react-native";
import useDatabase from "../../hooks/useDatabase";
import {useRouter} from "expo-router";

export default function MealItem({id, name, date, totalCalories}: Meal) {
    const {deleteMeal} = useDatabase();
    const router = useRouter();

    return (<View>
        <Card>
            <Card.Title title={name ?? ""}/>
            <Card.Content>
                <View>
                    <Text>Repas du : {(date) ? date as unknown as string : 'Date inconnue'}</Text>
                    <Text>{totalCalories} kcal</Text>
                </View>
            </Card.Content>
            <Card.Actions>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 20}}>
                    <Button mode={'contained'} onPress={() => router.push({pathname: "/[id]", params: {id: id}})}><Text>
                        Voir
                        le plat
                    </Text></Button>
                    <Button mode={'contained'} onPress={() => deleteMeal(id)}><Text>
                        Supprimer le plat
                    </Text></Button>
                </View>
            </Card.Actions>
        </Card>
    </View>)
}