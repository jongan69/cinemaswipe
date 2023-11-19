import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import ContentCard from '../../components/ContentCard';
import { Text, View } from '../../components/Themed';
import ToggleThemeButton from '../../components/ToggleThemeButton';
import { usePathname, useSegments } from 'expo-router';
import React from 'react';

export default function ModalScreen() {
  const pathname = usePathname();
  const segments = useSegments();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ContentCard
        header={'Welcome to the App'}
        highlight={`You are at ${pathname}`}
        subtitle={`Which is ${segments}`}
        link={'Test'}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      {Platform.OS !== 'web' && <ToggleThemeButton />}
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
