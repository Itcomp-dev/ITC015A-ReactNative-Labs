import React from "react"
import {View, Text, StyleSheet} from "react-native"

export const FavoriteBooks = () => {
    return <View style={styles.container}>
        <Text>My favorite books !</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})