import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  // Static data (replace later with Supabase data)
  const completedTasks = 3;
  const pendingTasks = 5;
  const highPriority = 2;
  const mediumPriority = 1;
  const lowPriority = 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Overview</Text>

      <View style={styles.statCard}>
        <Text style={styles.label}>Completed Tasks:</Text>
        <Text style={styles.value}>{completedTasks}</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.label}>Pending Tasks:</Text>
        <Text style={styles.value}>{pendingTasks}</Text>
      </View>

      <Text style={[styles.title, { marginTop: 20 }]}>Priority Breakdown</Text>

      <View style={styles.statCard}>
        <Text style={styles.label}>High:</Text>
        <Text style={styles.value}>{highPriority}</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.label}>Medium:</Text>
        <Text style={styles.value}>{mediumPriority}</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.label}>Low:</Text>
        <Text style={styles.value}>{lowPriority}</Text>
      </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
