import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

class RainPreference extends React.Component {
    constructor() {
        super();
        this.state = {
            rainPercentage: "0",
        }
    }

    //function to save to aysncStorage and move to the next page
    storeData = async () => {
        try {
            await AsyncStorage.setItem('rainPercentage', this.state.rainPercentage);
            this.props.navigation.navigate("HumidityPreference");

        } catch (error) {
            console.log(`There was an error: ${error}`)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* This view container is the top portion with the image and text */}
                <View style={styles.flexRow}>
                    <Image
                        style={styles.image}
                        source={require("../assets/rainCloud.png")}
                    />
                    <Text style={styles.rainText}> Rain </Text>
                </View>
                {/* This is the bottom half view of this screen */}
                <View style={styles.flexRow}>
                    <Text style={styles.text}>When the rain percentage is greater
                    than this much, notify me to bring an umbrella </Text>
                    <View style={styles.textView}>
                        <TextInput
                            onChangeText={(event) => this.setState({ rainPercentage: event })}
                            value={this.state.rainPercentage}
                            style={styles.textBox}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                    </View>
                </View>

                {/* Using tochableOpacity rather than button for more styling freedom */}
                <TouchableOpacity
                    onPress={this.storeData}
                    style={styles.btnNext}
                >
                    <Text style={{ color: "white" }}> Next </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        backgroundColor: '#01404D',
        height: "100%"
    },
    image: {
        width: 100,
        height: 100,
        marginTop: "30%",
    },
    rainText: {
        color: "white",
        fontSize: 30,
        alignSelf: "center",
        marginLeft: "10%"
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
    },
    text: {
        color: "white",
        fontSize: 25,
        width: "55%",
    },
    textView: {
        justifyContent: "center",
    },
    textBox: {
        textAlign: "center",
        backgroundColor: "white",
        fontSize: 18,
        justifyContent: "center",
        marginLeft: "10%",
        maxWidth: "100%",
    },
    btnView: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    btnNext: {
        backgroundColor: "green",
        width: "30%",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 20,
    },


})

export default RainPreference;