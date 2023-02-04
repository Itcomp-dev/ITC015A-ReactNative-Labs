# LAB 10: Build forms

Forms are a fundamental part of every user experience, in this lab will show how to use one of the most common libraries used to creat ana manage forms which is Formik, along with validating data from users with Yup validators. 

## Install requirements
Run the following command to install `Formik` and `Yup` validators
		
		yarn add formik yup
 

## Add new screen
1. Go to `src/screens/NewBook.jsx` and create a new empty component `NewBook`
2. Add the `NewBook` screen to the `AppNavigotor` and map it with the name: `'NewBook'`

		<Stack.Navigator ...>
	        ...
	        <Stack.Screen name="NewBook" component={NewBook}/>
		 </Stack.Navigator>

3. Navigate to `NewBook` screen
4. Go to `BooksList` component and add a floating action button (FAB) in this screen

		<FAB
		  style={{ position: 'absolute', right: 16, bottom: 16 }} 
		  icon="plus"
		  onPress={addNewBook}
		/>
5. The `onPress` callback should point to a function `addNewBook`, which should navigate to `NewBook` screen

		const addNewBook = () => {
	        const navigation = props.navigation
	        navigation.navigate('NewBook')
	    }

## Build the creation form

1. Go to `NewBook.jsx` and add A `Formik` element, like the following

		import { Formik } from 'formik';

		export const NewBook = () => {

	    const initialValues = {
	        title: '',
	        isbn: '',
	        thumbnailUrl: Yup.string().url(),
	        pageCount: '',
	        publishedDate: new Date(),
	        shortDescription: '',
	        longDescription: '',
	        authors: [],
	        categories: []
	    }
	    return <Formik
		            initialValues={initialValues}
		            onSubmit={values => console.log(values)}
		            //the rest here 
		    </Formik
		}
2. The formik content has to be a builder function that receive `handlers` and return the form (inputs), like the following

		<Formik ...>
	    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
	        <View>
	            <TextInput
	                label="Title"
	                value={values.title}
	                mode="outlined"
	                onChangeText={handleChange("title")}/>
	        </View>
	    )
	</Formik>
3. Add a `TextInput` for each property of the book (`title`, `isbn`, `thumbnailUrl`, `pageCount`, `publishedDate`, ...etc) **except**  `authors` and `categories`.
4. For the publish date, we'll use a `DatePicker` to let the user choose the date and not type it manually. Run the following command to install `react-native-date-picker`

		yarn add react-native-date-picker moment
5.  Add a control state in the component, to set date picker modal visibility

		const [datePickerOpened, setDatePickerOpened] = useState(false)
6. Add the `DatePicker` component under the publish date text input, after importing it

	`import DatePicker from 'react-native-date-picker'`
	
			<DatePicker
			    modal
			    open={datePickerOpened}
			    mode="date"
			    date={values.publishedDate}
			    onConfirm={(date) => {
			        values.publishedDate = date
			        setDatePickerOpened(false);
			    }}
			    onCancel={() => {
			        setDatePickerOpened(false)
			    }}
			/>
7. Update the publish date text input by removing `onChangeText` handler add `onPressIn` handler to open the date picker dialog when user press the publish date input
	
		<TextInput
		    style={styles.input}
		    label="Publish date"
		    value={values.publishedDate ? values.publishedDate.toLocaleDateString('fr') : ''}
		    mode="outlined"
		    onPressIn={() => setDatePickerOpened(true)}
		/>

8. Finally, add a submit button (`import Button from 'react-native-paper'`)
		
		<Button  icon="check" mode="contained" onPress={handleSubmit}>
		  Save
		</Button>


## Improve the UI

1. For some styling, we could add the following styles:

		const styles = StyleSheet.create({
		    formContainer: {  //For the view container 
		        padding: 16
		    },
		    input: {      //For each input
		        marginVertical: 8
		    }
		})
2. Apply the previous styles to the corresponding elements: `TextInput` and the main `View`
2. The form could get longer and exceed the screen bounds, so we have to wrap everything inside a `ScrollView` component:

		 return <ScrollView>
		  <Formik ...>
		   //...
		   </Formik
		 <ScrollView>


