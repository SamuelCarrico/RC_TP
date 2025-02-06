import {tokenCache} from '../utils/cache'
import {ClerkProvider, ClerkLoaded} from '@clerk/clerk-expo'
import {Slot} from 'expo-router'
import {SQLiteProvider} from 'expo-sqlite';
import {PaperProvider} from "react-native-paper";
import {useDrizzleStudio} from "expo-drizzle-studio-plugin";
import * as SQLite from 'expo-sqlite';

export default function RootLayout() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
    const db = SQLite.openDatabaseSync("meal-dash.db");
    useDrizzleStudio(db);

    if (!publishableKey) {
        throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
    }

    return (
        <SQLiteProvider databaseName="meal-dash.db">
            <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
                <ClerkLoaded>
                    <PaperProvider>
                        <Slot/>
                    </PaperProvider>
                </ClerkLoaded>
            </ClerkProvider>
        </SQLiteProvider>
    )
}