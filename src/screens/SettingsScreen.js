import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { List, Switch, Button, Divider, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  // Mock user for demo
  const user = {
    first_name: 'Demo',
    last_name: 'User',
    username: 'demouser',
    photo_url: null
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Language',
      'Select Language / भाषा चुनें',
      [
        {
          text: 'English',
          onPress: async () => {
            await AsyncStorage.setItem('language', 'en');
            Alert.alert('Language', 'Language changed to English');
          },
        },
        {
          text: 'हिंदी',
          onPress: async () => {
            await AsyncStorage.setItem('language', 'hi');
            Alert.alert('भाषा', 'भाषा हिंदी में बदल गई');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About',
      'Resume Craft Pro Mobile\nVersion 1.0.0\n\nA professional resume builder app that connects with your Telegram bot.',
      [{ text: 'OK' }]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear Data',
      'Are you sure you want to clear all app data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'App data cleared successfully');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Avatar.Text
          size={80}
          label="DU"
          style={styles.avatar}
        />
        <List.Item
          title={`${user.first_name} ${user.last_name}`.trim()}
          description={user.username ? `@${user.username}` : 'Demo User'}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />
      </View>

      <Divider />

      {/* App Settings */}
      <List.Section>
        <List.Subheader style={{ color: theme.colors.primary }}>
          App Settings
        </List.Subheader>
        
        <List.Item
          title="Dark Mode"
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              color={theme.colors.primary}
            />
          )}
        />
        
        <List.Item
          title="Language"
          description="English"
          left={(props) => <List.Icon {...props} icon="translate" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleLanguageChange}
        />

        <List.Item
          title="Notifications"
          left={(props) => <List.Icon {...props} icon="bell" />}
          right={() => (
            <Switch
              value={true}
              onValueChange={() => Alert.alert('Notifications', 'Notification settings updated')}
              color={theme.colors.primary}
            />
          )}
        />
      </List.Section>

      <Divider />

      {/* App Info */}
      <List.Section>
        <List.Subheader style={{ color: theme.colors.primary }}>
          Information
        </List.Subheader>
        
        <List.Item
          title="About"
          left={(props) => <List.Icon {...props} icon="information" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleAbout}
        />

        <List.Item
          title="Help & Support"
          left={(props) => <List.Icon {...props} icon="help-circle" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => Alert.alert('Help', 'Contact support at support@resumecraftpro.com')}
        />
      </List.Section>

      <Divider />

      {/* Data Management */}
      <View style={styles.dataSection}>
        <Button
          mode="outlined"
          onPress={handleClearData}
          icon="delete"
          textColor={theme.colors.error}
          style={styles.clearButton}
        >
          Clear App Data
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    marginBottom: 16,
  },
  dataSection: {
    padding: 20,
    marginTop: 20,
  },
  clearButton: {
    paddingVertical: 8,
  },
});
