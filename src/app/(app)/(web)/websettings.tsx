import { Button, StyleSheet } from 'react-native';

import ContentCard from '../../../components/ContentCard';
import { Text, View } from '../../../components/Themed';
import { useSession } from '../../../auth/ctx';
import { usePathname, useSegments } from 'expo-router';
import React from 'react';

import * as AppData from '../../../../app.json'
import InputField from '../../../components/InputField';

export default function WebSettings() {
  const { signOut }: any = useSession();
  const [connectedEmail, setConnectedEmail] = React.useState("")

  async function save() {
    alert("🔐 Saving 🔐 \n" + connectedEmail);
    try {
      await localStorage.setItem("connectedEmail", connectedEmail);
      alert("🔐 Saved 🔐 \n" + connectedEmail);
    } catch {
      alert("🔐 Error Saving 🔐 \n");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <InputField
        label={'Connected Email'}
        icon={undefined}
        inputType={undefined}
        keyboardType={undefined}
        fieldButtonLabel={undefined}
        fieldButtonFunction={undefined}
        value={connectedEmail}
        onChangeText={text => setConnectedEmail(text)}
      />
      <button onClick={save} style={{ backgroundColor: 'gray' }}>
        Save Partner Email
      </button>
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
