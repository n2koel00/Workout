import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomNavigation, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import Styles from './styles/Styles';
import WorkoutContext from './components/WorkoutContext';
import AllWorkouts from './components/AllWorkouts';
import Settings from './components/Settings';
import AddWorkout from './components/AddWorkout'

const routes = [
  {key: "addworkouts", title: "Add Workout", focusedIcon: "weight-lifter"},
  {key: "allworkouts", title: "All Workouts", focusedIcon: "run-fast"},
  {key: "allsettings", title: "Settings", focusedIcon: "cog-outline"},



]

export default function App() {

  const [workout, setWorkout] = useState([]);
  const [navindex, setNavindex] = useState(0);

  const renderScene = BottomNavigation.SceneMap({
    addworkouts: AddWorkout,
    allworkouts: AllWorkouts,
    allsettings: Settings,


  });

  return (
  <PaperProvider theme={MD3DarkTheme}>
    <WorkoutContext.Provider value={{workout, setWorkout}}>
      <BottomNavigation 
        navigationState={{index: navindex, routes}}
        onIndexChange={setNavindex}
        renderScene={renderScene}
        />

    </WorkoutContext.Provider>
  </PaperProvider>
  );
}

