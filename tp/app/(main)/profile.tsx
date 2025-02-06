import {SafeAreaView} from "react-native-safe-area-context";
import ProfileDetails from "../../components/profile-details/ProfileDetails";
import {useAuth, useUser} from "@clerk/clerk-expo";

export default function ProfilePage() {
    const user = useUser();
    const { signOut } = useAuth();

    return (
        <SafeAreaView>
            <ProfileDetails user={user} signOut={signOut}/>
        </SafeAreaView>)
}