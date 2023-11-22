import { Redirect, Stack } from 'expo-router';
import { Text } from '../../components/Themed';
import React from 'react';
import { Platform } from 'react-native';
import { useSession } from '../../auth/ctx';
import { useMagicSession } from '../../auth/magicSdk';

export default function AppLayout() {
    const { session, isLoading }: any = useSession();
    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/" />;
    }

    if (Platform.OS === 'web') {
        // This layout can be deferred because it's not the root layout.
        return (
            <Stack>
                <Stack.Screen name="(web)" options={{ headerShown: false }}/>
            </Stack>
        );
    } else {
        // This layout can be deferred because it's not the root layout.
        return (
            <Stack>
                <Stack.Screen name="(mobile)" options={{ headerShown: false }}/>
                <Stack.Screen name="modal" options={{ presentation: 'modal', headerTitle: 'Welcome' }} />
            </Stack>
        );
    }


}