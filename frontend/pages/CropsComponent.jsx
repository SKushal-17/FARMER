import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { createStackNavigator } from '@react-navigation/stack';
import CropDetail from '../components/CropDetail'; // Adjust the import path as needed
import MarketPrices from '../pages/MarketPrices'; // Import the MarketPrices component
import mandiData from '../assets/mandi.json'; // Importing mandi prices data

const cropsData = 
[
  {
    "id": "14",
    "name": "Soyabean",
    "image": require("../assets/soyabean.png"),
    "description": "The soybean, soy bean, or soya bean is a species of legume native to East Asia, widely grown for its edible bean, which has numerous uses. It requires a temperature between 20-40°C and thrives in regions with plenty of sunlight. Ideal growing season is during summer and early fall.",
    "weather": "Warm",
    "season": "Early Fall",
    "temperature": "20-40°C"
  },
  {
    "id": "15",
    "name": "Groundnut",
    "image": require("../assets/groundnut.png"),
    "description": "The peanut, also known as the groundnut, goober, goober pea, Pindar or monkey nut, is a legume crop grown mainly for its edible seeds. It is widely grown in the tropics and subtropics by small and large commercial producers, both as grain legume and as an oil crop. It requires a temperature of 30°C and thrives in regions with plenty of sunlight. Ideal growing season is during summer and early fall.",
    "weather": "Warm",
    "season": "Early Fall",
    "temperature": "30°C"
  },
  {
    "id": "16",
    "name": "Brinjal",
    "image": require("../assets/brinjal.png"),
    "description": "Eggplant, aubergine, brinjal, or Baigan is a plant species in the nightshade family Solanaceae. Solanum melongena is grown worldwide for its edible fruit. Most commonly purple, the spongy, absorbent fruit is used in several cuisines. Typically used as a vegetable in cooking, it is a berry by botanical definition. It requires a temperature between 13-21°C and thrives in regions with plenty of sunlight. Ideal growing season is normal warm weather.",
    "weather": "Warm",
    "season": "Early Fall",
    "temperature": "13-21°C"
  },
  {
    "id": "17",
    "name": "Capsicum",
    "image": require("../assets/capsicum.png"),
    "description": "Capsicum is a genus of flowering plants in the nightshade family Solanaceae, native to the Americas, cultivated worldwide for their edible fruit, which are generally known as \"peppers\" or \"capsicum\". Chili peppers grow on five species of Capsicum. It requires a temperature between 14-20°C and thrives in regions with plenty of sunlight. Ideal growing season is during summer and early fall.",
    "weather": "Warm",
    "season": "Early Fall",
    "temperature": "14-20°C"
  },
  {
    "id": "18",
    "name": "Apple",
    "image": require("../assets/apple.png"),
    "description": "An apple is a round, edible fruit produced by an apple tree. Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. It requires a temperature between 32-34°C and thrives in regions with plenty of sunlight. Ideal growing season is during summer and early fall.",
    "weather": "Sunny",
    "season": "Early Fall",
    "temperature": "32-34°C"
  },
  {
    "id": "19",
    "name": "Potato",
    "image": require("../assets/potato.png"),
    "description": "The potato is a starchy tuberous vegetable native to the Americas that is consumed as a staple food in many parts of the world. Potatoes are underground tubers of the plant Solanum tuberosum, a perennial in the nightshade family Solanaceae. It requires a temperature of 24°C and thrives in regions with plenty of sunlight. Ideal growing season is during summer and early fall.",
    "weather": "Warm",
    "season": "Early Fall",
    "temperature": "24°C"
  },
  {
    "id": "20",
    "name": "Maize",
    "image": require("../assets/maize.png"),
    "description": "Maize, also known as corn in North American English, is a tall stout grass that produces cereal grain. It was domesticated by indigenous peoples in southern Mexico about 9,000 years ago from wild teosinte. Native Americans planted it alongside beans and squashes in the Three Sisters polyculture. It requires a temperature between 18-27°C and thrives in regions with plenty of sunlight. Ideal growing season is during summer and early fall.",
    "weather": "Warm",
    "season": "Early Fall",
    "temperature": "18-27°C"
  },
  {
    "id": "21",
    "name": "Cotton",
    "image": require("../assets/cotton.png"),
    "description": "Cotton is a soft, fluffy staple fibre that grows in a boll or protective case, around the seeds of the cotton plants. The fibre is almost pure cellulose and can contain minor percentages of waxes, fats and water. It requires a temperature between 21-37°C and thrives in regions with plenty of sunlight. Ideal growing season is during summer and early fall.",
    "weather": "Warm",
    "season": "Early Fall",
    "temperature": "21-37°C"
  },
  {
    "id": "22",
    "name": "Tomato",
    "image": require("../assets/tomato.png"),
    "description": "The tomato, Solanum Lycopersicon, is a plant whose fruit is an edible berry that is eaten as a vegetable. The tomato is a member of the nightshade family that includes tobacco, potato, and chili peppers. It originated from and was domesticated in western South America. It requires a temperature between 21-24°C and thrives in regions with plenty of sunlight. Ideal growing season is during summer and early fall.",
    "weather": "Warm",
    "season": "Early Fall",
    "temperature": "21-24°C"
  },
  {
    "id": "23",
    "name": "Onion",
    "image": require("../assets/onion.png"),
    "description": "An onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. The shallot is a botanical variety of the onion which was classified as a separate species until 2011. The onion's close relatives include garlic, scallion, leek, and chives. It requires a temperature between 30-35°C and thrives in regions with plenty of sunlight. Ideal growing season is during summer and early fall.",
    "weather": "Warm",
    "season": "Early Fall",
    "temperature": "30-35°C"
  },
  {
    "id": "24",
    "name": "Green Chilli",
    "image": require("../assets/greenchili.png"),
    "description": "Chili peppers, also spelled Chile or chilli, are varieties of berry-fruit plants from the genus Capsicum, which are members of the nightshade family Solanaceae, cultivated for their pungency. Chili peppers are widely used in many cuisines as a spice to add \"heat\" to dishes. It requires a temperature between 20-35°C and thrives in regions with plenty of sunlight. Ideal growing season is during summer and early fall.",
    "weather": "Warm",
    "season": "Early Fall",
    "temperature": "20-35°C"
  }
]


