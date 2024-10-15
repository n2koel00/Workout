import { Avatar, Card, Text, useTheme } from "react-native-paper";
import WorkoutContext from "./WorkoutContext";
import UnitContext from "./UnitContext";
import Styles from '../styles/Styles';
import { useContext } from "react";
import { FlatList, SafeAreaView, View } from "react-native";

const categoryLabels = {
    "run-fast": "Run",
    "ski": "Ski",
    "swim": "Swim"
};

export default function AllWorkouts() {
    const { workout } = useContext(WorkoutContext);
    const { unit } = useContext(UnitContext);
    const theme = useTheme();
    const totals = calculateTotals(workout, unit);

    return (
        <SafeAreaView style={Styles.container}>
            <Text variant="headlineLarge" style={[Styles.header, { color: theme.colors.primary }]}>All Workouts</Text>

            <View style={Styles.totalContainer}>
                {Object.keys(totals).map((category) => (
                    <View key={category} style={Styles.totalItem}>
                        <Avatar.Icon icon={category} size={40} />
                        <Text style={Styles.totalText}>{categoryLabels[category]}: {convertToUnit(totals[category], unit)} {unit}</Text>
                    </View>
                ))}
            </View>

            <FlatList
                data={workout}
                renderItem={({ item }) => <Item item={item} unit={unit} />}
                keyExtractor={(item, index) => item.date + ";" + item.category + ";" + index}
            />
        </SafeAreaView>
    );
}

function convertToUnit(distance, unit) {
    const distanceInNumber = parseFloat(distance);
    if (isNaN(distanceInNumber)) {
        return "0.00";
    }
    return unit === 'miles' ? (distanceInNumber * 0.621371).toFixed(2) : distanceInNumber.toFixed(2);
}



function Item({ item, unit }) {
    const theme = useTheme();
    const distance = convertToUnit(item.distance, unit);
    return (
        <Card style={Styles.card}>
            <Card.Title
                titleVariant="titleLarge"
                title={`${categoryLabels[item.category]} (${item.date})`}
                subtitle={`Distance: ${distance} ${unit}, Duration: ${item.duration} mins, Date: ${item.date}`}
                left={(props) => <Avatar.Icon {...props} icon={item.category} />}
            />
        </Card>
    );
}

function calculateTotals(workout, unit) {
    const totals = {};
    workout.forEach(item => {
        if (!totals[item.category]) totals[item.category] = 0;
        totals[item.category] += parseFloat(item.distance);
    });
    for (let category in totals) {
        totals[category] = convertToUnit(totals[category], unit);
    }
    return totals;
}

