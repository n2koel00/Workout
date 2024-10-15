import { Button, Text, TextInput, ToggleButton, useTheme } from "react-native-paper";
import Styles from '../styles/Styles';
import { useContext, useState } from "react";
import { View, SafeAreaView, Alert } from "react-native";
import WorkoutContext from "./WorkoutContext";
import UnitContext from "./UnitContext";
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';

const categories = ["run-fast", "ski", "swim"]

export default function AddWorkouts() {
    const [category, setCategory] = useState(categories[0]);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const { workout, setWorkout } = useContext(WorkoutContext);
    const { unit } = useContext(UnitContext);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const theme = useTheme();

    function addExercise() {
        const distanceValue = parseFloat(distance);
        const durationValue = parseFloat(duration);

        if (isNaN(distanceValue) || isNaN(durationValue) || distanceValue < 0 || durationValue < 0) {
            Alert.alert("Invalid Input", "Distance and Duration must be positive numbers.", [{ text: "OK" }]);
            return;
        }
        
        const distanceInKm = unit === 'miles' ? distanceValue / 0.621371 : distanceValue;

        const newWorkout = {
            category,
            distance: distanceInKm.toString(),
            duration: durationValue.toString(),
            date: format(date, 'dd-MM-yyyy')
        };

        setWorkout(prevWorkouts => [newWorkout, ...prevWorkouts]);
        setDistance("");
        setDuration("");
        setDate(new Date());
        setShowCalendar(false);
    }

    return (
        <SafeAreaView style={Styles.container}>
            <Text variant="headlineLarge" style={[Styles.header, { color: theme.colors.primary }]}>Add Workouts</Text>
            
            <CategorySelection value={category} setValue={setCategory} values={categories} />
            
            <TextInput 
                placeholder={'0'}
                label={`Distance (${unit})`}
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

            <Button 
                mode="outlined" 
                style={Styles.button} 
                onPress={() => setShowCalendar(!showCalendar)}
            >
                {format(date, 'dd-MM-yyyy')}
            </Button>

            {showCalendar && (
                <View style={Styles.calendarContainer}>
                    <Calendar
                        onDayPress={(day) => {
                            setDate(new Date(day.timestamp));
                            setShowCalendar(false);
                        }}
                        markedDates={{
                            [format(date, 'dd-MM-yyyy')]: { selected: true, marked: true },
                        }}
                        style={Styles.calendar}
                    />
                </View>
            )}

            <Button mode="contained" style={Styles.button} onPress={addExercise}>Add Workout</Button>
        </SafeAreaView>
    );
}

function CategorySelection({ value, setValue, values }) {
    const theme = useTheme();
    return (
        <View style={Styles.categories}>
            <ToggleButton.Group value={value} onValueChange={setValue}>
                {values.map(v =>
                    <ToggleButton
                        key={v}
                        value={v}
                        icon={v}
                        iconColor={v == value ? "black" : "white"}
                        size={30}
                        style={{ backgroundColor: v == value ? theme.colors.primary : null }}
                    />
                )}
            </ToggleButton.Group>
        </View>
    );
}
