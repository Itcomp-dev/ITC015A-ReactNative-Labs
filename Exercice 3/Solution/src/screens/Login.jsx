import { Formik } from "formik"
import React, { useState } from "react"
import { View, Image, StyleSheet } from "react-native"
import { TextInput, Button, Text, Headline, Subheading, HelperText } from "react-native-paper"
import { ASSETS } from "../../assets"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/actions/auth.actions"
import { AuthSelectors } from "../store/selectors/auth.selectors"

const initialValues = {
    email: 'demo@rn.com',
    password: 'Demo@123'
}

const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
})

export const Login = () => {

    let dispatch = useDispatch()
    let [passwordVisible, showPassword] = useState(false)
    let loading = useSelector(AuthSelectors.selectLoading)

    const onSubmit = (values) => {
        console.log(values)
        dispatch(login({
            email: values.email,
            password: values.password
        }))
    }

    return <View style={styles.container}>
        <View>

            <View style={styles.center}>
                <Image style={styles.avatar} source={ASSETS.avatar} />
                <Headline >Welcome</Headline>
                <Subheading >Login to access the app</Subheading>
            </View>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors }) => (
                    <View>
                        <View style={styles.input}>
                            <TextInput
                                label="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                error={errors.email}
                                left={<TextInput.Icon icon="email" />}
                            />
                            {errors.email ? <HelperText type="error">{errors.email}</HelperText> : <></>}
                        </View>
                        <View style={styles.input}>

                            <TextInput
                                label="Password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                right={<TextInput.Icon onPress={()=>showPassword(!passwordVisible)} icon="eye" />}
                                left={<TextInput.Icon icon="lock" />} 
                                error={errors.email}
                                secureTextEntry={!passwordVisible}
                            />
                            {errors.password ? <HelperText type="error">{errors.password}</HelperText> : <></>}
                        </View>

                        <Button loading={loading} style={styles.input} mode="contained" onPress={handleSubmit}>
                            LOGIN
                        </Button>
                    </View>

                )}
            </Formik>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 16
    },
    avatar: {
        width: 120,
        height: 120
    },
    input: {
        marginVertical: 8
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32
    }
})