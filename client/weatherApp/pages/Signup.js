import React, { Component } from 'react';
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
    }

    onChangeHandler = (event) => {

    }

    render() {
        return (
            <View style={styles.viewMainStyle}>

                <Text style={styles.text1}>
                    Weather App
      </Text>

                <Text style={styles.text2}>
                    Finish signing up and you will have your personalized weather notification up and running!
      </Text>

                <Text style={styles.text3}>
                    SignUp
      </Text>

                <TextInput onChangeText={(e) => { onChangeHandler(e) }} placeholder={'Username'} style={styles.input} />

                <TextInput onChangeText={(e) => { onChangeHandler(e) }} placeholder={'Email'} style={styles.input} />

                <TextInput onChangeText={(e) => { onChangeHandler(e) }} placeholder={'Password'} style={styles.input} />

                <TextInput onChangeText={(e) => { onChangeHandler(e) }} placeholder={'Retype-Password'} style={styles.input} />

                <TouchableOpacity
                    style={styles.button}
                //onPress={this.onPress}
                >
                    <Text> Enter </Text>
                </TouchableOpacity>



            </View>
        );
    }
}