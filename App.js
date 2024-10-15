import { useState } from 'react';
import { BottomNavigation, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { registerTranslation } from 'react-native-paper-dates';
import { en } from 'date-fns/locale';
import WorkoutContext from './components/WorkoutContext';
import UnitContext from './components/UnitContext';
import AllWorkouts from './components/AllWorkouts';
import Settings from './components/Settings';
import AddWorkout from './components/AddWorkout';
import { format } from 'date-fns';

const routes = [
  { key: "addworkouts", title: "Add Workout", focusedIcon: "weight-lifter" },
  { key: "allworkouts", title: "All Workouts", focusedIcon: "run-fast" },
  { key: "allsettings", title: "Settings", focusedIcon: "cog-outline" },
];

registerTranslation('en', en);

export default function App() {
  
  const initialWorkouts = [
    { category: "run-fast", distance: "5", duration: "12:49", date: format(new Date(), 'dd-MM-yyyy') },
    { category: "ski", distance: "10", duration: "60", date: format(new Date(), 'dd-MM-yyyy') },
    { category: "swim", distance: "2", duration: "45", date: format(new Date(), 'dd-MM-yyyy') },
  ];

  const [workout, setWorkout] = useState(initialWorkouts);
  const [navindex, setNavindex] = useState(0);
  const [unit, setUnit] = useState('km');

  const renderScene = BottomNavigation.SceneMap({
    addworkouts: AddWorkout,
    allworkouts: AllWorkouts,
    allsettings: Settings,
  });

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <WorkoutContext.Provider value={{ workout, setWorkout }}>
        <UnitContext.Provider value={{ unit, setUnit }}> 
          <BottomNavigation
            navigationState={{ index: navindex, routes }}
            onIndexChange={setNavindex}
            renderScene={renderScene}
          />
        </UnitContext.Provider>
      </WorkoutContext.Provider>
    </PaperProvider>
  );
}
