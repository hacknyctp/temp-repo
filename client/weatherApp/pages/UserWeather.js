import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Button, } from 'react-native';
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
            data: {},
            weather: ""
        }
        this.changeTexthandler = this.changeTexthandler.bind(this);
        this.storeData = this.storeData.bind(this);
    }

    //this handler changes the corresponding state values
    changeTexthandler = (event, state) => {
        this.setState({ [state]: event.text });
    }

    // storeData = () => {
    //     console.log("her her")
    // }
    //this helper stores the users location and moves on to the next step
    storeData = async () => {
        try {
            const { country, city, zip } = this.state;
            await AsyncStorage.multiSet([['Country', country], ['City', city], ['Zip', zip]]);
            const data = await AsyncStorage.multiGet(['Country, City, Zip']);

            if (data != null) {
                /**
                 *  TODO: need to implement the api
                 *  Once the data is saved send the data to the weather api 
                 *  The data returned is going to show at the bottom where the button ois
                 */

                // fetch("url", {
                //     method: "POST",
                //     body: {
                //         zipCode: this.state.zip
                //     }
                // }).then(result => {
                //     //depending of weather the state will determine the correct image to use
                //     switch (result.data.main) {
                //         case "Rain": this.setState({ weather: "rain" })
                //             break;
                //         case "Cloudt": this.setState({ weather: "Cloudy" })
                //             break;
                //     }
                //     //saving the result to the state
                //     this.setState({ data: result });

                // }).catch(error => console.log("something went wrong"))


                // This will render the component and change the button to the current weather
                this.setState({ dataSent: true });


                /**
                 *  TODO:
                 *  Once the button shows the current weather after 3 secs 
                 *  send the user to the next step
                 */

                console.log("hit the button");
                //once data is sent after 3 seconds the screen will change
                // if (dataSent) {
                setTimeout(() => {
                    this.props.navigation.navigate('RainPreference')
                }, 300);
                // }


            } else {
                alert("Please fill out where you are located")
                console.log("the values came out null")
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

                <TextInput onChange={(e) => this.changeTexthandler(e, 'country')} placeholder={'Country'} style={styles.TextInput1} />
                <TextInput onChange={(e) => this.changeTexthandler(e, 'city')} placeholder={'City'} style={styles.TextInput1} />
                <TextInput onChange={(e) => this.changeTexthandler(e, 'zip')} placeholder={'Zipcode'} style={styles.TextInput1} />
                {this.state.dataSent ?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.storeData}
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
                <Button onPress={this.storeData} title="text"> </Button>



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

