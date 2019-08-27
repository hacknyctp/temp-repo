import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UserWeather extends React.Component {

    constructor() {
        super();
        this.state = {
            country: "",
            city: "",
            zip: "",
            weather: "",
            data: {},
            dataSent: false,

        }
        this.changeTexthandler = this.changeTexthandler.bind(this);
        this.storeData = this.storeData.bind(this);
    }

    //this handler changes the corresponding state values
    changeTexthandler = (event, state) => {
        this.setState({ [state]: event.text });
    }

    //fetches the weaher data
    callForWeather = () => {
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
        //         case "Cloudy": this.setState({ weather: "Cloudy" })
        //             break;
        //     }
        //     //saving the result to the state
        //     this.setState({ data: result });

        // }).catch(error => console.log("something went wrong"))
    }

    //this helper stores the users location and moves on to the next step
    storeData = async () => {

        const { country, city, zip } = this.state;

        try {
            await AsyncStorage.multiSet([['Country', country], ['City', city], ['Zip', zip]]);
            const data = await AsyncStorage.multiGet(['Country', 'City', 'Zip']);
            if (data) {
                /**
                 *  TODO: 
                 *  Need to implement the api
                 *  Once the data is saved send the data to the weather api 
                 *  The data returned is going to show at the bottom where the button ois
                 */


                this.callForWeather()

                // This will render the component and change the button to the current weather
                this.setState({ dataSent: true });


                /**
                 *  TODO:
                 *  Once the button shows the current weather after 3 secs 
                 *  send the user to the next step
                 */

                console.log("inside condition");
                //once data is sent after 3 seconds the screen will change
                if (this.state.dataSent) {
                    setTimeout(() => {
                        this.props.navigation.navigate('RainPreference')
                    }, 3000);
                }


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

                <Text style={styles.text1}>My Location</Text>

                <TextInput onChange={(e) => this.changeTexthandler(e, 'country')} placeholder={'Country'} style={styles.TextInput1} />
                <TextInput onChange={(e) => this.changeTexthandler(e, 'city')} placeholder={'City'} style={styles.TextInput1} />
                <TextInput onChange={(e) => this.changeTexthandler(e, 'zip')} placeholder={'Zipcode'} style={styles.TextInput1} />

                {/* if true show image with weather else show prompt on button */}
                {this.state.dataSent ?
                    <TouchableOpacity
                        onPress={this.storeData}
                        style={styles.button}
                    >

                    </TouchableOpacity> :

                    <TouchableOpacity
                        onPress={this.storeData}
                        style={styles.button}
                    >
                        <Text style={styles.buttonTxt}>Press here for the weather in your area </Text>
                    </TouchableOpacity>

                }
            </View>
        );
    }
}// end class

const styles = StyleSheet.create({

    viewMainStyle: {
        height: "100%",
        width: "100%",
        overflow: "scroll",
        alignItems: "center",
        backgroundColor: '#01404D',
    },
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
        backgroundColor: '#0D7100',
        width: "50%",
        padding: 30,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 20,
        marginTop: 40,
    },
    buttonTxt: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: "center",
        lineHeight: 30,
        textTransform: "uppercase"
    },
    imageArr: {
        width: 150,
        height: 150,
        alignItems: "center",
        borderBottomStartRadius: 5
    }
});

export default UserWeather;

