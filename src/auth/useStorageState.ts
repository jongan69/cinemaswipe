import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Dispatch, SetStateAction, useReducer } from 'react';
import { Platform } from 'react-native';

// Original Update Context Hook -> Some Type Errors
// type UseStateHook<T> = [[boolean, T | null], (value?: T | null) => void];

// function useAsyncState<T>(
//     initialValue: [boolean, T | null] = [true, undefined],
// ): UseStateHook<T> {
//     return React.useReducer(
//         (state: [boolean, T | null], action: T | null = null) => [false, action],
//         initialValue,
//     ) as UseStateHook<T>;
// }

// AI Updated Typed Context Hook Update -> No Type errors
type UseStateHook<T> = [
    [boolean, T | null],
    Dispatch<SetStateAction<T | null>>
];

function useAsyncState<T>(
    initialValue: T | null = null,
): UseStateHook<T> {
    const reducer = (
        state: [boolean, T | null],
        action: T | null = null,
    ): [boolean, T | null] => [false, action];

    return useReducer(reducer, [true, initialValue]) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
    if (Platform.OS === 'web') {
        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            console.error('Local storage is unavailable:', e);
        }
    } else {
        if (value == null) {
            await SecureStore.deleteItemAsync(key);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    }
}

export function useStorageState(key: string): UseStateHook<string> {
    // Public
    const [state, setState] = useAsyncState<string>();

    // Get
    React.useEffect(() => {
        if (Platform.OS === 'web') {
            try {
                if (typeof localStorage !== 'undefined') {
                    setState(localStorage.getItem(key));
                }
            } catch (e) {
                console.error('Local storage is unavailable:', e);
            }
        } else {
            SecureStore.getItemAsync(key).then(value => {
                setState(value);
            });
        }
    }, [key]);

    // Set
    const setValue: any = React.useCallback(
        (value: string | null) => {
            setStorageItemAsync(key, value).then(() => {
                setState(value);
            });
        },
        [key]
    );

    return [state, setValue];
}
