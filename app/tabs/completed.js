import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Text, Card, IconButton } from 'react-native-paper';

export default function CompletedScreen() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCompletedTasks = async () => {
        try {
          const storedTasks = await AsyncStorage.getItem('completed');
          const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
          setCompletedTasks(parsedTasks);
        } catch (e) {
          console.error('Failed to fetch completed tasks', e);
        }
      };

      fetchCompletedTasks();
    }, [])
  );

  const deleteTask = async (taskId) => {
    const updated = completedTasks.filter(task => task.id !== taskId);
    setCompletedTasks(updated);
    await AsyncStorage.setItem('completed', JSON.stringify(updated));
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.title}
        titleStyle={{ textDecorationLine: 'line-through' }}
        right={() => (
          <IconButton
            icon="delete"
            iconColor="red"
            onPress={() => deleteTask(item.id)}
          />
        )}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Completed Tasks
      </Text>

      <FlatList
        data={completedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text variant="bodyLarge" style={styles.empty}>
            No completed tasks yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    marginBottom: 16
  },
  card: {
    marginBottom: 10
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777'
  }
});
