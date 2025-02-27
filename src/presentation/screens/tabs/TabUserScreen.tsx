import React, { useState } from 'react';
import { SafeAreaView, Text, Button, ScrollView, Image, TextInput, View } from 'react-native';
import { getCats } from '../../../core/api/cats.api';
import { getFavourites, addFavourite } from '../../../core/api/favourite.api';
import { Cat } from '../../../infrastructure/interfaces/cat.interface';
import { Favourite } from '../../../infrastructure/interfaces/favourite.interface';

export const TabUserScreen = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [imageId, setImageId] = useState('');

  // Obtener gatos
  const fetchCats = async () => {
    try {
      const response = await getCats();
      console.log('Cats:', response);
      setCats(response);
    } catch (error) {
      console.error('Error fetching cats:', error);
    }
  };

  // Obtener favoritos
  const fetchFavourites = async () => {
    try {
      const response = await getFavourites();
      console.log('Favourites:', response);
      setFavourites(response);
    } catch (error) {
      console.error('Error fetching favourites:', error);
    }
  };

  // Añadir favorito
  const handleAddFavourite = async () => {
    if (!imageId) {
      console.error('Please enter a valid image ID');
      return;
    }
    try {
      await addFavourite(imageId);
      console.log(`Added ${imageId} to favourites`);
      setImageId('');
    } catch (error) {
      console.error('Error adding favourite:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Button title="Get Cats" onPress={fetchCats} />
      <ScrollView style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>Cats Data:</Text>
        {cats.length === 0 ? (
          <Text>No cats found</Text>
        ) : (
          cats.map((cat) => (
            <View key={cat.id} style={{ marginBottom: 20, alignItems: 'center' }}>
              <Text>ID: {cat.id}</Text>
              <Text>Name: {cat.breeds?.[0]?.name || 'Unknown'}</Text>
              <Image source={{ uri: cat.url }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            </View>
          ))
        )}
      </ScrollView>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            flex: 1,
            marginRight: 10,
          }}
          placeholder="Enter Image ID"
          value={imageId}
          onChangeText={setImageId}
        />
        <Button title="Add Favourite" onPress={handleAddFavourite} />
      </View>

      <Button title="Get Favourites" onPress={fetchFavourites} style={{ marginTop: 20 }} />
      <ScrollView style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>Favourites:</Text>
        {favourites.length === 0 ? (
          <Text>No favourites found</Text>
        ) : (
          favourites.map((fav) => (
            <View key={fav.id} style={{ marginBottom: 20, alignItems: 'center' }}>
              <Text>ID: {fav.id}</Text>
              <Text>Image ID: {fav.image_id}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
