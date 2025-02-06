import {View} from "react-native";
import {useRouter} from "expo-router";
import CameraButton from "../buttons/CameraButton";
import AddMealButton from "../buttons/AddMealButton";

export default function ActionsMenu() {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20}}>
            <CameraButton />
            <AddMealButton />
        </View>);
}