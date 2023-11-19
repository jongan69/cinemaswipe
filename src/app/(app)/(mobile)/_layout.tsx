import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, useLocalSearchParams } from 'expo-router';
import { Pressable } from 'react-native';
import { View, Text } from '../../../components/Themed';

import { StyleSheet } from 'react-native';
import React from 'react';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(app)',
};

export default function AppLayout() {
  // const colorScheme = Themes[useTheme().dark ? 'dark': 'light'];
  const params = useLocalSearchParams();

  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: colorScheme.tabIconSelected,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          // title: appData.expo.name ?? params.name,
          title: 'Home',
          headerTitle: () => (
            <>
              <Text style={styles.title}>
                Home
              </Text>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </>),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    // color={colorScheme.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: 'Likes',
          headerTitle: ({ children }) => (
            <>
              <Text style={styles.title}>
                {children}
              </Text>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </>),
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerTitle: ({ children }) => (
            <>
              <Text style={styles.title}>
                {children}
              </Text>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </>),
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    height: '100%'
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 1,
    height: 1,
    width: '100%',
  },
});