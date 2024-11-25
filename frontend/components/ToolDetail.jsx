import React from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native';
import { useCart } from '../pages/CartContext'; // Adjust the import path as needed

export default function ToolDetail({ route }) {
  const { item } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const itemWithNumericPrice = {
      ...item,
      price: parseFloat(item.price.replace(',', '')), // Convert "5,000" to 5000
    };
    addToCart(itemWithNumericPrice);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <View style={styles.divider} />
      <Text style={styles.description}>
        {item.description}
      </Text>
      <View style={styles.divider} />
      <View style={styles.footer}>
        <Text style={styles.footerPrice}>₹{item.price}</Text>
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          color="#6200EE"
        />
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
    width: 200,
    height: 200,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
    color: '#2d3748',
  },
  price: {
    fontSize: 20,
    color: '#4caf50',
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'justify',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  footerPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
  },
});
