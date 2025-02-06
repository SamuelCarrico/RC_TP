import {SignedIn, SignedOut, useUser} from '@clerk/clerk-expo'
import {Link} from 'expo-router'
import {Text, View} from 'react-native'
import Welcome from "../../components/welcome/Welcome";
import ActionsMenu from "../../components/actions-menu/ActionsMenu";
import MealsList from "../../components/meals-list/MealsList";

export default function Page() {
    const {user} = useUser()

    return (
        <View>
            <SignedIn>
                <Welcome user={user}/>
                <MealsList/>
                <ActionsMenu/>
            </SignedIn>
            <SignedOut>
                <View style={{flexDirection: 'column', justifyContent: "center", alignItems: "center", gap: 30}}>
                    <View>
                        <Link href="/(auth)/sign-in">
                            <Text style={{fontWeight: "bold", fontSize: 30}}>Sign in</Text>
                        </Link>
                    </View>
                    <Link href="/(auth)/sign-up">
                        <Text style={{fontWeight: "bold", fontSize: 30}}>Sign up</Text>
                    </Link>
                </View>
            </SignedOut>
        </View>
    )
}