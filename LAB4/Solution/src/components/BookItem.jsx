import React, {useEffect} from 'react'
import {Text,} from "react-native"


export const BookItem = (props) => {
    
    useEffect(()=>{
        //do something
        console.log(props.title)
    }, [props.title])

    return <Text>
        {props.title}
    </Text>
}