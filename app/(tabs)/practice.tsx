import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSetup } from '../contexts/SetupContext'; // Adjust import path
import { CountdownTimer } from '../components/CountdownTimer'; // Import your CountdownTimer component
import bibleVerses from '../data/bibleVerses.json'; // Import the JSON file

export default function PracticeScreen() {
  const { selectedColor, selectedBibleVersion } = useSetup();
  const [countdown, setCountdown] = useState(10); // 10-second countdown

  const color = selectedColor.toLowerCase();
  const version = selectedBibleVersion.toLowerCase();
  const [ptype, setPtype] = useState('(choose below)'); // Add state for ptype

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  return (
    <View style={styles.container}>
      {/* Countdown Timer */}
      <CountdownTimer initialTime={10} />
      <Text style={styles.title}>Bible Drill Practice</Text>
      <Text style={styles.text}>Color: {color}</Text>
      <Text style={styles.text}>Version: {version}</Text>
      <Text style={styles.text}>Practice Option: {ptype}</Text>
      <RadioButtonExample
        color={color}
        version={version}
        onBack={() => {}}
        updatePtype={setPtype} // Pass setPtype to update ptype
        />
    </View>
  );
}

export function RadioButtonExample({ color, version, onBack, updatePtype }: {
    color: string;
    version: string;
    onBack: () => void;
    updatePtype: (ptype: string) => void
  }) {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const options = ['Completion Call', 'Quotation Call', 'Key Passages', 'Book Call'];

  // Filter the verses data based on the selected color and version
  const filteredVerses = bibleVerses.filter(
    (verse) => verse.color.toLowerCase() === color && verse.vers.toLowerCase() === version
  );

  // Handle the display of the verses
  const handleCompletion = () => {
    return filteredVerses.map((verse, index) => (
      <View key={index}>
        <Text style={[styles.verseText, { textDecorationLine: 'underline' }]}>{verse.verse_ul}</Text>
        <Text style={styles.verseText}>{verse.verse}</Text>
        <Text style={styles.verseRef}>{`(${verse.ref})`}</Text>
      </View>
    ));
   };

  const handleQuotation = () => 'Quotation Call Action';
  const handleKeyPassages = () => 'Key Passages Action';
  const handleBookCall = () => 'Book Call Action';

  const handleSubmit = () => {
    if (!selectedOption) {
      alert('Please select an option before submitting.');
      return;
    }
    setIsOptionSelected(true);
    updatePtype(selectedOption); // Update ptype when option is selected
  };

  const renderOptionContent = () => {
    switch (selectedOption) {
      case 'Completion Call':
        return handleCompletion();
      case 'Quotation Call':
        return handleQuotation();
      case 'Key Passages':
        return handleKeyPassages();
      case 'Book Call':
        return handleBookCall();
      default:
        return 'Unknown Option';
    }
  };

  const handleBack = () => {
    setIsOptionSelected(false);
    setSelectedOption(null);
    updatePtype('(choose below)'); // Reset ptype when going back
  };

  return (
    <View style={styles.container}>
      {/* Dynamic Content Below */}
      {!isOptionSelected ? (
        <View>
          <Text style={styles.title}>Choose an option:</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.radioButton,
                selectedOption === option && styles.selectedRadioButton,
              ]}
              onPress={() => setSelectedOption(option)}
            >
              <View
                style={[
                  styles.radioCircle,
                  selectedOption === option && styles.selectedCircle,
                ]}
              />
              <Text style={styles.radioText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>{selectedOption}</Text>
          {/* Render the verses with ScrollView only for Completion Call */}
          <ScrollView style={styles.scrollContainer}>
            {selectedOption === 'Completion Call' && handleCompletion()}
          </ScrollView>
          <Button title="Back" onPress={handleBack} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
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
