import { Text, SafeAreaView, StyleSheet, Button, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function SetupScreen() {

	// State for selected values
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedBibleVersion, setSelectedBibleVersion] = useState('');

    // Options for the selects
    const colors = ['blue', 'green', 'red'];
    const bibleVersions = ['KJV', 'CSB'];

	// State to track whether the Submit button should be visible
    const [isSubmitted, setIsSubmitted] = useState(false);

	// Function to handle reset (change)
	const handleChange = () => {
		setSelectedColor(''); // Reset color
		setSelectedBibleVersion(''); // Reset Bible version
		setIsSubmitted(false); // Show submit button again
	};

	// Function to determine the color for the text based on the selected color
    const getColorStyle = (color: string) => {
        switch (color) {
            case 'blue':
                return { color: 'blue' };
            case 'red':
                return { color: 'red' };
            case 'green':
                return { color: 'green' };
            default:
                return { color: 'white' }; // Default color if no selection is made
        }
    };

	// Form submission
	const handleSubmit = () => {

		// Hide the button once submitted
		if (selectedColor && selectedBibleVersion) {
            setIsSubmitted(true);
        }

	    // Convert inputs to lowercase
	    const color = selectedColor.toLowerCase();
	    const version = selectedBibleVersion.toLowerCase();

	    // Call other functions
	    try {
	        //f_main(color, version); // Replace with actual function logic or ensure it's imported
	        //f_kp(color);            // Ensure this function exists
	        //f_booksOfTheBible();    // Ensure this function exists

	        console.log('Selected color:', color);
	        console.log('Selected Bible version:', version);

	        //alert(`You selected: ${color.toUpperCase()} and ${version.toUpperCase()}`);
	    } catch (error) {
	        console.error('Error processing submission:', error);
	    }
	};

    return (
        <SafeAreaView style={styles.container}>
			{!isSubmitted && (
            	<Text style={styles.title}>Select a color and Bible version to get started:</Text>
			)}

			{/* Display the Picker only if form is not submitted */}
			  {!isSubmitted && (
                 <>
	            {/* Picker for colors */}
	            <Text style={styles.text}>COLOR:</Text>
	            <Picker
	                selectedValue={selectedColor}
	                onValueChange={(itemValue) => setSelectedColor(itemValue)}
	                style={styles.picker}
	            >
	                <Picker.Item label="Select a color" value="" />
	                {colors.map((color) => (
	                    <Picker.Item
							key={color}
							label={color.charAt(0).toUpperCase() + color.slice(1)}
							value={color}
	                        enabled={!isSubmitted || selectedColor !== color} // Disable once submitted
						/>
	                ))}
	            </Picker>

	            {/* Picker for Bible versions */}
	            <Text style={styles.text}>VERSION:</Text>
	            <Picker
	                selectedValue={selectedBibleVersion}
	                onValueChange={(itemValue) => setSelectedBibleVersion(itemValue)}
	                style={styles.picker}
	            >
	                <Picker.Item label="Select a version" value="" />
	                {bibleVersions.map((version) => (
	                    <Picker.Item
							key={version}
							label={version}
							value={version}
							enabled={!isSubmitted || selectedBibleVersion !== version} // Disable once submitted
						/>
	                ))}
	            </Picker>

				{/* Submit button */}
				  {!isSubmitted && selectedColor && selectedBibleVersion && (
	            		<Button title="Submit" onPress={handleSubmit} />
				  )}
				</>
			  )}

			{/* Dynamically show selected values */}
			  {isSubmitted && (
	                <View style={styles.resultContainer}>
						<Text style={styles.resultText}>
							Selected color:
						</Text>
						<Text style={[styles.resultText, getColorStyle(selectedColor)]}>
	                        {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1) || 'None'}
	                    </Text>
	                    <Text style={styles.resultText}>
	                        Selected version:
	                    </Text>
						<Text style={[styles.resultText, { color: 'yellow' }]}>
						    {selectedBibleVersion || 'None'}
						</Text>
						<View style={{ marginBottom: 20 }} />
	                </View>
				)}

			{/* "Change" button to reset values */}
			  {isSubmitted && (
				  <View>
				  {/* Spacer */}
				  <Button title="Change Color/Version" onPress={handleChange} />
				  <Text style={styles.title}>Test</Text>
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
	   marginBottom: 10, // Adds spacing like an HTML paragraph
	   lineHeight: 24, // Adjusts line spacing
	   color: '#fff',
	   fontSize: 20,
    },
	picker: {
	  height: 50,
	  width: 200,
	  color: '#fff', // Add this to make text visible
	  backgroundColor: '#333', // Optional: better contrast
	},
	resultContainer: {
      marginTop: 20,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
     resultText: {
	   color: '#fff',
	   fontSize: 16,
	   marginHorizontal: 5, // Space between label and value
     },
});
