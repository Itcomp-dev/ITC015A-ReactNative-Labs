# LAB8: Redux Toolkit




## Setup the project
1. First, run the following command to install requirements:
		
		yarn add @reduxjs/toolkit react-redux
2. Create a folder `store` inside the `src` folder
3. Inside the `store` folder create those folders: `slices` and `selectors` and an entry point: `index.js` file.


## Create a Slice

1. Create a file `books.slice.js` inside `src/store/slices` folder
2. Use `createSlice` function from Redux Toolkit to create a slice. 
		
		import { createSlice } from '@reduxjs/toolkit' 
		const booksSlice = createSlice({
		    //the rest here ...
		})
		
3. Declare a variable `booksInitialState` which is the initial state of the book:

		const booksInitialState  = { 
		    items: [],
		    totalCount: 0,
		    loading: false,
		} 
4. Give a name to the slice (`'books'`) and the initial state (`booksInitialState)`
	
		const booksSlice = createSlice({
		    name: 'books',
		    initialState: booksInitialState,
		    reducers: {
		        //Reducers here
		    }
		})
		
5. Import the sample data : `import Books from "../../data/books.json"`
6. Add the following reducers to handle the state: `fetchBooks` and `addBook`

		const booksSlice = createSlice({
		    name: 'books',
		    initialState: booksInitialState,
		    reducers: {
		        fetchBooks(state) {
		            state.items = Books
		            state.totalCount = Books.length 
		        },
		        addBook(state, action) {
		            state.items.push(action.payload)
		            state.totalCount+=1
		        },
		    }
		})
		
7. At this point we've create a `slice`, we just need to export the `actions` and `reducer` from this slice to be able to use them in the app
 
		export const {fetchBooks, addBook} = booksSlice.actions;
		export const booksReducer = booksSlice.reducer


## Create Selectors
1. Create a file `books.selectors.js` inside `src/store/selectors`folder
2. Create a slice selector function which return `books` state object
3. Create a value selector using the function createSelector from Redux Toolkit for books and their count:
		
		const selectBooksCount = createSelector(booksState, (books) => books.totalCount)
		const selectBooks = createSelector(booksState, (books) => books.items)
		
		

	> The first argument is the **slice** selector and second is a selector function from the slice (state) object

4. Export the selectors from this file to use them from the components
		
		export const BooksSelectors = {
		    selectBooksCount,
		    selectBooks
		}

## Configure the Store
1. Head over to the entry point `index.js` of the `src/store` folder
2. Configure a store using the function `configureStore` from Redux Toolkit
		
		export const store = configureStore({
		    reducer: {
		        //Reducers here
		    },
		  })
3. We need to provide all the reducers of the application in the parameter `reducer` , as a key-value object, where the key must match the slice name, example:
The key **`books`** (matches the slice name) and the value is **`booksReducer`**

		export const store = configureStore({
		    reducer: {
		        books: booksReducer
		    },
		})

## Update `App.js`
We have configured our store but, yet we cannot use it from the UI Components, to do so we have to wrap the entire app into the `StoreProvider` component
1. Go to App.js and add import the store provider and the configured `store` object
		
		import { Provider as StoreProvider } from 'react-redux'
		import {store} from "./src/store"
2. Wrap the root of the app into `StoreProvider` and provide the store object, the final result should look like the following:
	
		<StoreProvider store={store}>
	      <PaperProvider theme={AppTheme}>
	        <NavigationContainer theme={AppTheme}>
	          <AppNavigator />
	        </NavigationContainer>
	      </PaperProvider >
		</StoreProvider>


## Update `BooksList` component
Now, we'll consume data from the store
1. Go to `BooksList.jsx` in `src/screens` folder
2. Import the two hooks `useSelector` and `useDisptacher` from Redux toolkit
	
		import { useDispatch, useSelector } from 'react-redux'
3. **Remove** the local state created with useState
4. Get the books from the store by selecting the value using the previously created

		const books = useSelector(BooksSelectors.selectBooks)
	If you run the application now, Books list will show nothing since the initial state is an empty array (`[]`), so we have to dispatch an action to load the books into the store.
5. Import `useEffect` from react
6. Create a constant `dispatch` having the value of `useDisptach`
	
		const dispatch = useDispatch()
7. Add an initialization block using `useEffect` hook before the return block

		useEffect(()=>{
		        dispatch(fetchBooks())
		    })
8. Run the app and test

