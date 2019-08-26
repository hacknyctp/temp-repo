import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class WelcomePage extends Component {

    /**
     * TODO:
     * This function should use react navigation to go to the loginPage
     */
    goToLogin = () => {

    }

    /**
     * TODO:
     * This funciton should procced the user to the next step in signing up
     */
    goToNextStep = () => {

    }

    render() {
        return (
            <View style={styles.viewMainStyle}>
                <Image style={styles.imageArr} source={require('./assets/iconfinder_Snow_Occasional_47313.png')} />
                <Text style={styles.paragraph}>Wounldn't you like to have a personalized weather app to send you weather app to send you weather updates based off time, rain percentage, or humuduty level?</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={goToNextStep}
                >
                    <Text style={styles.buttonTxt}> Yes I Do </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={goToLogin}
                >
                    <Text style={styles.text1}>Login</Text>
                </TouchableOpacity>

            </View>
        );
    }
}// end class

const styles = StyleSheet.create({
    //PARAGRAPH
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff'
    },
    //BUTTON
    button: {
        alignItems: 'center',
        backgroundColor: '#0D7100',
        padding: 10,
        marginTop: 15,
        width: 125,
        borderRadius: 20,
        fontWeight: 'bold'
    },
    //MAIN STYLING
    viewMainStyle: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#01404D',
        flexWrap: 'wrap'
    },
    text1: { //LOGIN TEXT
        paddingTop: 10,
        color: '#CB812B',
        fontSize: 20,
        margin: 30,
        fontWeight: 'bold'
    },
    imageArr: { //IMAGE ATTRIBUTES
        width: 150,
        height: 150,
        margin: 30
    },
    buttonTxt: { //TEXT FOR THE BUTTON
        fontsize: 30,
        color: '#ffffff',
        fontWeight: 'bold'
    }
});

