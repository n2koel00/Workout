import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"stretch",
        padding: 10,
        paddingTop: Constants.statusBarHeight + 10
    },
    categories:{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    header:{
        textAlign: "center"
    },
    textInput:{
        margin:10
    },
    button:{
        margin: 10
    },
});
