import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import mandiData from '../assets/mandi.json'; // Adjust path as necessary

const RenderItem = React.memo(({ item }) => (
  <View style={styles.card}>
    <Text style={styles.cropName}>{item.commodity || 'Unknown Commodity'}</Text>
    <Text style={styles.priceDetail}>State: {item.state || 'Unknown'}</Text>
    <Text style={styles.priceDetail}>Min: ₹{item.min_price || 'N/A'}</Text>
    <Text style={styles.priceDetail}>Max: ₹{item.max_price || 'N/A'}</Text>
    <Text style={styles.priceDetail}>Modal: ₹{item.modal_price || 'N/A'}</Text>
  </View>
));

const MarketPrices = () => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    let filtered = prices;

    if (searchText.trim() !== '') {
      filtered = filtered.filter(price =>
        price.commodity?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedState !== '') {
      filtered = filtered.filter(price => price.state === selectedState);
    }

    setFilteredPrices(filtered);
  }, [searchText, selectedState, prices]);

  const loadMoreData = () => {
    if (!hasMore) return;

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const newPrices = mandiData.records.slice(start, end).filter(
      record => record.commodity && record.state
    );

    if (newPrices.length === 0) {
      setHasMore(false);
    } else {
      setPrices((prevPrices) => [...prevPrices, ...newPrices]);
      setPage((prevPage) => prevPage + 1);
    }

    setLoading(false);
  };

  const keyExtractor = (item, index) => item.arrival_date + index.toString();

  const uniqueStates = [...new Set(mandiData.records.map(record => record.state))];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market Prices</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by crop..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Picker
        selectedValue={selectedState}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedState(itemValue)}
      >
        <Picker.Item label="Select a state" value="" />
        {uniqueStates.map((state, index) => (
          <Picker.Item key={index} label={state} value={state} />
        ))}
      </Picker>
      {loading && filteredPrices.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredPrices}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={keyExtractor}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
        />
      )}
      {!loading && !hasMore && filteredPrices.length === 0 && (
        <Text style={styles.error}>No market prices available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2d3748',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  priceDetail: {
    fontSize: 16,
    color: '#666',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default MarketPrices;
