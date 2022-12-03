# Lab 6: Navigation (Tabs)



## Install requirements

1. Run the following command in the project directory, to install React Navigation

		yarn  add @react-navigation/native react-native-screens 
				deepmerge react-native-safe-area-context

2. Run the following command to install bottom tabs navigator and vector icons

		yarn add @react-navigation/bottom-tabs react-native-vector-icons
3. After installing the dependencies go to file `android/app/build.gradle` and add this line:

		apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

## Add more screens
1. Create a file `FavoriteBooks.jsx` in the folder `src/screens` that have this placeholder component:

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
2. Create a file `Notifications.jsx` in the folder `src/screens` that have this placeholder component:

		import React from "react"
		import {View, Text, StyleSheet} from "react-native"

		export const Notifications = () => {
		    return <View style={styles.container}>
		        <Text>Notifications !</Text>
		    </View>
		}

		const styles = StyleSheet.create({
		    container: {
		        flex:1,
		        justifyContent: 'center',
		        alignItems: 'center'
		    }
		})

## Setup Tab Navigator

1. Create a folder `navigators` inside `src` folder
2. Create a file `HomeNavigator.jsx` in the folder `src/screens`
3. Create a component `Home` in this file
4. Add the following import:
	
		import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
	
5. Create a const `Tab`, outside the component

		const Tab = createBottomTabNavigator();
	
6. The `Tab` variable holds a `Navigator` and a `Screen` component which can be used to create the Home `component` UI hierarchy

		export const Home = () => {
		    return <Tab.Navigator>
		        <Tab.Screen name="Books" component={BooksList} /> 
		        <Tab.Screen name="Favorites" component={FavoriteBooks} /> 
		        <Tab.Screen name="Notifications" component={Notifications} /> 
		    </Tab.Navigator>
		}
7. Don't forget to import the corresponding components.


## Update `App.js`

Go to `App.js` file and wrap everything inside `NavigationContainer` to make navigation work properly, the App component should look like this:

	const App = () => {
	  return (
	    <PaperProvider theme={AppTheme}>
	      <NavigationContainer>
	          <HomeNavigator />
	        </NavigationContainer>
	    </PaperProvider >
	  );
	};

	export default App;


## Update the theme (`AppTheme`)

If you run the app you'll notice that the colors on the app bar and bottom tab navigation are different from the previous configured theme, and that's because **React Native Paper** and **React Navigation** has two different themes and themes provider (PaperProvider, NavigationContainer).

For that reason we need to provide one theme for both by combining them:

1. Go to `app-theme.js` and import the navigation theme:
	
		import { DefaultTheme as DefaultNavigationTheme } from '@react-navigation/native';
2. Merge the paper theme and the navigation theme using `deepmerge`

		const combinedTheme = merge(DefaultTheme, DefaultNavigationTheme)

3. Update the app theme using the `combinedTheme`

		const theme = {
		    ...combinedTheme,
		    colors: {
		        ...combinedTheme.colors,
		        primary: '#872e2e', 
		    },
		};
4. Go to App.js and add the `theme` attribute to `NavigationContainer`, the final result should look like this

		<PaperProvider theme={AppTheme}>
	      <NavigationContainer theme={AppTheme}>
	        <HomeNavigator /> 
	      </NavigationContainer> 
	    </PaperProvider >


## Customize the Bottom Tab Navigator
Bottom tabs navigator provide an option `screenOptions` from which you can customize the tab bar like icons or the style.

1. We're going to change the `AppBar` and provide a custom one, go to `HomeNavigator.jsx` and create a component `CustomAppBar`

		const CustomAppBar = () => {
		    return (
		        <Appbar.Header>
		            <Appbar.Content title="BookApp" />
		        </Appbar.Header>
		    );
		}

2. For the bottom bar navigation icons, we'll need to create a function that map each route name with the corresponding icon, in the same file create the function `tabBarIcon`

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
		    return ({ focused, color, size }) => 
								    <Icon name={icon} size={size} color={color} />
		}
3. For the icon names we're using `FontAwesome`, don't forget to add the missing import:

		import Icon from 'react-native-vector-icons/FontAwesome';

4. Now we need to provide these options to `screenOptions` for the `Tab.Navigator` in the `HomeNavigator` component

		<Tab.Navigator screenOptions={(params) => ({
		        header: CustomAppBar,
		        tabBarIcon: tabBarIcon(params.route.name)
		    })}>
		    <!--screens here-->
		</Tab.Navigators>

5. Run the app and test
