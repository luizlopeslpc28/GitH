import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import axios from 'axios';
import { styles } from './styles';

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

  return (
    <View>
      <TextInput
        placeholder="Digite um termo de pesquisa"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="Buscar" onPress={handleSearch} />
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.full_name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchComponent;
