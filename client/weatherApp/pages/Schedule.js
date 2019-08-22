import React from 'react';
import Signup from '../styles/Signup'
import { Text, View, TextInput, Button, Picker, TouchableOpacity } from 'react-native';

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

    //this helper function sends data to backend
    //the api should send back data in a array.
    sendData = () => {
        // fetch()
        // .then(result => {
        //     this.setState({sent: true, data: [...result]});
        // })

    }

    //this helper function changes corresponding inputtext values
    inputText = (time, text) => {
        this.setState({ [text]: time });
    }

    render() {
        const daysOfTheWeek = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
        return (
            // this is the main container
            <View style={Signup.container}>
                <Text style={Signup.headerText}> {this.state.sent ? "During the week I leave my house at" : "Heres how your week is looking like"} </Text>

                {/* this the container holding the data that needs to be sent to the backend */}
                <View>
                    }
                    {this.state.sent ? daysOfTheWeek.map((text, index) => {
                        return (
                            <View key={index} style={Signup.form}>
                                <Text style={Signup.formText}>{text}:</Text>
                                <Picker
                                    selectedValue={this.state[text]}
                                    onValueChange={(time) => this.inputText(time, text)}
                                    style={Signup.boxes}
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
                        //when the data is sent the component shows the weather for the day of the week 
                        : this.state.data.map(data => {
                            return (
                                <View>
                                </View>
                            )
                        })
                    }
                </View>
                {/* if the data is sent the button will disapear  */}
                {this.state.sent ? null :
                    <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={this.sendData}
                            style={Signup.btnNext}
                        >
                            <Text style={{ color: "white" }}> Next </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}

export default Schedule;