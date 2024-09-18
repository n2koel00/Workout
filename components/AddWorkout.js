import { Button, Text, TextInput, ToggleButton, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from '../styles/Styles';
import { useContext, useState } from "react";
import { View } from "react-native";
import WorkoutContext from "./WorkoutContext";


const categories = ["run-fast","ski","swim"]

export default function AddWorkouts(){

    const [category, setCategory] = useState(categories[0]);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const {workout, setWorkout} = useContext(WorkoutContext);
    const theme = useTheme();

    function addExercise(){
        const modified = [...workout, {category, distance, duration}];
        setWorkout(modified)
    }

    return(
        <SafeAreaView style={Styles.container}>
        <Text variant="headlineLarge" style={[Styles.header, {color: theme.colors.primary}]}>Add Workouts</Text>
        <CategorySelection value={category} setValue={setCategory} values={categories}/>
        <TextInput 
            placeholder={'0'}
            label={"Distance (km)"} 
            style={Styles.textInput} 
            keyboardType='numeric' 
            mode="flat" 
            value={distance} 
            onChangeText={setDistance}
        />
        <TextInput 
            placeholder={'0'}
            label={"Duration (min)"} 
            style={Styles.textInput} 
            keyboardType='numeric' 
            mode="flat" 
            value={duration} 
            onChangeText={setDuration}
        />
        <Button mode="contained" style={Styles.button}>Add Workout</Button>
        </SafeAreaView>
    );
}

function CategorySelection({value, setValue, values}){

    const theme = useTheme();

    return(
        <View style={Styles.categories}>
            <ToggleButton.Group value={value} onValueChange={setValue}>
                {values.map( v => 
                <ToggleButton 
                    key={v} 
                    value={v} 
                    icon={v} 
                    iconColor={v==value ? "black" : "white"} 
                    size={30} 
                    style={{backgroundColor: v == value ? theme.colors.primary : null}}
                /> )}
            </ToggleButton.Group>
        </View>
    )
}