## Validate the form
Now, the form has no validation, the user could type anything and still get accepted. Yup validators allow to bind the form with validators such as (number, string, email, url, dates,...)

1. Import Yup: `import * as Yup from 'yup';`
2. Create a validation scheme outside the component, like the following:

		const validationScheme = Yup.object({
		    title: Yup.string().required(),
		    isbn: Yup.string().required(),
		    thumbnailUrl: Yup.string().url(),
		    pageCount: Yup.number().required(),
		    shortDescription: Yup.string(),
		    longDescription: Yup.string(),
		    publishedDate: Yup.date(),
		})
3. Bind the validation scheme with the Formik component by adding this property:
	
			<Formik
		        ...
		        validationSchema={validationScheme}>
		     ...
		</Formik>
	By doing so, `errors` value provided by `Formik` is now populated and we can check for errors
4. Add a `HelperText` under each input to show error messaged to the user
		
		//Example for the title property
		{errors.title ? <HelperText type="error"> 
		                   Title is required // or directly {errors.title}
		                </HelperText> 
		              : <></>
5. Disable the Save button when there is at least one error by adding `disabled` prop

		<Button disabled={Object.values(errors) > 0}   icon="check" 
						mode="contained" onPress={handleSubmit}>
		    Save
		  </Button>


## Submitting the form


### POST request
1. Go to `books.datasource.js` in the folder `src/data/datasources`
2. Add a function insertBook which makes a POST request

		export function insertBook(book) { 
		    return HttpClient.post("/api/books", book)
		} 

### Bind with the store
1. Go to `books.actions.js` and add a create an async thunk (asynchrounous action) `addBook`

		export const addBook = createAsyncThunk('[Books] addBook', async (args, thunkApi)=>{ 
		    let response = await insertBook(args.book);
		    return response.data;
		})
2. Go to `books.slice.js` and a new property to the initial state

		 insertStatus: 'idle' //or 'pending', 'fulfilled', 'rejected'
3. Add the matching cases to the `addBook` async thunk in the `extraReducers` section

		builder.addCase(addBook.pending, (state, action)=>{
		    state.insertStatus = 'pending'
		});
		builder.addCase(addBook.fulfilled, (state, action)=>{
		    let book = action.payload
		    state.items.unshift(book)
		    state.insertStatus = 'fulfilled'
		});
		builder.addCase(addBook.rejected, (state, action)=>{
		    state.insertStatus = 'rejected'
		});
4. Go to `books.selectors.js` and add a selector for `insertStatus`

		const selectInsertStatus = createSelector(booksState, (books) => books.insertStatus)

		export const BooksSelectors = {
		    //the rest
		    selectInsertStatus
		}

### Dispatching the action
1. Go back to `NewBook` screen and add the dispatcher , the `insertStatus` selector in the component and a local `submitted` state initialized to false

		const disptach = useDispatch()
		const insertStatus = useSelector(BooksSelectors.selectInsertStatus)
		const [submitted, setSubmitted]  = useState(false)

2. Create a function `onSubmit` which should disptach an `addBook` action

		const onSubmit = (values) => {
		        disptach(addBook({
		            book: values
		        }))
		    }
		//...
	
		<Formik
		   ...
		    onSubmit={onSubmit}>
		    //...
		 </Formik>   

3. Add a loading attribute to the save button to give feedback to user
	
		<Button loading={insertStatus=='pending'} ...>
		  Save
		</Button>

4. After a successful insert operation, we should exit the new book screen and go back to the list, we can do this by using `useEffect`

		useEffect(()=>{ 
	        if (submitted && insertStatus=='fullfiled') {
	            props.navigation.goBack() 
	        } else if (insertStatus=='rejected') {
	            setSubmitted(false)
	        }
	    }, [submitted, insertStatus])

	If the form was **submited** and the status is **fullfiled** (succesful) return to the list component, otherwise, if it's **rejected** reset the submission to false to allow user to try to submit again.
