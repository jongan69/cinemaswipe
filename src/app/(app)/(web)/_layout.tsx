import { Stack } from 'expo-router';
import React from 'react';

export default function WebLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true
            }} >
            <Stack.Screen
                name="index"
                options={{
                    title: 'Home'
                }}
            />
            <Stack.Screen
                name="notifications"
                options={{
                    title: 'Matches'
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    title: 'Profile'
                }}
            />
            <Stack.Screen
                name="websettings"
                options={{
                    title: 'Settings'
                }}
            />
        </Stack>
    )

}