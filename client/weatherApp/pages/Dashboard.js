import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';



class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            date: "Jun 12, 2019",
            time: "",
            timeOfDay: "Good Morning",
            username: "John",
            data: {},
            weekForcast: ["cloudy"]
        }
    }

    componentWillMount() {
        /**
         * TODO:
         * In here we will call the api to set up the data
         * We will configure the time (Good morning, good afternoon, etc)
         * Need to map through days[Array of objects] and get the the days[i].icon to determine image
         */
    }
    render() {
        const daysOfTheWeek = ["Mon", "Tue", "Wes", "Thu", " Fri", "Sat", "Sun"]
        return (
            <View style={styles.container}>
                <View style={styles.dashHeader}>
                    <Text style={styles.greetingText}>{this.state.timeOfDay}</Text>
                    <Text style={styles.greetingText}>{this.state.username}</Text>
                </View>
                <View style={styles.midSection}>
                    <Text style={styles.dashTitle}> 5 Day </Text>
                    <Text style={styles.dashTitle}> Forcast </Text>
                    <Text style={styles.dashDate}> {this.state.date} </Text>
                </View>
                <View style={styles.weatherContainer}>
                    <View style={styles.daysOfTheWeek}>
                        {daysOfTheWeek.map((day, index) => {
                            return (
                                <Text style={styles.day} key={index}>{day}</Text>
                            )
                        })}
                    </View>
                    <View style={styles.weatherInformation}>
                        {this.state.weekForcast.map((day, index) => {

                            if (day === "cloudy") return <Image key={index} style={{ width: "10%", height: "auto" }} source={require('../assets/clouds.png')} />

                        })}
                    </View>
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
    dashHeader: {
        marginTop: "10%"
    },
    greetingText: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
    },
    midSection: {
        marginTop: "10%",
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
    weatherContainer: {

    },
    daysOfTheWeek: {
        flex: 1,
        flexDirection: "row"
    },
    day: {
        color: "#fff",
        margin: 10,
    },
    weatherInformation: {
        flex: 1,
        flexDirection: "row",
    }

})

export default Dashboard;