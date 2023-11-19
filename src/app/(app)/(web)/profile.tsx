import { StyleSheet } from 'react-native';

import ContentCard from '../../../components/ContentCard';
import { Text, View } from '../../../components/Themed';
import { useSession } from '../../../auth/ctx';
import { usePathname, useSegments } from 'expo-router';
import React from 'react';

import * as AppData from '../../../../app.json'

export default function WebProfile() {
  const { session, signOut }: any = useSession();
  const pathname = usePathname();
  const segments = useSegments();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ContentCard
        header={`Hello ${session}`}
        highlight={`You are at ${pathname}`}
        subtitle={`Which is ${segments}`}
        link={`${AppData.expo.githubUrl}/blob/main/src/app/${segments[0]}/${segments[1] ? `${segments[1]}/` : ''}${segments[2] ? `${segments[2]}` : ''}.tsx`}
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