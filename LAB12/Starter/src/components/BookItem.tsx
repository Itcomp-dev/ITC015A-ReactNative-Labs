import React, { useEffect } from 'react'
import { Text, StyleSheet, View, Image} from "react-native"
import {Subheading, Caption, useTheme} from "react-native-paper"
import { withTheme } from "react-native-paper"

interface BookItemProps {
    title: string;
    thumbnailUrl: string;
    shortDescription: string;
    authors: string[];
}

export const BookItem: React.FC<BookItemProps> = (props) => {

    const theme = useTheme()

    useEffect(() => {
        //do something
        console.log(props.title)
    }, [props.title])

    return <View style={styles.container}>
        <Image style={styles.thumbnail} source={{
            uri: props.thumbnailUrl
        }} />
        <View> 
            <Subheading style={{color: theme.colors.primary}}> {props.title} </Subheading> 
            <Caption> {props.authors.join(',')}</Caption>
        </View>
    </View>
}




const styles = StyleSheet.create({
    container: {
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    thumbnail: {
        height: 100,
        aspectRatio: 3 / 4
    },
});