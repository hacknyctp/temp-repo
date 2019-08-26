import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, } from 'react-native';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

export default class page3 extends Component {

    constructor() {
        super();
        this.state = {
            imgOpacity: 0,
            countty: "",
            city: "",
            zip: "",
            dataSent: false,
            data: [],
        }
    }


    //this helper stores the users location and moves on to the next step
    storeData = async () => {
        try {
            const { country, city, zip } = this.state;
            await AsyncStorage.multiSet([['Country', country], ['City', city], ['Zip', zip]]);
            const data = await AsyncStorage.multiGet(['Country, City, Zip']);

            if (data != null) {
                /**
                 *  TODO:
                 *  Once the data is saved send the data to the weather api 
                 *  The data returned is going to show at the bottom where the button uus
                 */


                this.setState({ dataSent: true });

                /**
                 *  TODO:
                 *  Once the button shows the current weather after 3 secs 
                 *  send the user to the next step
                 */


                if (dataSent) {
                    setTimeout(() => {
                        this.props.navigation.navigate('RainPreference')
                    }, 3000);
                }


            } else {
                alert("Please fill out where you are located")
            }
        } catch (error) {
            console.log(`There was an error: ${error}`);
            alert("error please try again later");
        }

    }

    render() {
        return (
            <View style={styles.viewMainStyle}>


                <Text style={styles.text1}>
                    My Location
          </Text>

                <TextInput placeholder={'Country'} style={styles.TextInput1} />
                <TextInput placeholder={'City'} style={styles.TextInput1} />
                <TextInput placeholder={'Zipcode'} style={styles.TextInput1} />
                {this.state.dataSent ?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPressButton}
                    >
                        {/* an image should show here on the current weather */}
                    </TouchableOpacity> :

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.storeData}
                    >
                        <Text style={styles.buttonTxt}>Press for the weather in your area </Text>
                    </TouchableOpacity>

                }



            </View>
        );
    }
}// end class

const styles = StyleSheet.create({

    TextInput1: {
        color: '#ffffff',
        fontSize: 30,
        textAlign: 'center',
        textShadowColor: '#ffffff',
        margin: 20,
        width: "50%",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff'
    },
    text1: {
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
        margin: 20
    },
    button: {
        //buttton -->cant change text color, or maniupulate size 
        backgroundColor: '#0D7100',
        padding: 10,
        marginTop: 15,
        width: 200,
        height: 150,
        fontSize: 50,
        borderRadius: 20,
        alignContent: 'center',
        justifyContent: "center",
    },
    viewMainStyle: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#01404D'
    },
    buttonTxt: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: "center",
        lineHeight: 30,
    },
    imageArr: {
        width: 150,
        height: 150,
        alignItems: "center",
        borderBottomStartRadius: 5
    }
});

