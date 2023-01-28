import React, { useState, useEffect } from "react";
import { Formik } from 'formik'
import { Button, TextInput, HelperText } from 'react-native-paper'
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DatePicker from 'react-native-date-picker'
import * as Yup from 'yup';
import {BooksSelectors} from "../store/selectors/books.selectors"
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux'
import {addBook} from "../store/actions/books.actions"

const validationSchema = Yup.object({
    title: Yup.string().required(),
    isbn: Yup.string().required(),
    thumbnailUrl: Yup.string().url(),
    pageCount: Yup.number().required(),
    shortDescription: Yup.string(),
    longDescription: Yup.string(),
    publishedDate: Yup.date(),
})

export const NewBook = () => {

    const dispatch = useDispatch()
    const insertStatus = useSelector(BooksSelectors.selectInsertStatus)
    const navigation = useNavigation()
    const [submitted, setSubmitted]  = useState(false)

    const [datePickerOpened, setDatePickerOpened] = useState(false)

    const initialValues = {
        title: '',
        isbn: '',
        thumbnailUrl: 'https://m.media-amazon.com/images/I/51FInNmoxSS.jpg',
        pageCount: '',
        publishedDate: new Date(),
        shortDescription: '',
        longDescription: '',
        authors: [],
        categories: []
    }

    const onSubmit = (values) => {
        setSubmitted(true)
        dispatch(addBook({
            book: values
        }))
    }

    useEffect(()=>{ 
        if (submitted && insertStatus=='fulfilled') {
            navigation.goBack() 
        } else if (insertStatus=='rejected') {
            console.log("Error")
            setSubmitted(false)
        }
    }, [submitted, insertStatus])


    return <ScrollView>
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >

            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors }) => <>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        label="Title"
                        value={values.title}
                        mode="outlined"
                        onChangeText={handleChange("title")} />
                    {errors.title ? <HelperText type="error">
                         {errors.title}
                    </HelperText>
                        : <></>}

                    <TextInput
                        style={styles.input}
                        label="ISBN"
                        value={values.isbn}
                        mode="outlined"
                        onChangeText={handleChange("isbn")} />
                        {errors.isbn ? <HelperText type="error">
                         {errors.isbn}
                    </HelperText>
                        : <></>}

                    <TextInput
                        style={styles.input}
                        label="Thumbnail URL"
                        value={values.thumbnailUrl}
                        mode="outlined"
                        onChangeText={handleChange("thumbnailUrl")} />
                        {errors.thumbnailUrl ? <HelperText type="error">
                         {errors.thumbnailUrl}
                    </HelperText>
                        : <></>}

                    <TextInput
                        style={styles.input}
                        label="Page count"
                        value={values.pageCount}
                        mode="outlined"
                        onChangeText={handleChange("pageCount")} />
                        {errors.pageCount ? <HelperText type="error">
                         {errors.pageCount}
                    </HelperText>
                        : <></>}

                    <TouchableOpacity onPress={() => setDatePickerOpened(true)}>
                        <View pointerEvents="none">
                            <TextInput
                                style={styles.input}
                                label="Published date"
                                value={values.publishedDate ? values.publishedDate.toLocaleDateString('fr') : ''}
                                mode="outlined"
                                onChangeText={handleChange("publishedDate")} />
                        </View>

                    </TouchableOpacity>
                    {errors.publishedDate ? <HelperText type="error">
                         {errors.publishedDate}
                    </HelperText>
                        : <></>}



                    <Button  loading={insertStatus=='pending'} disabled={Object.values(errors) > 0} style={styles.input} icon="check" mode="contained" onPress={handleSubmit}>
                        Save
                    </Button>

                </View>

                <DatePicker
                    modal
                    open={datePickerOpened}
                    mode="date"
                    date={values.publishedDate}
                    onConfirm={(date) => {
                        setFieldValue("publishedDate", date)
                        setDatePickerOpened(false);
                    }}
                    onCancel={() => {
                        setDatePickerOpened(false)
                    }}
                />
            </>}
        </Formik>
    </ScrollView>
}

const styles = StyleSheet.create({
    formContainer: {  //For the view container 
        padding: 16
    },
    input: {      //For each input
        marginVertical: 8
    }
})
