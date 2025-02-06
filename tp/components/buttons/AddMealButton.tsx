import {Button} from "react-native-paper";
import {Text} from "react-native";
import {useRouter} from "expo-router";

export default function AddMealButton() {
    const router = useRouter();

    return (<Button mode='outlined' icon='plus' onPress={() => router.push('/add')}>
        <Text>Ajouter un repas</Text>
    </Button>)
};