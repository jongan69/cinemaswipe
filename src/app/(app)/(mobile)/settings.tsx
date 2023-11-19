import { Button, Platform, StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { Redirect, usePathname, useSegments } from 'expo-router';
import React from 'react';
import { useMagicSession } from '../../../auth/magicSdk';
import * as SecureStore from 'expo-secure-store';
import InputField from '../../../components/InputField';

export default function SettingsScreen() {
  if (Platform.OS === 'web') {
    // Call the replace method to redirect to a new route without adding to the history.
    // We do this in a useFocusEffect to ensure the redirect happens every time the screen
    // is focused.
    return <Redirect href="/(app)/(web)/websettings" />;
  } else {
    const { signOut }: any = useMagicSession();
    const [connectedEmail, setConnectedEmail] = React.useState("")
    const pathname = usePathname();
    const segments = useSegments();

    async function save() {
      alert("🔐 Saving 🔐 \n" + connectedEmail);
      try {
        await SecureStore.setItemAsync("connectedEmail", connectedEmail);
        alert("🔐 Saved 🔐 \n");
      } catch {
        alert("🔐 Error Saving 🔐 \n");
      }
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <InputField
          label={undefined}
          icon={undefined}
          inputType={undefined}
          keyboardType={undefined}
          fieldButtonLabel={undefined}
          fieldButtonFunction={undefined}
          value={connectedEmail}
          onChangeText={text => setConnectedEmail(text)}
        />
        <Button title='Save Partner Email' onPress={save} />
        <Text
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}>
          Sign Out
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
