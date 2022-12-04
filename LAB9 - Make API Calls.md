# LAB 9: Make API Calls




## Install requirements
Run the following command to install `Axios`
		
		yarn add axios
 

## Configure `Environment` 
1. Create a file `environment.js` under the root directory of the project
2. Create a settings variable that will contain application settings for both mode `dev` and `debug`
	
		const settings = {
		    dev: {
		        //development settings here
		    },
		    prod: {
		        //prod settings here
		    }
		}
3. Now, export those settings from the file by checking the global variable `__DEV__` like the following:

		export default ENV = __DEV__ ? settings.dev : settings.prod

	> The global variable **__DEV__** in React Native is a boolean set true when the application is running on debug mode.

4. Add the BooksAPI **base url** to environment settings
	
		dev: {
	        baseUrl: "https://books-app-rn.azurewebsites.net"
	   },

## Configure `Axios` instance

1. Create a folder `datasources` inside the `src/data` folder
2. Create an entry file `index.js` inside that folder
3. In that file, create a http client instance like the following:
		
		export const HttpClient = axios.create({ baseURL: ENV.baseUrl }); 
4. Don't forget to import `environment` variables and the `axios` package

		import ENV from "../../../envrionment.";
		import axios from "axios";

## Create the datasource

1. Create a folder `datasources` in `src/data` folder
2. In the same folder `src/data/datasources` create a file `books.datasource.js` (The data source should contain a set of function that calls the API using the configured http client.)
3. Create a function `fetchBooks` that takes 2 parameters: `skipCount` and `maxResultCount`. 
	
		export function fetchBooks(skipCount=0, maxResultCount=10) { 
		    return HttpClient.get("/api/books", {
		        params: {skipCount, maxResultCount}
		    })
		}
4. Add the missing import: `import { HttpClient } from ".";`


## Bind with Redux Store
In the previous labs, we were fetching data (books) from a sample file `books.json` already loaded in the project, so everything was `synchronous` and we need only for a reducer that change the state by assigning a variable (`state.items = Books`)

Now, we're trying to fetch the data from a remote API, so the action in this case in `asynchronous,` in this case we need to use a special function from Redux toolkit called `createAsyncThunk` that enables us to create asynchronous actions of which their result can change the state.

1. Create a folder `actions` inside the `src/store` folder
2. b. Create a file `books.actions.js` inside that folder
3. c. Create an `asynchronous` action like the following:

		export const getBooks = createAsyncThunk('[Books] getBooks', async (args, thunkApi)=>{ 
		    let response = await fetchBooks(args.skipCount, args.maxResultCount);
		    return response.data;
		})
	The first argument is a the action **type** (unique identifier of the action) and the second is an **asynchronous function** that returns a **promise**


	> An async thunk generates promise lifecycle action types based on the action type prefix that you pass in, and returns a thunk action that will run the promise callback and dispatch the lifecycle actions based on the returned promise.

4. Now, we have to handle each promise state (**pending**, **fulfilled**, **rejected**) in the books slice:
Go to `books.slice.js` and remove the previous reducer logic for the action (`getBooks`)

		const booksSlice = createSlice({
		    //...
		    extraReducers: builder => {
		    },
		    //the rest here
		})

5. Add a new property `extraReducers` to the `createSlice` parameter object:

		const booksSlice = createSlice({
		    //...
		    extraReducers: builder => {
		    },
		    //the rest here
		})

	> **extraReducers** is a callback function that receives a `builder` as argument which is a mapping builder between an **action** and a **reducer logic**

6. Finally, we map each each state of the async thunk (getBooks) with a logic:

		const booksSlice = createSlice({
		    //...
		    extraReducers: builder => {
		            builder.addCase(getBooks.pending, (state, action)=>{
		                state.loading = true
		            });
		            builder.addCase(getBooks.fulfilled, (state, action)=>{
		                let page = action.payload
		                state.items = state.items.concat(page.items)
		                state.totalCount = page.totalCount
		                state.loading = false 
		            });
		            builder.addCase(getBooks.rejected, (state, action)=>{
		                //TODO handle network errors 
		                state.loading = false 
		            });
		    },
		    //the rest here...
		})


## Update the `BooksList` component
Since the data is now paginated, we need to update the `BooksList` component to specify the `pageIndex` and the `pageSize` that will be sent when disptaching the action (`getBooks`)
1. Add a local state `pageIndex` using the `useState` hook, initialized with **0** (first page)

		const [pageIndex, setPageIndex] = useState(0)
2. Update the `useEffect` initializer, as the following: (load 10 items per page)

		useEffect(() => {
	        dispatch(getBooks({
	            skipCount: pageIndex * 10,
	            maxResultCount: 10
	        }))
	    }, [pageIndex])
	
	> By adding `pageIndex` to the second parameter of `useEffect`, we're dispatching the action _**each time**_  `pageIndex` changes value.

3. Add those attributes to the `FlatList` component to update the `pageIndex` each time the use reach the end of the list:

		<FlatList
		    //...
		    onEndReached={() => setPageIndex(pageIndex + 1)} //Callback when end reached
		    onEndReachedThreshold={0.5} //How far from the end
		/>

## Improve the User Experience
If you run and test the app, everything should work properly, but the user has no feedback when the data is loading or loaded, so we'll add a spinner to our component
1. Add a selector for the propery `lodaing` of the books slice

		const selectBooksLoading = createSelector(booksState, (books) => books.loading)
		//...
		export const BooksSelectors = {
		    //...
		    selectBooksLoading
		}

2. Use that selector in the `BooksList` component to know when the data is loading

		const isLoading = useSelector(BooksSelectors.selectBooksLoading)
3. Add an `ActiviyIndicator` node from `react-native-paper` at the top of the component when `isLoading` is set to **true**, like the following:

		return <>
		    {isLoading ? <ActivityIndicator style={{position: 'absolute', right:0, left:0, top:16}} /> : <></>}
		    <FlatList
		        data={books}
		        renderItem={renderBook}
		        keyExtractor={item => item.id}
		        onEndReached={() => setPageIndex(pageIndex + 1)}
		        onEndReachedThreshold={0.5}
		    />
		</>
4. Run the app and test


## Add network `interceptors`
To intercept errors and show messages to users without repeating code for each action, we can attach to the http client instance an interceptor like the following:
		
		export const HttpClient = axios.create({ baseURL: ENV.baseUrl });

		HttpClient.interceptors.response.use(
		    response=>response,
		    error=>{
		        console.log(error)
		        Alert.alert("An error has occured !")
		        return Promise.reject(error)
		    }
		)

Try to change the base url and provide a wrong one and test if the interceptor works.

> This interceptor shows a simple alert, for more styled and flavored messages, see [`react-native-flash-messages`](https://www.npmjs.com/package/react-native-flash-message) **,** and follow the guide.



