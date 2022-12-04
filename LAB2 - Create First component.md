# Lab 2: Using Components




## Project structure
1. Create a folder `src` inside the project root directory
2. Create two folders `screens` and `components` inside the `src` folder

## JSX Support
By default, react native only resolves files having the extension `.js`, to work with `.jsx` files you have to specify `resolvers` in the `metro.config.js` file like the following:
	
	module.exports = {
		//Add this section
		resolver: { 
			sourceExts: ['jsx','js', 'ts', 'tsx', 'json']  
		},
		transformer: {
			getTransformOptions: async () => ({
				transform: {
					experimentalImportSupport: false,
					inlineRequires: true,
				},
			}),
	  },
	};

## Create `BookItem` component
1. Create a file `BookItem.jsx` inside the `src/components` folder
2. Import `React` 

		import React from 'react'
		
	
	> Each file (.js or .jsx) that contains a component, **must** contain the React imported.

3. Create a function-based component named `BookItem`
4. The component has to return a `<Text>` node only having a hardcoded string value, example:
	
		<Text> Bookname </Text>
5. Don't forget to import the Text component from react native, like the following:

		import  {Text}  from  "react-native"
6. Add the `export` qualifier to the component to import it later in other components

## Create `BooksList` component
1. Create a file `BooksList.jsx` inside the `src/screens`folder
2. Open this file and create a function-based component named `BooksList`
3. The component has to return multiple book items wrapped inside a view node only, example:

		<View>
			<BookItem/>
			<BookItem/>
			<BookItem/>
		</View>

4. Don't forget to import the View component from react-native and the BookItem from the components folder:
		
		import  {BookItem}  from  "../components/BookItem"
5. Update the file `app.js`. Remove placeholder code from starter template and replace it by the following:

		import React from 'react'
		import { SafeAreaView, StatusBar, View, Dimensions } from "react-native"
		import { BooksList } from "./src/screens/BooksList"

		const App = () => {
			return (
				 <View>
					 <BooksList />  
				</View>
			);
		};

		export default App;
6. Run the app and test
		
 






