import { Text, SafeAreaView, StyleSheet, Button, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useSetup } from '../contexts/SetupContext';

export default function SetupScreen() {
  // Destructure context functions
  const { setSelectedColor, setSelectedBibleVersion, setIsSetupComplete } = useSetup();

  // Local state for inputs
  const [colorInput, setColorInput] = useState('');
  const [versionInput, setVersionInput] = useState('');

  // Track submission state
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle reset
  const handleChange = () => {
    setColorInput(''); // Reset local color
    setVersionInput(''); // Reset local Bible version
    setIsSubmitted(false); // Allow new submission
  };

  // Handle form submission
  const handleSubmit = () => {
    if (colorInput && versionInput) {
      setSelectedColor(colorInput); // Update context
      setSelectedBibleVersion(versionInput); // Update context
      setIsSubmitted(true); // Update submission state for display and variable assignments
      setIsSetupComplete(true); // Used to update layout for 'practice' tab
    }
  };

  // Determine text color dynamically
  const getColorStyle = (color: string) => {
    switch (color) {
      case 'Blue':
        return { color: 'blue' };
      case 'Red':
        return { color: 'red' };
      case 'Green':
        return { color: 'green' };
      default:
        return { color: 'white' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isSubmitted && (
        <>
          <Text style={styles.title}>Select a color and Bible version to get started:</Text>

          <Text style={styles.text}>COLOR:</Text>
          <Picker
            selectedValue={colorInput}
            onValueChange={(itemValue) => setColorInput(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a color" value="" />
            {['Blue', 'Green', 'Red'].map((color) => (
              <Picker.Item key={color} label={color} value={color} />
            ))}
          </Picker>

          <Text style={styles.text}>VERSION:</Text>
          <Picker
            selectedValue={versionInput}
            onValueChange={(itemValue) => setVersionInput(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a version" value="" />
            {['KJV', 'CSB'].map((version) => (
              <Picker.Item key={version} label={version} value={version} />
            ))}
          </Picker>

          {colorInput && versionInput && (
            <Button title="Submit" onPress={handleSubmit} />
          )}
        </>
      )}

      {isSubmitted && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Selected color:</Text>
          <Text style={[styles.resultText, getColorStyle(colorInput)]}>
            {colorInput.charAt(0).toUpperCase() + colorInput.slice(1)}
          </Text>
          <Text style={styles.resultText}>Selected version:</Text>
          <Text style={[styles.resultText, { color: 'yellow' }]}>
            {versionInput.toUpperCase()}
          </Text>
          <Button title="Change Selection" onPress={handleChange} />
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 24,
    color: '#fff',
    fontSize: 20,
  },
  picker: {
    height: 50,
    width: 200,
    color: '#fff',
    backgroundColor: '#333',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
  },
});
