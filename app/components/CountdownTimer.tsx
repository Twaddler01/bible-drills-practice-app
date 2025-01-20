import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export function CountdownTimer({ initialTime = 10 }: { initialTime?: number }) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const handleReset = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>Time Remaining: {time}s</Text>
      <View style={styles.buttonGroup}>
        <Button
          title={isRunning ? 'Pause' : 'Start'}
          onPress={() => setIsRunning((prev) => !prev)}
        />
        <Button title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
}

export default CountdownTimer;

const styles = StyleSheet.create({
  timerContainer: {
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
});
