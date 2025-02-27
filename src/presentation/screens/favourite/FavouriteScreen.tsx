import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { getFavourites, removeFavourite } from '../../../core/api/favourite.api';
import { Favourite } from '../../../infrastructure/interfaces/favourite.interface';

export const FavouriteScreen = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(true);




useFocusEffect(
  useCallback(() => {
    let isActive = true;

    const fetchFavourites = async () => {
      try {
        setLoading(true);
        const response = await getFavourites();
        if (isActive) {
          setFavourites(response);
        }
      } catch (error) {
        console.error('Error fetching favourites:', error);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchFavourites();
    console.log('FavouriteScreen MOUNTED');

    return () => {
      isActive = false; // 🔹 Se ejecuta cuando la pestaña pierde el foco
      console.log('FavouriteScreen UNMOUNTED');
    };
  }, [])
);



  const handleRemoveFavourite = async (id: any) => {
    try {
      await removeFavourite(id);
      setFavourites((prev) => prev.filter((fav) => fav.id !== id));
    } catch (error) {
      console.error('Error removing favourite:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5733" />
        <Text>Cargando favoritos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favourites</Text>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: (item.image as any)?.url }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.breed}>{item.id || 'Unknown'}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveFavourite(item.id)} style={styles.trashButton}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 10,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  breed: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trashButton: {
    padding: 8,
  },
});
