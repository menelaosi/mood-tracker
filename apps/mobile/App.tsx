import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import { store } from '@mood-tracker/store';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';

function Root() {
  const { isDark } = useTheme();
  return (
    <NavigationContainer>
      <AppNavigator />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Provider store={store}>
        <SafeAreaProvider>
          <ThemeProvider>
            <Root />
          </ThemeProvider>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
