# LAB 12: Use Typescript

By default, React Native uses Javascript as the official language support, in this lab we'll switch to Typescript for better type checking and code maintenability.

# Install requirements

Run the following command to install all the dev dependencies related to `typescript`

	yarn add -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer

## Configure Typescript

Create a new file `tsconfig.json` containing the following json configuration in the project root directory:


	{
	    "compilerOptions": {
	      "allowJs": true,
	      "allowSyntheticDefaultImports": true,
	      "esModuleInterop": true,
	      "isolatedModules": true,
	      "jsx": "react-native",
	      "lib": ["es6"],
	      "moduleResolution": "node",
	      "noEmit": true,
	      "strict": true,
	      "target": "esnext",   
	      "noImplicitAny": false
	    },
	    "exclude": [
	      "node_modules",
	      "babel.config.js",
	      "metro.config.js",
	      "jest.config.js"
	    ]
	}

## Updating files
1. Rename all the files having `.js` extension to `.ts` extension
2. Rename all `.jsx` files containing components to `.tsx` extension


## Declare models

1. Create a new folder `models` inside `src/store`
2. Create the necessary models, example:

		export interface Book {
		    id: number;
		    title: string;
		    thumbnailUrl: string;
		    authors: string[];
		    categories: string[];
		    shortDescription: string;
		    longDescription: string;
		    pageCount: number;
		    isbn: string;
		    publishedDate: string | Date;
		} 

		export interface PagedResult<T> {
		    items: T[];
		    totalCount: number;
		}

3. Add the missing type annotations

## Updating components

1. Review all the project files and add types to all functions parameters
2. Review all the components and type them with `React.FC<T>` where `React.FC` indicate a functional component and `T` the type of the component props
3. Create the missing prop types, for example:

		export const BookItem: React.FC<BookItemPropType> = (props:BookItemPropType) => {
		    //Content here
		}
		interface BookItemPropType {
		  authors: string[];
		  thumbnailUrl: string;
		  title: string;
		  shortDescription: string; 
		  theme?: Theme;
		}



