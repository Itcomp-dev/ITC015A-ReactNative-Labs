# LAB 12: Protected navigation
For this lab, we will create a custom hook `useIsAuthenticated`, which provides a boolean indicating whether the user is logged in or not.


## Implement the hook function

1. Create a folder `hooks` inside the folder `src`
2. Create a new file `useIsAuthenticated.js` inside that folder
3. A hook is a function that can return any value, create function `useIsAuthenticated`

		export function useIsAuthenticated() {
		    //code here
		}
		
4. Check the authentication data from the store using `useSelector`

			export function useIsAuthenticated() { 
		    const accessToken = useSelector(AuthSelectors.selectAccessToken)
		    const expiration = useSelector(AuthSelectors.selectTokenExpiration) 
		    return validateToken(accessToken, expiration )
		}
 
	The `validateToken` function, checks the `accessToken` and it's expiration time, if the token exists and valid, then the use is authenticated.

5. In the same file, create the `validateToken` utility function outside the hook

		function validateToken(token, expiresIn) {
		    if (!token || token=="" || !expiresIn) {
		        return false;
		    } 
		    const now = new Date().valueOf();
		    const expirationTime = new Date(expiresIn).valueOf()
		    return expirationTime >= now;
		}


##  Update the entry component `App.js` 

Finally, we just need to use the correct navigator, according to authentication data:
1. Go to `App.js` and add another component outside the app component which checks the authentication using the hook we created:
		
		const ProtectedNavigation = () => {
		  const isAuthenticated  = useIsAuthenticated()
		  return isAuthenticated ? <AppNavigator/> : <AuthNavigator/>
		}
2. Update `App` component

		const App = () => {
		  return (
		    <StoreProvider store={store}>
		      <PaperProvider theme={AppTheme}>
		        <NavigationContainer theme={AppTheme}>
		          <ProtectedNavigation/>  //Change over here
		        </NavigationContainer>
		      </PaperProvider >
		    </StoreProvider>
		  );
		};

 
