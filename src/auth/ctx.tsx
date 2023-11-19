import 'text-encoding'
import React, {
    // useEffect, 
    useState
} from 'react';
// import { Platform } from 'react-native';
import { useStorageState } from './useStorageState';
import { router } from 'expo-router';
import { ENV } from '../resources/config/env';
// import { Magic } from "magic-sdk";
// import { BitcoinExtension } from "@magic-ext/bitcoin";
// import * as bitcoin from "bitcoinjs-lib";
// import { API_KEY, ENV } from '../resources/config/env';
// import Web3 from 'web3';

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
    const [env, setEnv] = React.useState(ENV.PROD);
    const [[isLoading, session], setSession] = useStorageState('session');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [publicAddress, setPublicAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [userMetadata, setUserMetadata] = useState({});

    // const magic = new Magic('YOUR_API_KEY', { 
    //     network: "goerli",
    //   });

    //   const web3 = new Web3(magic.rpcProvider);
    // const magic = new Magic(API_KEY[env], {
    //     extensions: [
    //         new BitcoinExtension({
    //             rpcUrl: "BTC_RPC_NODE_URL",
    //             network: "testnet",
    //         }),
    //     ],
    // });

    // useEffect(() => {
    //     magic.user.isLoggedIn().then(async (magicIsLoggedIn: boolean | ((prevState: boolean) => boolean)) => {
    //         setIsLoggedIn(magicIsLoggedIn);
    //         if (magicIsLoggedIn) {
    //             const metadata = await magic.user.getMetadata();
    //             setPublicAddress(metadata.publicAddress);
    //             setUserMetadata(metadata);
    //         }
    //     });
    // }, [isLoggedIn]);

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
