import { useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, ScrollView, Image } from "react-native"
import { Caption, Paragraph, Title, Subheading, Chip } from "react-native-paper"

export const BookDetail = (props) => {
    let route = useRoute()
    let book = route.params?.book
    return <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.center}>
            <Title>
                {book.title}
            </Title>
            <Image style={styles.cover} source={{ uri: book.thumbnailUrl }} />
            <Caption>
                {book.authors.join(", ")}
            </Caption>
            <Caption>
                {book.publishedDate}
            </Caption>
        </View>

        <Subheading>Categories</Subheading>
        <ScrollView horizontal={true}>
            {book.categories.map(category => <Chip>{category}</Chip>)}

        </ScrollView>
        <Subheading>Description</Subheading>
        <Paragraph style={styles.content}>{book.longDescription}</Paragraph>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        display: 'flex',
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start"
    },
    center: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    cover: {
        width: "50%",
        aspectRatio: 1 / 1.4
    },
    content: {
        textAlign: "justify"
    }
})