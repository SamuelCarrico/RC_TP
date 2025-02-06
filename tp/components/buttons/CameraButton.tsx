import {Button} from "react-native-paper";
import {Text} from "react-native";
import {useRouter} from "expo-router";

export default function CameraButton() {
    const router = useRouter();
    return (<Button mode='contained-tonal' icon='camera' onPress={() => router.push('/camera')}>
        <Text>Scanner un EAN</Text>
    </Button>)
};