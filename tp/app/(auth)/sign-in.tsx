import {useSignIn} from '@clerk/clerk-expo'
import {Link, useRouter} from 'expo-router'
import {Text, TextInput, Button, View, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from "../../styles/styles";

export default function Page() {
    const {signIn, setActive, isLoaded} = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')

    // Handle the submission of the sign-in form
    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({session: signInAttempt.createdSessionId})
                router.replace('/')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, emailAddress, password])

    return (
        <View style={styles.container}>
            <Text style={styles.titleSign}>Sign In</Text>

            <TextInput
                style={styles.inputSign}
                autoCapitalize="none"
                placeholder="Enter email"
                value={emailAddress}
                onChangeText={setEmailAddress}
            />

            <TextInput
                style={styles.inputSign}
                placeholder="Enter password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.buttonSign} onPress={onSignInPress}>
                <Text style={styles.buttonTextSign}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.linkContainerSign}>
                <Text style={styles.textSign}>Don't have an account?</Text>
                <Link href="/sign-up" asChild>
                    <TouchableOpacity>
                        <Text style={styles.linkSign}>Sign up</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}