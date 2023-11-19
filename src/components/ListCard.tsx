import React from 'react';
import { StyleSheet, Image } from 'react-native';

import Themes from '../theme/Themes';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';


export default function ListCard(data: any) {
  const { movieTitle, image, connectedUserEmail } = data
  console.log(data)
  return (
    <View style={styles.listcontainer}>
      <Image source={{ uri: image }} style={{ height: 30, width: 30 }} />
      <ExternalLink
        style={styles.helpLink}
        href={`https://www.google.com/search?q=${movieTitle}`}>
        <Text
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {movieTitle}
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
    height: 30,
    width: '100%'
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
