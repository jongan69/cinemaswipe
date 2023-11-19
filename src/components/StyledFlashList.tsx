import { StyleSheet } from 'react-native';

import React from 'react';
import { FlashList } from "@shopify/flash-list";
import ListCard from './ListCard';

export default function StyledFlashList(props: any) {
    const [matches, refreshing, setRefreshing] = props.data
    return (
        <FlashList
            keyExtractor={(item: any) => {
                return item._id.toString();
            }}
            refreshing={refreshing}
            onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                    setRefreshing(false);
                }, 2000);
            }}
            renderItem={ListCard}
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
            data={matches}
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
