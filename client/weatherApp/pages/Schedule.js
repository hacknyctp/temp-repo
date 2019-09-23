import React from 'react';
import { Text, View, TextInput, Picker, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

class Schedule extends React.Component {

    constructor() {
        super();
        this.state = {
            //the states of the week are the times the user leaves the house
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

        // destructing the state object
        const { M, Tu, W, Th, F, Sa, Su } = this.state;
        let value = [];
        //aysncStorage saves the users data till we send it all together when user signs up
        try {
            await AsyncStorage.multiSet([['Monday', M], ['Tuesday', Tu], ['Wenensday', W], ['Thursday', Th], ['Friday', F], ['Saturday', Sa], ['Sunday', Su]]);
            value = await AsyncStorage.multiGet(['Monday', 'Tuesday', 'Wenensday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
        } catch (e) {
            // error
            console.log(`${e} there was an error`);
        }

        //checks if all of the values are not empty;
        const noEmptyStrings = value.every(innerArray => innerArray[1] != " ")
        // this changes the contexts and renders new data to the screen if all states have values
        if (noEmptyStrings) this.props.navigation.navigate("RainPreference");
        else alert("please select a time for all days");

    }


    render() {

        firebase.auth()
            .signInAnonymously()
            .then(credential => {
                if (credential) {
                    console.log('default app user ->', credential.user.toJSON());
                }
            });


        // Build a channel
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');

        // Create the channel
        firebase.notifications().android.createChannel(channel);

        // Build a channel group
        const channelGroup = new firebase.notifications.Android.ChannelGroup('test-group', 'Test Channel Group');

        // Create the channel group
        firebase.notifications().android.createChannelGroup(channelGroup);


        // Build notification
        const notification = new firebase.notifications.Notification()
            .setNotificationId('notificationId')
            .setTitle('My notification title')
            .setBody('My notification body')
            .setData({
                key1: 'value1',
                key2: 'value2',
            });
        //As Android provides some bespoke notification functionality, we have segregated this into an AndroidNotification class 
        notification
            .android.setChannelId('channelId')
            .android.setSmallIcon('ic_launcher');

        // Display the notification
        firebase.notifications().displayNotification(notification);

        // Schedule the notification for 1 minute in the future
        const date = new Date();
        date.setMinutes(date.getMinutes() + 1);

        firebase.notifications().scheduleNotification(notification, {
            fireDate: date.getTime(),
        })

        // these days of the week are going to be mapped to correspond to each box and state
        const daysOfTheWeek = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
        return (
            // this is the main container
            <View style={styles.container}>
                <Text style={styles.headerText}> During the week I leave my house at </Text>

                {/* this the container holding the data that needs to be sent to the backend */}
                <View>
                    {this.state.sent ?
                        this.state.data.map((data, index) => {
                            return (
                                <View key={index}>
                                    <Image source={require("../assets/clouds.png")} />
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
                                        selectedValue={this.state[text]}
                                        onValueChange={(e) => this.inputText(e, text)}
                                        style={styles.boxes}
                                    >
                                        <Picker.Item label="Pick a time" value="" />
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
                    <TouchableOpacity
                        onPress={this.storeData}
                        style={styles.btnNext}
                    >
                        <Text style={{ color: "white" }}> Next </Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        overflow: "scroll",
        alignItems: "center",
        height: "100%",
        backgroundColor: '#01404D',
    },
    headerText: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        marginTop: 20,
    },
    defaultText: {
        color: "white",
        fontSize: 30,
    },
    btnNext: {
        backgroundColor: "#0D7100",
        width: "30%",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 20,
    },
    form: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    formText: {
        color: "white",
        fontSize: 25,
        width: "20%",
    },
    boxes: {
        backgroundColor: "white",
        width: "60%",
        marginLeft: 20,
        marginBottom: 10,
    },

});

export default Schedule;