import React from 'react';
import Signup from '../styles/Signup';
import { View, Text, TextInput } from 'react-native';

class RainPreference extends React.Component {
    constructor() {
        super();
        this.state = {
            rainPercentage: "0",
            rainSent: false,
        }
    }
    render() {
        return (
            <View>
                {/* This view container is the top portion with the image and text */}
                <View>

                </View>
                <Text>When the rain percentage is greater
                    than > </Text>
                <TextInput
                    onChangeText={(event) => this.setState({ rainPercentage: event })}
                    value={this.state.rainPercentage}
                    style={Signup.boxes}
                    keyboardType="numeric"
                /><Text>  percent, notify me to bring an umbrella</Text>
            </View>
        )
    }
}

export default RainPreference;