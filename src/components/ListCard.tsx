import React from 'react';
import { StyleSheet, Image } from 'react-native';

import Themes from '../theme/Themes';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';


export default function ListCard({ item }: { item: any }) {

  return (
    <View style={styles.listcontainer}>
      <ExternalLink
        style={styles.helpLink}
        href={`https://www.google.com/search?q=${item.movieTitle}`}>
        <Image source={{ uri: item.image }} style={{ height: 30, width: 30 }} />
        <Text
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {item.movieTitle}
        </Text>
      </ExternalLink>
    </View>
  );
}

const styles = StyleSheet.create({
  listcontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: "#00a1f1",
    height: 50,
    width: '100%',
    resizeMode: 'contain'
  },
  separator: {
    alignSelf: "center",
    width: 10,
    height: 10,
  },
  helpLink: {
    width: '100%',
  },
});
