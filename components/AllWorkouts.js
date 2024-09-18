import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from '../styles/Styles';

export default function AllWorkouts(){
    return(
        <SafeAreaView style={Styles.container}>
        <Text variant="headlineLarge" style={Styles.header}>All Workouts</Text>
        </SafeAreaView>
    );
}