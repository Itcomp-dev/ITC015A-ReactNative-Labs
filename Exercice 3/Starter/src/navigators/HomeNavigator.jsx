import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BooksList } from '../screens/BooksList'
import { FavoriteBooks } from '../screens/FavoriteBooks'
import { Notifications } from '../screens/Notifications'
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export const HomeNavigator = () => {
    return <Tab.Navigator screenOptions={(params) => ({
        headerShown: false,
        tabBarIcon: tabBarIcon(params.route.name)
    })} >
        <Tab.Screen name="Books" component={BooksList} />
        <Tab.Screen name="Favorites" component={FavoriteBooks} />
        <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
}



const tabBarIcon = (routeName) => {
    let icon = ""
    switch (routeName) {
        case "Books":
            icon = "book"
            break;
        case "Favorites":
            icon = "heart"
            break;
        case "Notifications":
            icon = "bell"
            break;
    }
    return ({ focused, color, size }) => <Icon name={icon} size={size} color={color} />
}