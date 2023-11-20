import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

import ContentCard from '../../components/ContentCard';
import ToggleThemeButton from '../../components/ToggleThemeButton';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ContentCard
        header={'Welcome to Cinema Swipe!'}
        highlight={`This app is designed to help you and your partner find movies to enjoy together`}
        subtitle={`Make sure you are logged in and have a partner email saved.`}
        link={'https://replit.com/@JonGan2/MongoAPI'}
        linkText={'MongoDB Node API'}
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
