import { Avatar, Card, Text, useTheme } from "react-native-paper";
import WorkoutContext from "./WorkoutContext";
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
    const theme = useTheme();

    
    const totals = calculateTotals(workout);

    return (
        <SafeAreaView style={Styles.container}>
            <Text variant="headlineLarge" style={[Styles.header, { color: theme.colors.primary }]}>All Workouts</Text>

            
            <View style={Styles.totalContainer}>
                {Object.keys(totals).map((category) => (
                    <View key={category} style={Styles.totalItem}>
                        <Avatar.Icon icon={category} size={40} />
                        <Text style={Styles.totalText}>{categoryLabels[category]}: {totals[category]} km</Text>
                    </View>
                ))}
            </View>

            
            <FlatList
                data={workout}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.date + ";" + item.category} 
            />
        </SafeAreaView>
    );
}


function calculateTotals(workout) {
    return workout.reduce((totals, item) => {
        const distance = parseFloat(item.distance) || 0; 
        if (!totals[item.category]) {
            totals[item.category] = 0; 
        }
        totals[item.category] += distance; 
        return totals;
    }, { "run-fast": 0, "ski": 0, "swim": 0 }); 
}

function Item({ item }) {
    const categoryLabel = categoryLabels[item.category] || "Unknown";

    return (
        <Card style={Styles.card}>
            <Card.Title
                titleVariant="headlineMedium"
                
                title={`${categoryLabel} (${item.date})`}
                left={(props) => <Avatar.Icon {...props} icon={item.category} size={40} />}
            />
            <Card.Content>
               
                <Text>Distance: {item.distance} km | Duration: {item.duration} min</Text>
            </Card.Content>
        </Card>
    );
}
