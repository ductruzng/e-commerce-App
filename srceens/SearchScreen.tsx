import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ProductItem from '../components/ProductItem';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <View style={styles.searchInputContainer}>
        <TouchableOpacity onPress={() => handleSearch()}>
          <Ionicons name="search" size={24} color={'black'} />
        </TouchableOpacity>
        <TextInput
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
          placeholder="Search Amazon.in"
        />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {filteredProducts.map((item, index) => (
            <View style={{width:176,alignItems:'center'}}>
              <ProductItem item={item} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 8,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 38,
    borderBottomWidth: 1,
  },
  productItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});
