import React from "react";
import {View} from "react-native";
import { Button, Text} from "react-native-paper";
import styles from "../../styles/styles";
import {UseUserReturn} from "@clerk/types";

export default function ProfileDetails({user, signOut}: { user: UseUserReturn | null, signOut: () => void }) {

    if (!user?.isSignedIn || !user || !user.isLoaded) {
        return (
            <View style={styles.container}>
                <Text>Utilisateur non connecté</Text>
            </View>
        );
    }

    return (
        <View style={styles.containerProfil}>
            <Text style={styles.userName}>{user?.user.fullName || "Utilisateur"}</Text>
            <View>
                <Text style={{padding: 10}}>{user?.user.primaryEmailAddress?.emailAddress}</Text>
            </View>
                <Button mode="contained" onPress={signOut}>
                    Se déconnecter
                </Button>
        </View>
    );
}