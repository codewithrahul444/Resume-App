import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SplashScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Ionicons 
        name="document-text" 
        size={120} 
        color={theme.colors.primary} 
        style={styles.logo}
      />
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
        Resume Craft Pro
      </Text>
      <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onBackground }]}>
        Professional Resume Builder
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
});
