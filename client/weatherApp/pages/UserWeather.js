import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UserWeather extends React.Component {

    constructor() {
        super();
        this.state = {
            country: "United states",
            city: "New York City",
            zip: "10033",

        }
        this.changeTexthandler = this.changeTexthandler.bind(this);
        this.storeData = this.storeData.bind(this);
    }

    //this handler changes the corresponding state values
    changeTexthandler = (event, state) => {
        this.setState({ [state]: event.text });
    }

    //this helper stores the users location and moves on to the next step
    storeData = async () => {

        const { country, city, zip } = this.state;

        if (country === "" || city === "" || zip === "") {
            console.log("the values came out null")
            return alert("Please fill out where you are located");
        }

        try {
            console.log("inside the try method");
            await AsyncStorage.multiSet([['Country', country], ['City', city], ['Zip', zip]]);
            this.props.navigation.navigate('Schedule');

        } catch (error) {
            console.log(`There was an error: ${error}`);
            alert("error please try again later");
        }



    }

    render() {
        return (
            <View style={styles.viewMainStyle}>

                <Text style={styles.text1}>My Location</Text>

                <TextInput value={this.state.country} onChange={(e) => this.changeTexthandler(e, 'country')} placeholder={'Country'} style={styles.TextInput1} />
                <TextInput value={this.state.city} onChange={(e) => this.changeTexthandler(e, 'city')} placeholder={'City'} style={styles.TextInput1} />
                <TextInput value={this.state.zip} onChange={(e) => this.changeTexthandler(e, 'zip')} placeholder={'Zipcode'} style={styles.TextInput1} />

                <TouchableOpacity
                    onPress={this.storeData}
                    style={styles.button}
                >
                    <Text style={styles.buttonTxt}>next</Text>
                </TouchableOpacity>


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
        marginTop: "20%"
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0D7100',
        color: '#ffffff',
        padding: 10,
        marginTop: "20%",
        width: 125,
        fontSize: 50,
        borderRadius: 5
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
    },
    weatherView: {
        backgroundColor: "#FFF",
        width: "50%",
        padding: 30,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 20,
        marginTop: 40,
    },
    weatherPercentages: {
        flex: 1,
        marginTop: "30%",
        width: "100%",
        lineHeight: 25,
    }
});

export default UserWeather;

