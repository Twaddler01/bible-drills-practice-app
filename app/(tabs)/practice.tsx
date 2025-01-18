import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSetup } from '../contexts/SetupContext'; // Adjust import path

export default function PracticeScreen() {
  const { selectedColor, selectedBibleVersion } = useSetup();
  const [showRadioTest, setShowRadioTest] = useState(false); // Toggle between screens

  const color = selectedColor.toLowerCase();
  const version = selectedBibleVersion.toLowerCase();

  if (showRadioTest) {
    return <RadioButtonExample onBack={() => setShowRadioTest(false)} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Practice screen</Text>
      <Text style={styles.text}>Color: {color}</Text>
      <Text style={styles.text}>Version: {version}</Text>
      <Text style={styles.text}>Practice Option: (choose)</Text>
      <Button title="Radio_Test" onPress={() => setShowRadioTest(true)} />
    </View>
  );
}

export function RadioButtonExample({ onBack }: { onBack: () => void }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Options for the radio buttons
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedOption) {
      alert('Please select an option before submitting.');
      return;
    }

    // Perform next action based on the selected option
    alert(`You selected: ${selectedOption}`);
    // Add your action logic here, e.g., navigation, API calls, etc.
  };

  return (
    <View style={styles2.container}>
      <Text style={styles2.title}>Choose an option:</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles2.radioButton,
            selectedOption === option && styles2.selectedRadioButton,
          ]}
          onPress={() => setSelectedOption(option)}
        >
          <View
            style={[
              styles2.radioCircle,
              selectedOption === option && styles2.selectedCircle,
            ]}
          />
          <Text style={styles2.radioText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Back" onPress={onBack} />
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25292e',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  selectedRadioButton: {
    backgroundColor: '#444',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    backgroundColor: '#fff',
  },
  radioText: {
    color: '#fff',
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
