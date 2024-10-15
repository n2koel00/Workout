import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        padding: 10,
        paddingTop: Constants.statusBarHeight + 10,
    },
    categories: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    header: {
        textAlign: "center",
        marginBottom: 10,
    },
    textInput: {
        margin: 10,
    },
    button: {
        margin: 10,
    },
    card: {
        borderWidth: 1,
        margin: 10,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    totalItem: {
        alignItems: 'center',
    },
    totalText: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    radioText: {
        marginLeft: 10,
        fontSize: 16,
    },
    calendarContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        borderColor: '#444',
        backgroundColor: '#121212',
    },
    calendar: {
        marginBottom: 20,
    },
    
      
});