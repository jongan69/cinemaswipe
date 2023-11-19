import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from './Themed';

export default function Separator() {
    return (
        <View style={styles.separator} lightColor="#000" darkColor="#fff" />
    );
}

const styles = StyleSheet.create({
    separator: {
        alignSelf: "center",
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
