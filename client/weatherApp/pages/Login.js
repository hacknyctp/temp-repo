import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';


export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            passoword: "",
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    //sends data to the backend for verification
    sendData = () => {
        /**
         * TODO: 
         * Send data to backend 
         */


    }

    onChangeHandler = (event, name) => {
        this.setState({ [name]: event.nativeEvent.text });
        console.log(`${name} input field is ${event.nativeEvent.text}`);
    }


    render() {
        return (
            <View style={styles.viewMainStyle}>

                <Text style={styles.text1}>Weather App</Text>

                <Image style={styles.imageArr} source={require('../assets/iconfinder_Snow_Occasional_47313.png')} />

                <Text style={styles.text2}>Login</Text>

                {/* onchange is passing a event object and the current inputfield to change the corresponding state  */}
                <TextInput value={this.state.email} onChange={(e) => { this.onChangeHandler(e, "email") }} placeholder={'Email'} style={styles.input} />

                <TextInput value={this.state.password} onChange={(e) => { this.onChangeHandler(e, "password") }} placeholder={'Password'} style={styles.input} />

                <TouchableOpacity
                    style={styles.button}
                    onPress={sendData}
                >
                    <Text style={styles.buttonTxt}> Enter </Text>
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    //INPUT STYLING
    input: {
        width: 250,
        height: 44,
        padding: 10,
        color: '#CB812B',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: '#ffffff',
        marginBottom: 10,
        margin: 10
    },
    text1: {
        //weather app text
        fontSize: 35,
        //margin: 30
        paddingTop: 30,
        color: '#CB812B',
        textAlignVertical: 'top'
    },
    text2: {
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
    viewMainStyle: { //  styling for all the components
        alignContent: "center",
        alignItems: "center",
        backgroundColor: '#01404D',
        fontWeight: 'bold'
    },
    imageArr: { //image attributes
        width: 150,
        height: 150,
        margin: 25
    },
    buttonTxt: { //text for the button
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',

    }
});