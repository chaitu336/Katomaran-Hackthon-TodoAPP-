import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AppInfoScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'About This App' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title"> Task Management App</ThemedText>
        <ThemedText style={styles.text}>
          This app helps you stay organized and manage your daily tasks efficiently.
        </ThemedText>
        <ThemedText style={styles.text}>
            Built with React Native + Expo Router
        </ThemedText>
        <ThemedText style={styles.text}>
            Developed by: Manojkumar G
        </ThemedText>
        <ThemedText style={styles.text}>
            Version: 1.0.0
        </ThemedText>

        <Link href="/" style={styles.link}>
          <ThemedText type="link">🔙 Back to Home</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20,
  },
  text: {
    fontSize: 16, textAlign: 'center', marginVertical: 6,
  },
  link: {
    marginTop: 20,
    paddingVertical: 15,
  },
});
