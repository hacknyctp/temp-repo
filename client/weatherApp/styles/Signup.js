import { StyleSheet } from 'react-native';

const Signup = StyleSheet.create({
    container: {
        maxHeight: "100%",
        width: "100%",
        overflow: "scroll"
    },
    headerText: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
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
    }
});


export default Signup;