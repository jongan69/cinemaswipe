import 'text-encoding'
import React from 'react';
import { useStorageState } from '../resources/hooks/useStorageState';
import { router } from 'expo-router';

// WEB AUTH
const WebAuthContext = React.createContext<{ signIn: (email: any) => void; signOut: () => void; session?: string | null, isLoading: boolean } | null>(null);

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(WebAuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }
    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <WebAuthContext.Provider
            value={{
                signIn: async (email) => {
                    // Perform sign-in logic here
                    // await magic.auth.loginWithEmailOTP({ email });
                    // setIsLoggedIn(true);
                    // await magic.wallet.connectWithUI();
                    setSession(email);
                },
                signOut: async () => {
                    // await magic.user.logout();
                    // setIsLoggedIn(false);
                    setSession(null);
                    router.replace('/')
                },
                session,
                isLoading,
            }}>
            {props.children}
        </WebAuthContext.Provider>
    );
}
