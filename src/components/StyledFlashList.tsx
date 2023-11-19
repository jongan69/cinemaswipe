import { StyleSheet, Image } from 'react-native';

import { Text, View } from './Themed';
import React from 'react';
import { FlashList } from "@shopify/flash-list";
import ListCard from './ListCard';
import { ExternalLink } from './ExternalLink';

const onSelectSwitch = (value: any) => {
    alert('Tab Switched')

};

export default function StyledFlashList(props: any) {
    console.log(props.data)
    return (
        <FlashList
            keyExtractor={(item) => {
                return item._id
            }}
            renderItem={({ item }) => {
                return (
                    <View style={styles.listcontainer}>
                        <Image source={{ uri: item.mage }} style={{ height: 30, width: 30 }} />
                        <ExternalLink
                            //style={styles.helpLink}
                            href={`https://www.google.com/search?q=${item.movieTitle}`}>
                            <Text
                                lightColor="rgba(0,0,0,0.8)"
                                darkColor="rgba(255,255,255,0.8)">
                                {item.movieTitle}
                            </Text>
                        </ExternalLink>
                    </View>
                )
            }}
            estimatedItemSize={100}
            // onEndReached={() => {
            //   // Since FlatList is a pure component, data reference should change for a render
            //   const elems = [...this.state.elems];
            //   elems.push(...this._generateArray(elems.length, 20));
            //   this.setState(() => {
            //     return { elems };
            //   });
            // }}
            onEndReachedThreshold={0.2}
            data={props.data}
        />
    );
}

const styles = StyleSheet.create({
    listcontainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'flex-start',
        height: 120,
        backgroundColor: "#00a1f1",
    },
    separator: {
        alignSelf: "center",
        width: 10,
        height: 10,
    },
});
