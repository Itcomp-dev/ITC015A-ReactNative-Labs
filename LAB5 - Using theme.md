# Lab 5: Using theme



## React Native Paper Theme
In this section we'll instegrate react-native-paper theme and cutomize it:
1. Create a folder `consts` inside `src` folder
2. Create a file `app-theme.js` inside `src/consts`
3. Open the file and import the default theme provided by react native paper
	
		import { DefaultTheme} from 'react-native-paper';
4. Create a constant `theme` that spread the default theme
		
		const theme = {
		    ...DefaultTheme
		 }
5. At this point we can override or add extra theme variables, for example change the primary and accent color:

		const theme = {
		  ...DefaultTheme, 
		  colors: {
		    ...DefaultTheme.colors,
		    primary: '#872e2e', 
		  },
		};
6. Add this line to export the theme for other files

		export default theme;

7. Head over `App.js` file and import the app theme by adding this import:

		import AppTheme from "./src/consts/app-theme"

8. Add the theme attribute to the Theme provider, like the following:
	
		<PaperProvider theme={AppTheme}>
		    <!-- Children here -->
		</PaperProvider>
	


## HOC (Higher Order Component)

1. Head over the file `BookItem.jsx`
2. Import the Hoc `withTheme` from react-native paper:

		import { withTheme } from "react-native-paper"
3. Wrap `BookItem` component into `withTheme` HOC like the following:
	
		export const BookItem = withTheme((props) => {
			//the rest here...
		}

	> By doing this, the `withTheme` HOC will provide a theme variable inside props of the component

4. We can access the theme now by doing this:

		const theme = props.theme

5. Change the color of the book title to the theme primary color

		<Subheading style={{color: theme.colors.primary}}> 
			{props.title} 
		</Subheading>
6. Run and test (Try to change theme variables and notice the difference)


