import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TextInput, Button, Card, IconButton } from 'react-native-paper';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = async () => {
    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title: task.trim(),
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    setTask('');
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const markTaskAsCompleted = async (taskId) => {
    try {
      const completedTask = tasks.find((task) => task.id === taskId);
      if (!completedTask) return;

      const taskWithCompleted = { ...completedTask, completed: true };
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);

      const storedCompleted = await AsyncStorage.getItem('completed');
      const completedTasks = storedCompleted ? JSON.parse(storedCompleted) : [];
      const newCompletedList = [...completedTasks, taskWithCompleted];
      await AsyncStorage.setItem('completed', JSON.stringify(newCompletedList));
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.heading}>
        My Tasks
      </Text>

      <TextInput
        mode="outlined"
        label="Enter Task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />

      <Button mode="contained" onPress={addTask} style={styles.addButton}>
        Add Task
      </Button>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.title} />
            <Card.Actions>
              <IconButton
                icon="check-circle-outline"
                iconColor="green"
                onPress={() => markTaskAsCompleted(item.id)}
              />
              <IconButton
                icon="delete"
                iconColor="red"
                onPress={() => deleteTask(item.id)}
              />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    marginBottom: 12,
  },
  input: {
    marginBottom: 12,
  },
  addButton: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
});
