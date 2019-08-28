import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';




class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            date: "Jun 12, 2019",
            temp: "",
            humidity: "",
            weatherDescription: "", //this is going to hold the current forcast
            weatherImage: "Cloudy-white.png",
        }
    }

    // componentWillMount() {
    //     //the method will get the needed data for the weather on the dashboard and set states
    //     this.getWeatherData();
    //     //gets current date
    //     this.setState({ date: Date.now() })
    //     //depending on the weather we need to determine a image that corresponds
    //     const { weatherDescription } = this.state;
    //     if (weatherDescription.includes("cloudy")) {
    //         this.setState({ weatherImage: "Cloudy-white.png" })
    //     } else if (weatherDescription.includes('rain')) {
    //         this.setState({ weatherImage: "Rain-white.png" })
    //     } else if (weatherDescription.includes('sun') || weatherDescription.includes("sunny")) {
    //         this.setState({ weatherImage: "Sun-white.png" })
    //     } else if (weatherDescription.includes('snow')) {
    //         this.setState({ weatherImage: "Snowflake-white.png" })
    //     } //else if (weatherDescription.includes("storm")){
    //     //     this.setState({weatherImage:"Cloudy-white.png"})
    //     // }
    //     else {
    //         console.log(`We don't have the image for ${weatherDescription}`)
    //     }
    // }


    getWeatherData = async () => {
        try {
            fetch("localhost:5000/api/users/weather/", {
                method: "GET",
                headers: {
                    'x-auth-token': await AsyncStorage.getItem('jwt'),
                    'Content-Type': 'application/json'
                }
            }).then(result => {
                this.setState({
                    weatherDescription: result.weatherDesc,
                    temp: result.temp,
                    humidity: result.humidity
                })
            }).catch(error => {
                console.log("there was an error");
            })
        } catch (error) {
            console.log("There was an error");
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.dashDate}>{this.state.date}</Text>
                <Text style={styles.dashTitle}>{this.state.weatherDescription}</Text>
                <View style={{ width: "100%", height: "50%", justifyContent: "center", alignItems: "center" }}>
                    <Image source={require('../assets/Clouds-white.png')} />
                </View>
                <View style={styles.weatherInformation}>
                    <Text style={styles.weatherData}>{this.state.temp}</Text>
                    <Text style={styles.weatherData}>{this.state.humidity}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: '#01404D',
        fontWeight: 'bold',
    },
    dashTitle: {
        color: "white",
        fontSize: 18,
        textAlign: "center"
    },
    dashDate: {
        marginTop: "10%",
        color: "white",
        fontSize: 15,
        textAlign: "center"
    },
    weatherInformation: {
        flex: 1,
        flexDirection: "row",
    },
    weatherData: {
        color: "#fff",
    }

})

export default Dashboard;