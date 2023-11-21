import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { ExternalLink } from './ExternalLink';
import { Text, View } from './Themed';
import CachedImage from 'expo-cached-image'

export default function ListCard({ item }: { item: any }) {
  return (
    <View style={styles.listcontainer}>
      <ExternalLink
        style={styles.helpLink}
        href={`https://www.google.com/search?q=${item.movieTitle}`}>
        {/* <Image source={{ uri: item.image }} style={{ height: 30, width: 30 }} /> */}
        <CachedImage
          source={{
            uri: `${typeof(item.image) === 'string' && item.image.length > 1 ? item.image : `https://www.kindpng.com/picc/m/30-300778_transparent-movie-marquee-png-movie-icon-png-flat.png`}`, // (required) -- URI of the image to be cached
          }}
          cacheKey={`${item._id}-thumb`} // (required) -- key to store image locally
          placeholderContent={( // (optional) -- shows while the image is loading
            <ActivityIndicator // can be any react-native tag
              size="small"
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            />
          )}
          resizeMode="contain" // pass-through to <Image /> tag 
          style={{ height: 30, width: 30 }}
        />
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
