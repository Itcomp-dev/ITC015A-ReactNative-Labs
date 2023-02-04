# Lab 3: State and Props

A React (Native) component can manage two types of data : State and Props, in this lab you'll get to use and manage a state using React Hooks such as useState and useEffect, also pass data from a parent to a child component using Props.


## useState hook
1. Go to `BooksList` component and create a variable `bookTitles` that contains a list of book titles, example:

		const bookTitles =  ["Zero to One",  "Rich dad poor dad",  "The midnight library"]

2. Create a state inside the `BooksList` component using the `useState` hook, and initialize it with `bookTitles` :

		const  [books, setBooks]  =  useState(bookTitles)

3. Don't forget to update the imports:

		import React,  {useState}  from  'react'

4. Previously, in lab 2 this component was rendering the book items statically, now we're going to make it render dynamically according to the `books` piece of state by replacing this:

		<View>
			<BookItem/>
			<BookItem/>
			<BookItem/>
		</View>
with this:
	
	<View>
		{books.map(book=> <BookItem />)} 
	</View>

> The javascript function "**map**" is helpful when you want to render a dynamic list of items by mapping each item to the corresponding component

## Passing Props
1. Go to `BookItem` component and add `props` to it's parameters defintion.
2. Replace the previously hardcoded string '**_Booktitle_**' by the real book title like the following:
	
		export const BookItem = (props) => {
			return <Text>{props.title}</Text>
		}
3. Return to the parent component `BooksList` component and bind the props of the child component (`BookItem`) to the book title 

		<View>
			{books.map(book=> <BookItem key={book} title={book} />)} 
		</View>
4. Run the app and test

## useEffect hook
At this point, we already used the hook `useState` to create a piece of state to our component, the other common used hook is `useEffect` which is used generally for initialization or some side effects triggered when some state changes.
1.  Add the following code in the `BookItem` component before the return:

		useEffect(()=>{
			//do something
			console.log(props.title)
		}, [props.title])

	> For every `props.title` value change the effect triggered executing the function passed to `useEffect` hook. ie: logging every title

2. Update the imports

		import React,  {useState}  from  'react'
3. Run the code and see the logs in the metro interface


