import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, Chip } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState('');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  const saveTask = async () => {
    if (!title.trim()) {
      Alert.alert('Title is required');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.toISOString().split('T')[0],
      priority,
      completed: false,
    };

    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = [...tasks, newTask];
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

      Alert.alert('Success', 'Task added successfully');
      navigation.navigate('index');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Add New Task</Text>

      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        style={styles.input}
        multiline
      />

      <Button
        mode="outlined"
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        Select Due Date: {dueDate.toISOString().split('T')[0]}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Select Priority</Text>
      <View style={styles.priorityRow}>
        {['Low', 'Medium', 'High'].map((level) => (
          <Chip
            key={level}
            selected={priority === level}
            onPress={() => setPriority(level)}
            style={styles.chip}
          >
            {level}
          </Chip>
        ))}
      </View>

      <Button mode="contained" onPress={saveTask} style={{ marginTop: 20 }}>
        Save Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 12,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chip: {
    marginHorizontal: 5,
  },
});
