import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
      setRepositories(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRepositoryPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.theme}>BUSCAR REPOSITÓRIO</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite um termo de pesquisa"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="Buscar" onPress={handleSearch} />
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRepositoryPress(item.html_url)}>
            <View style={styles.repositoryContainer}>
              <Text style={styles.repositoryName}>{item.full_name}</Text>
              <Text style={styles.repositoryDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  theme: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  repositoryContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  repositoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  repositoryDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default SearchComponent;
