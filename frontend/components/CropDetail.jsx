import React from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCart } from '../pages/CartContext'; // Adjust the import path as needed

export default function CropDetail({ route }) {
  const { item, modalPrice } = route.params; // Destructure modalPrice from route.params
  const { addToCart } = useCart();

  // Retrieve crop details from cropsData
  const details = {
    description: item.description,
    weather: item.weather,
    season: item.season,
    temperature: item.temperature,
  };

  const handleAddToCart = () => {
    const itemWithPrice = { ...item, price: modalPrice }; // Assign modalPrice to price
    console.log('Adding to Cart:', itemWithPrice); // Debugging line
    addToCart(itemWithPrice);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>
        Modal Price: ₹{modalPrice ? modalPrice : 'Not available'}
      </Text>

      <View style={styles.separator} />
      <Text style={styles.description}>{details.description}</Text>

      <View style={styles.separator} />

      <View>
        <Text style={styles.sectionTitle}>Crop Details:</Text>
        <View style={styles.detailRow}>
          <Icon name="weather-sunny" size={24} color="#555" />
          <Text style={styles.detail}>Weather: {details.weather}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar" size={24} color="#555" />
          <Text style={styles.detail}>Season: {details.season}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="thermometer" size={24} color="#555" />
          <Text style={styles.detail}>Temperature: {details.temperature}</Text>
        </View>
      </View>

      <View style={styles.separator} />
      
      {/* Adjusted the style of the button container to ensure visibility */}
      <View style={styles.buttonContainer}>
        <Button title="Add to Cart" onPress={handleAddToCart} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#38a169',
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 12,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginLeft: 8,
    color: '#555',
  },
  
  // Added style for button container
  buttonContainer: {
    marginTop: 16, // Ensure space between content and button
    marginBottom: 16, // Ensure space at the bottom
    paddingHorizontal: 20, // Optional, to make the button not touch the edges
  },
});
