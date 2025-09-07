import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SavedResumesScreen() {
  const { theme } = useTheme();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demo
    setTimeout(() => {
      setResumes([
        {
          id: '1',
          title: 'Software Developer Resume',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          template: 'Professional'
        },
        {
          id: '2',
          title: 'Marketing Manager Resume',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          template: 'Modern'
        },
        {
          id: '3',
          title: 'Data Analyst Resume',
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          template: 'Creative'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDownload = (resume) => {
    Alert.alert('Download', `Downloading ${resume.title}...`);
  };

  const handleShare = (resume) => {
    Alert.alert('Share', `Sharing ${resume.title}...`);
  };

  const handleDelete = (resume) => {
    Alert.alert(
      'Delete Resume',
      `Are you sure you want to delete "${resume.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setResumes(prev => prev.filter(r => r.id !== resume.id));
          },
        },
      ]
    );
  };

  const renderResumeItem = ({ item }) => (
    <Card style={styles.resumeCard}>
      <Card.Content>
        <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
          {item.title}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          Created: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          Template: {item.template}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="outlined"
          onPress={() => handleDownload(item)}
          icon="download"
          compact
        >
          Download
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleShare(item)}
          icon="share"
          compact
        >
          Share
        </Button>
        <Button
          mode="text"
          onPress={() => handleDelete(item)}
          icon="delete"
          compact
          textColor={theme.colors.error}
        >
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.onBackground, marginTop: 16 }}>
          Loading resumes...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {resumes.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="document-text-outline" size={64} color={theme.colors.onSurfaceVariant} />
          <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginTop: 16 }}>
            No resumes found
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>
            Start chatting to create your first resume
          </Text>
        </View>
      ) : (
        <FlatList
          data={resumes}
          renderItem={renderResumeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  resumeCard: {
    marginBottom: 12,
  },
});
