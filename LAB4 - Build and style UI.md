# Lab 4: Build an style UI



## Fake data
Before starting this lab, we'll need some fake data to use in our components.
1. Create a folder `data` inside the `src` folder
2. Download the ressource file `books.json` and save it inside the `data` folder

	> Each book item contains the following properties: `id`, `title`, `isbn`, `authors`, `pageCount`, `publishDate`, `shortDescription`, `longDescription` 

## React Native Paper
In this section, we'll be installing a third-party UI library : React Native Paper, which is a material UI components library for react native.
1. Run the following command to install the library:

		yarn add react-native-paper


## Updating `BookItem` component

Currently, BookItem component return a simple Text node having the title of the book, we're going to improve the layout of the book item:
1. Head over `BookItem.jsx` file
2. Wrap the previous `Text` node into a `View` node (Don't forget to add the missing imports)
	
		<View>
	      <Text> {props.title} </Text>
		</View>

3. Add an Image inside the View container, to show the book's thumbnail:

		<View>
	        <Image source={{
	          uri: props.thumbnailUrl
	        }}/>
	        <Text> {props.title} </Text>
		</View>
4. Add another Text node under the title to show the authors

		<View>
	        <Image source={{
	          uri: props.thumbnailUrl
	        }}/>
	        <Text> {props.title} </Text>
	        <Text> {props.authors.join(',')}</Text>
		</View>

	> Since authors `property` is an array, we can use **`join`** function to join author names into one string.

## Update `BooksList` componeent

1. Go to `BooksList.jsx` file
2. Add the following line to import the sample data:
		
		import BOOKS from "../data/books.json"
3. Delete the previous array variable (bookTitles)
4. Initialize the state of `BookList` component with `BOOKS`
	
		const [books, setBooks] = useState(Books);
5. Pass the missing props to the child component (`BookItem`) : `title`, `thumbnailUrl`, `shortDescription` and `authors`

		<BookItem title={book.title} 
		          thumbnailUrl={book.thumbnailUrl}
		          shortDescription={book.shortDescription}
		          authors={book.authors}  />
		          

## Add some styles
1. Go to `BookItem.jsx` and create a new variable `styles` outside the component definition, and use `StyleSheet` to create the styles:
	
		const styles = StyleSheet.create({
		   //Styles here
		});
2.  Add a style for the `thumbnail` image

		const styles = StyleSheet.create({
			thumbnail: {
				height: 100,
				aspectRatio: 3/4
			},
		});
3. Add the style to the `Image` node like the following:
 
		 <Image  style={styles.thumbnail} source={{
	          uri: props.thumbnailUrl
	      }}/>
4. Add a style for the `container` view

		const styles = StyleSheet.create({
		   // other styles ...
		   container: {
		    padding: 16,
		    display: 'flex',
		    flexDirection: 'row',
		    justifyContent: 'flex-start',
		    alignItems: 'center'
		  }
		);
5. Add the style attribute to the root `View`

		<View style={styles.container}>
			//Content here...
		</View>
6. Wrap the two Text nodes inside another View, and replace the first `Text` node by `Subheading` and the second by `Caption`, to have this final result

	
		<View style={styles.container}>
	        <Image  style={styles.thumbnail} source={{
	          uri: props.thumbnailUrl
	        }}/>
	        <View> 
	          <Subheading> {props.title} </Subheading>
	          <Caption> {props.authors.join(',')}</Caption>
	        </View>
	    </View>

7. Don't forget to import the new components from react-native-paper

		import {Subheading, Caption} from "react-native-paper"


## Use `ScrollView`
If you run the app you notice that nothing will happen if you try to scroll down, to add scrolling capabilities we need to wrap our component into a `ScrollView`
1. Head over `BooksList` component and replace the root `View` with `ScrollView`

		<ScrollView>
	        // Content here
	    </ScrollView>
2. Update the imports: `import { ScrollView } from "react-native"`

## Optimize rendering with `FlatList`
`ScrollView` renders all its react child components at once, but this has a performance downside.
Imagine you have a very long list of items you want to display, maybe several screens worth of content. Creating JS components and native views for everything all at once, much of which may not even be shown, will contribute to slow rendering and increased memory usage.
 1. To use `FlatList` we need first an item renderer function, create a function `renderBook` inside `BooksList` component like the following:

		const renderBook = ({ item }) => (
	        <BookItem title={item.title}
		            thumbnailUrl={item.thumbnailUrl}
		            shortDescription={item.shortDescription}
		            authors={item.authors}/>
	      );
 2. Replace `ScrollView` by `FlatList` node like the following:
		
		<FlatList
		        data={books}
		        renderItem={renderBook}
		        keyExtractor={item => item.id}
		    />
		    
	`FlatList` Attributes:
	 - `data`: Takes the array of elements
	 - `renderItem`: A function that render a view for a single item (In this case a `BookItem` for each book)
	 - `keyExtractor`: A selector function that provide a unique identifier of an item (In this case the id of the book)

3. Update the imports: `import { FlatList} from "react-native"`


## Add an `AppBar`
1. Update the `App` component in `App.jsx` file, like the following:


		import React from 'react'
		import { SafeAreaView, StatusBar, View, Dimensions } from "react-native"
		import { Appbar, Provider as PaperProvider } from 'react-native-paper';
		import { BooksList } from "./src/screens/BooksList"

		const App = () => {
		  return (
		    <PaperProvider > 
		        <Appbar.Header>
		          <Appbar.Content title="BooksApp" />
		        </Appbar.Header>
		         <BooksList />  
		    </PaperProvider >
		  );
		};

		export default App;

2. Run the app and test







