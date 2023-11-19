import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { Redirect, usePathname, useSegments } from 'expo-router';
import React from 'react';
import { useMagicSession } from '../../../auth/magicSdk';
import * as SecureStore from 'expo-secure-store';
import ContentCard from '../../../components/ContentCard';
import InputField from '../../../components/InputField';

async function save(value: string) {
  alert("🔐 Saving 🔐 \n" + value);
  try {
    await SecureStore.setItemAsync("connectedEmail", value);
    alert("🔐 Saved 🔐 \n");
  } catch {
    alert("🔐 Error Saving 🔐 \n");
  }
}

export default function SettingsScreen() {
  if (Platform.OS === 'web') {
    // Call the replace method to redirect to a new route without adding to the history.
    // We do this in a useFocusEffect to ensure the redirect happens every time the screen
    // is focused.
    return <Redirect href="/(app)/(web)/websettings" />;
  } else {
    const { signOut }: any = useMagicSession();
    const pathname = usePathname();
    const segments = useSegments();
    React.useEffect(() => {

    })
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
          value={undefined}
          onChangeText={undefined} 
          />
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
