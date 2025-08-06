import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TextInput, Button, Card, Chip } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState('Low');

  const navigation = useNavigation();

  const handleAddTask = async () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate: dueDate.toISOString(),
      priority,
      completed: false,
    };

    try {
      const existing = await AsyncStorage.getItem('tasks');
      const parsed = existing ? JSON.parse(existing) : [];
      const updatedTasks = [...parsed, newTask];

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

      setTitle('');
      setDescription('');
      setPriority('Low');
      setDueDate(new Date());

      navigation.goBack();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Card mode="outlined" style={styles.card}>
        <Card.Title title="Add New Task" />
        <Card.Content>
          <TextInput
            label="Title"
            value={title}
            mode="outlined"
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={description}
            mode="outlined"
            multiline
            numberOfLines={4}
            onChangeText={setDescription}
            style={styles.input}
          />
          <Text style={styles.label}>Due Date</Text>
          <Button
            mode="outlined"
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            {dueDate.toDateString()}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDueDate(selectedDate);
              }}
            />
          )}
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            {['Low', 'Medium', 'High'].map((level) => (
              <Chip
                key={level}
                mode="outlined"
                selected={priority === level}
                onPress={() => setPriority(level)}
                style={[
                  styles.chip,
                  priority === level && styles.selectedChip,
                ]}
                textStyle={priority === level && styles.selectedChipText}
              >
                {level}
              </Chip>
            ))}
          </View>
          <Button mode="contained" onPress={handleAddTask} style={styles.addButton}>
            Add Task
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    padding: 8,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  dateButton: {
    marginBottom: 16,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chip: {
    marginRight: 6,
  },
  selectedChip: {
    backgroundColor: '#007BFF',
  },
  selectedChipText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 10,
  },
});
