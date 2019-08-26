import React from 'react';
import { Text, View, TextInput, Button, Picker, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Schedule extends React.Component {
    constructor() {
        super();
        this.state = {
            M: " ",
            Tu: " ",
            W: " ",
            Th: " ",
            F: " ",
            Sa: " ",
            Su: " ",
            sent: false,
            data: [""]
        }
    }


    /**
     * This helper function changes corresponding state values depending on the textinput
     * The text comes from the daysOfTheWeek array that corresponds to each state
     * Text is the state being change. time is the actual value
     */

    inputText = (time, text) => {
        this.setState({ [text]: time });
    }

    //function to save to aysncStorage
    storeData = async () => {
        if (this.state.pressed) this.getData();

        // destructing the state object
        const { M, Tu, W, Th, F, Sa, Su } = this.state;
        let value = [];
        //aysncStorage saves the users data till we send it all together when user signs up
        try {
            /**
             * TODO:
             *  Test in the backend to check if none of the days are empty string (default state value)
             */

            await AsyncStorage.multiSet([['Monday', M], ['Tuesday', Tu], ['Wenensday', W], ['Thursday', Th], ['Friday', F], ['Saturday', Sa], ['Sunday', Su]]);
            value = await AsyncStorage.multiGet(['Monday', 'Tuesday', 'Wenensday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
        } catch (e) {
            // error
            console.log(`${e} there was an error`);
        }

        /**
         * TODO:
         * Under this line we need to a call to the weather api 
         * map the data into state.data
         */




        /**
         * TODO:
         * Change the placeholders to the picker
         */

        //checks if all of the values are not empty;
        const noEmptyStrings = value.every(innerArray => innerArray[1] != " ")
        // this changes the contexts and renders new data to the screen if all states have values
        if (noEmptyStrings) this.setState({ sent: true })
        else alert("please select a time for all days");

    }


    render() {
        // these days of the week are going to be mapped to correspond to each box and state
        const daysOfTheWeek = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
        return (
            // this is the main container
            <View style={styles.container}>
                <Text style={styles.headerText}> {this.state.sent ? "During the week I leave my house at" : "Heres how your week is looking like"} </Text>

                {/* this the container holding the data that needs to be sent to the backend */}
                <View>
                    {this.state.sent ?
                        this.state.data.map((data, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.boxes}>{data}</Text>
                                </View>
                            )
                        })
                        //when the data is sent the component shows the weather for the day of the week 
                        //the data is going to be mapped to show each week
                        : daysOfTheWeek.map((text, index) => {
                            return (
                                <View key={index} style={styles.form}>
                                    <Text style={styles.formText}>{text}:</Text>
                                    <Picker
                                        placholder={"Please select a time"}
                                        selectedValue={this.state[text]}
                                        onValueChange={(e) => this.inputText(e, text)}
                                        style={styles.boxes}
                                    >
                                        <Picker.Item label="12 AM" value="12 AM" />
                                        <Picker.Item label="1 AM" value="1 AM" />
                                        <Picker.Item label="2 AM" value="2 AM" />
                                        <Picker.Item label="3 AM" value="3 AM" />
                                        <Picker.Item label="4 AM" value="4 AM" />
                                        <Picker.Item label="5 AM" value="5 AM" />
                                        <Picker.Item label="6 AM" value="6 AM" />
                                        <Picker.Item label="7 AM" value="7 AM" />
                                        <Picker.Item label="8 AM" value="8 AM" />
                                        <Picker.Item label="9 AM" value="9 AM" />
                                        <Picker.Item label="10 AM" value="10 AM" />
                                        <Picker.Item label="11 AM" value="11 AM" />
                                        <Picker.Item label="12 PM" value="12 PM" />
                                        <Picker.Item label="1 PM" value="1 PM" />
                                        <Picker.Item label="2 PM" value="2 PM" />
                                        <Picker.Item label="3 PM" value="3 PM" />
                                        <Picker.Item label="4 PM" value="4 PM" />
                                        <Picker.Item label="5 PM" value="5 PM" />
                                        <Picker.Item label="6 PM" value="6 PM" />
                                        <Picker.Item label="7 PM" value="7 PM" />
                                        <Picker.Item label="8 PM" value="8 PM" />
                                        <Picker.Item label="9 PM" value="9 PM" />
                                        <Picker.Item label="10 PM" value="10 PM" />
                                        <Picker.Item label="11 PM" value="11 PM" />
                                    </Picker>
                                </View>
                            )
                        })
                    }
                </View>
                {/* if the data is sent the button will disapear  */}
                {this.state.sent ? null :
                    // <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={this.storeData}
                        style={styles.btnNext}
                    >
                        <Text style={{ color: "white" }}> Next </Text>
                    </TouchableOpacity>
                    // </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        maxHeight: "100%",
        width: "100%",
        overflow: "scroll",
        alignItems: "center"
    },
    headerText: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    defaultText: {
        color: "white",
        fontSize: 30,
    },
    btnNext: {
        flex: 1,
        backgroundColor: "green",
        width: "30%",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 20,
    },
    form: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
    },
    formText: {
        color: "white",
        fontSize: 25,
        width: "20%",
    },
    boxes: {
        backgroundColor: "white",
        width: "40%",
        marginLeft: 20,
        marginBottom: 10,
    },

});

export default Schedule;