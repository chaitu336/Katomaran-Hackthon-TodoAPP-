// File: app/tabs/_layout.js
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarShowLabel: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'index':
              iconName = 'check-circle';
              break;
            case 'add-task':
              iconName = 'add-circle-outline';
              break;
            case 'login':
              iconName = 'login';
              break;
            case 'complete-tasks':
              iconName = 'done-all';
              break;
            case 'explore':
              iconName = 'explore';
              break;
            default:
              iconName = 'error';
              break;
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    />
  );
}