;

const Stack = createStackNavigator();

function CropsGrid({ navigation }) {
  const getModalPrice = (cropName) => {
    const crop = mandiData.records.find(
      (item) => item.commodity?.toLowerCase() === cropName.toLowerCase()
    );
    return crop ? crop.modal_price : 'N/A';
  };

  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={150} // Adjusted item dimension for better fit
        data={cropsData}
        style={{ marginTop: 10, flex: 1 }}
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CropDetail', {
                item,
                modalPrice: getModalPrice(item.name),
              })
            }
          >
            <View style={styles.cropItemContainer}>
              <Image source={item.image} style={styles.cropImage} />
              <Text style={styles.cropName}>{item.name}</Text>
              <Text style={styles.modalPrice}>
                Price: ₹{getModalPrice(item.name)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('MarketPrices')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Show Mandi Prices</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CropsComponent() {
  return (
    <Stack.Navigator initialRouteName="CropsGrid">
      <Stack.Screen
        name="CropsGrid"
        component={CropsGrid}
        options={{ title: 'Crops for Sale' }}
      />
      <Stack.Screen
        name="CropDetail"
        component={CropDetail}
        options={{ title: 'Crop Details' }}
      />
      <Stack.Screen
        name="MarketPrices"
        component={MarketPrices}
        options={{ title: 'Mandi Prices' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  cropItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    height: 150,
    backgroundColor: '#e2e8f0',
  },
  cropImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  modalPrice: {
    fontSize: 16,
    color: '#38a169',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
