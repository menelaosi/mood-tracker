import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@mood-tracker/ui';
import { useTheme } from '../context/ThemeContext';
import { LogMoodScreen } from '../screens/LogMoodScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { HistoryScreen } from '../screens/HistoryScreen';

export type RootTabParamList = {
  Log: undefined;
  Dashboard: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<keyof RootTabParamList, [IoniconName, IoniconName]> = {
  Log: ['add-circle', 'add-circle-outline'],
  Dashboard: ['bar-chart', 'bar-chart-outline'],
  History: ['list', 'list-outline'],
};

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: spacing.md }}>
      <Text style={{ fontSize: 20 }}>{isDark ? '☀️' : '🌙'}</Text>
    </TouchableOpacity>
  );
}

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const [active, inactive] = TAB_ICONS[route.name];
        return {
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? active : inactive} size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textTertiary,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            paddingBottom: 4,
          },
          headerStyle: {
            backgroundColor: colors.surface,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontWeight: '700' as const },
          headerRight: () => <ThemeToggle />,
        };
      }}
    >
      <Tab.Screen
        name="Log"
        component={LogMoodScreen}
        options={{ title: 'Log Mood', headerTitle: 'How are you feeling?' }}
      />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
