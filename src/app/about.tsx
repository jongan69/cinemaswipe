import { View, Text } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import Header from '../components/Header.web';
import Banner from '../components/Banner.web';

export default function Details() {
  const router = useRouter();
  const params: any = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="About"
        subTitle="Overview"
      />

      {/* First team member */}
      <Banner
        title="About Us"
        subtitle="Software Engineer"
        description="Lor ipsumtamet, consectetur adipiscing elit, sed do eiusmod te"
        img="https://github.com/jongan69/jongan69/blob/main/profile.PNG?raw=true"
      />
    </View>
  );
}
