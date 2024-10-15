import { Card, RadioButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import Styles from '../styles/Styles';
import { useContext } from 'react';
import UnitContext from './UnitContext';

export default function Settings() {
    const { unit, setUnit } = useContext(UnitContext);
    const theme = useTheme();
    const handleUnitChange = (newUnit) => {
        setUnit(newUnit);
    };

    return (
        <SafeAreaView style={Styles.container}>
            <Text variant="headlineLarge" style={[Styles.header, { color: theme.colors.primary }]}>Settings</Text>
            <Card style={Styles.card}>
                <Card.Title title="Units" titleVariant="titleLarge" />
                <Card.Content>
                    <RadioButton.Group onValueChange={handleUnitChange} value={unit}>
                        <View style={Styles.radioItem}>
                            <RadioButton value="km" />
                            <Text style={Styles.radioText}>Kilometers</Text>
                        </View>
                        <View style={Styles.radioItem}>
                            <RadioButton value="miles" />
                            <Text style={Styles.radioText}>Miles</Text>
                        </View>
                    </RadioButton.Group>
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
}