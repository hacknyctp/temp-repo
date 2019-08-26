import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            retypePassword: ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    //This helper function gathers all the data in asyncstorage and calls the backed to save user11.50 + 
    sendData = async () => {
        const { username, email, password, retypePassword } = this.state;
        let sentData = [];
        try {
            await AsyncStorage.multiSet([['username', username], ['email', email], ['password', password], ['retypePassword', retypePassword]]);
            sentData = await AsyncStorage.multiGet(['username',
                'email',
                'passowrd',
                'Monday',
                'Tuesday',
                'Wenensday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
                'rainPercentage',
                'humidityPercentage'
            ])
        } catch (error) {
            console.log(`There was an error => ${error}`)
        }

        /**
         * TODO:
         * send 'sentData' to the backend
         * the format of the data is going to be a nested array
         * InnerArray[0] is the key
         * InnerArrar[1] is the value
         */




    }

    onChangeHandler = (event, name) => {
        this.setState({ [name]: event.nativeEvent.text });
    }

    render() {
        return (
            <View style={styles.viewMainStyle}>

                <Text style={styles.text1}>Weather App</Text>

                <Text style={styles.text2}>Finish signing up and you will have your personalized weather notification up and running!</Text>

                <Text style={styles.text3}>SignUp</Text>

                <TextInput value={this.state.username} onChange={(e) => { onChangeHandler(e, "username") }} placeholder={'Username'} style={styles.input} />

                <TextInput value={this.state.email} onChange={(e) => { onChangeHandler(e, "email") }} placeholder={'Email'} style={styles.input} />

                <TextInput value={this.state.password} onChange={(e) => { onChangeHandler(e, "password") }} placeholder={'Password'} style={styles.input} />

                <TextInput value={this.state.retypePassword} onChange={(e) => { onChangeHandler(e, "retypePassword") }} placeholder={'Retype-Password'} style={styles.input} />

                <TouchableOpacity
                    style={styles.button}
                    onPress={sendData}
                >
                    <Text> Enter </Text>
                </TouchableOpacity>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    //text inputs   
    input: {
        width: 200,
        height: 44,
        padding: 10,
        color: '#CB812B',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: '#ffffff',
        margin: 10
    },
    text1: {
        //weather app text
        fontSize: 35,
        paddingTop: 30,
        color: '#CB812B',
        textAlignVertical: 'top'
    },
    text2: {
        //finsih signing up text
        fontSize: 25,
        color: '#ffffff',
        alignItems: "center",
        //margin: 10
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15
    },
    text3: {
        //sign up orange text
        fontSize: 25,
        paddingTop: 20,
        paddingBottom: 20,
        color: '#CB812B',
        alignItems: "center"
    },
    button: {
        //buttton -->cant change text color, or maniupulate size 
        alignItems: 'center',
        backgroundColor: '#0D7100',
        color: '#ffffff',
        padding: 10,
        marginTop: 15,
        width: 125,
        fontSize: 50,
        borderRadius: 20

    },
    //the view main style text
    viewMainStyle: {
        alignContent: "center",
        alignItems: "center",
        backgroundColor: '#01404D',
        fontWeight: 'bold'
    },
    buttonTxt: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'

    }
});
