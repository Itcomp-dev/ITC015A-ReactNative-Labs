# Lab 7: Navigation (Stack)



## Install requirements

1. Run the following command to install Stack navigator and gesture handler:

		yarn add @react-navigation/stack react-native-gesture-handler

2. To finalize installation of `react-native-gesture-handler`, add the following at the **top** (make sure it's at the top and there's nothing else before it) of your entry file, such as `index.js` or `App.js`:

		import 'react-native-gesture-handler';

## Create a `BookDetail` component 

To test the stack navigation, we will need a second component to navigate from the `BooksList` component, on the click on a book item.

1. Create a file `BookDetail.jsx` inside `src/screens` folder
2. Create the component `BookDetail` that contain basic details of a book:

		import React from 'react'
		import {View} from "react-native"
		import {Headline, Paragraph} from "react-native-paper"

		export const BookDetail = (props) => {
		    let book = props.route.params.book
		    return <View>
		          <Headline>{book.title}</Headline>
		          <Paragraph>{book.longDescription}</Paragraph>
		    </View>
		}
		

	> You can also use the hook [`useRoute`](https://reactnavigation.org/docs/use-route/) which give access to `route` object and retreive params

## Setup a Stack navigator
1. Create a file `AppNavigator.jsx` inside the folder `src/navigators`
2. Open that file, and create a stack using `createStackNavigator`

		import { createStackNavigator } from '@react-navigation/stack';
		const Stack = createStackNavigator();

3. Create a component `AppNavigator` which navigate between home screen and book detail screen:

		export const AppNavigator = () => {
		    return <Stack.Navigator>
		        <Stack.Screen name="Home" component={HomeNavigator} />
		        <Stack.Screen name="BookDetail" component={BookDetail} />
		    </Stack.Navigator>
		}
4. Don't forget the missing imports

## Update the `AppBar`

1. **Move** the component `CustomAppBar` from `HomeNavigator.jsx` to `AppNavigator.jsx` and add the back navigation button like the following:
	
		const CustomAppBar = (props) => {
		    return (
		        <Appbar.Header>
		            {props.back ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
		            <Appbar.Content title="BookApp" />
		        </Appbar.Header>
		    );
		}
2. Since we have two navigators, the main navigator which is `AppNavigator` and `HomeNavigator`. We need to show the header (`AppBar`) in only one of them, so we'll need to update screen options for each navigator like the following:

	**AppNavigator.jsx**

		export const AppNavigator = () => {
		    return <Stack.Navigator screenOptions = {(params) => ({
		        header: CustomAppBar
		    })}>
		        <Stack.Screen name="Home" component={HomeNavigator} />
		        <Stack.Screen name="BookDetail" component={BookDetail} />
		    </Stack.Navigator>
		}
	**HomeNavigator.jsx**

		export const HomeNavigator = () => {
		    return <Tab.Navigator screenOptions={(params) => ({ 
		        headerShown: false,  //Hide the app bar in this navigator
		        tabBarIcon: tabBarIcon(params.route.name)
		    })}>
		        <Tab.Screen name="Books" component={BooksList} />
		        <Tab.Screen name="Favorites" component={FavoriteBooks} />
		        <Tab.Screen name="Notifications" component={Notifications} />
		    </Tab.Navigator>
		}

## Update `App.js`

Now, we need to replace `HomeNavigator` by `AppNavigator` (Don't forget to add missing imports)

	const App = () => {
	  return (
	    <PaperProvider theme={AppTheme}>
	      <NavigationContainer theme={AppTheme}>
	        <AppNavigator /> 
	      </NavigationContainer> 
	    </PaperProvider >
	  );
	};

## Navigate between screens and pass data

1. Open `BooksList.jsx` file
2. Add `props` to component function parameters
3. Add a function inside the component `viewDetails` which navigate to book detail screen:

		const viewDetails = (book) => {
	        const navigation = props.navigation
	        navigation.navigate('BookDetail', { book })
	    }

4. Inside the function `renderBook` wrap the `BookItem` into a `TouchableRipple` and bind `onPress` property to `viewDetails` function

		const renderBook = ({ item }) => (
	        <TouchableRipple onPress={()=>viewDetails(item)}>
	            <BookItem title={item.title}
	                thumbnailUrl={item.thumbnailUrl}
	                shortDescription={item.shortDescription}
	                authors={item.authors} />
	        </TouchableRipple>
	    );
	    
	    

	> We use **TouchableRipple** to add a ripple effect when clicking on the item, view also :
		[`TouchableOpacity`](https://reactnative.dev/docs/touchableopacity),  [`TouchableHighlight`](https://reactnative.dev/docs/touchablehighlight),  [`TouchableWithoutFeedback`](https://reactnative.dev/docs/touchablewithoutfeedback), 

5. Add the import : `import { TouchableRipple } from 'react-native-paper'`

6. Run the app and test navigation.
