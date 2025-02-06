import {Text, View} from "react-native";
import {UserResource} from "@clerk/types";

export default function Welcome({user}: { user: UserResource | null | undefined }) {
    return (<View style={{padding: 10, flexDirection: "row", alignItems: "flex-start"}}>
        <Text>
            Bienvenue, {" "}
        </Text>
        <Text style={{fontWeight: "bold"}}>
            {user?.emailAddresses.at(0)?.emailAddress}!
        </Text>
    </View>);
}