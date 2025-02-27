import React, { useState, useCallback } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useFocusEffect } from '@react-navigation/native';

import { Cat } from '../../../infrastructure/interfaces/cat.interface';
import { getCats } from '../../../core/api/cats.api';
import { addFavourite } from '../../../core/api/favourite.api';

const { width } = Dimensions.get('window');

export const MatchScreen = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [index, setIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const translateX = useSharedValue(0);
  const feedbackOpacity = useSharedValue(0);
  const feedbackScale = useSharedValue(1);
  const [feedbackType, setFeedbackType] = useState<'like' | 'dislike' | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchCats = async () => {
        try {
          setLoading(true);
          const response = await getCats(5);
          if (isActive) {
            setCats(response);
            setIndex(0);
          }
        } catch (error) {
          console.error('Error fetching cats:', error);
        } finally {
          if (isActive) {setLoading(false);}
        }
      };
      console.log('MatchScreen MOUNTED');
      fetchCats();

      return () => {
        isActive = false;
        console.log('MatchScreen UNMOUNTED');
      };
    }, [])
  );


  const getNextCat = () => {
    setFeedbackType(null);
    setImageLoaded(false);
    if (index < cats.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setCats([]);
      setIndex(0);
      setLoading(true);
      getCats(5).then((response) => {
        setCats(response);
        setLoading(false);
      });
    }
    translateX.value = 0;
  };

  const showFeedback = (type: 'like' | 'dislike') => {
    setFeedbackType(type);
    feedbackOpacity.value = 1;
    feedbackScale.value = 1.2;

    feedbackOpacity.value = withTiming(0, { duration: 500 });
    feedbackScale.value = withTiming(1, { duration: 500 });
  };

  const likeCat = async () => {
    if (cats.length > 0) {
      await addFavourite(cats[index].id);
    }
    runOnJS(showFeedback)('like');
    translateX.value = withTiming(width, {}, () => runOnJS(getNextCat)());
  };

  const dislikeCat = () => {
    runOnJS(showFeedback)('dislike');
    translateX.value = withTiming(-width, {}, () => runOnJS(getNextCat)());
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const feedbackStyle = useAnimatedStyle(() => ({
    opacity: feedbackOpacity.value,
    transform: [{ scale: feedbackScale.value }],
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > 100) {
        runOnJS(likeCat)();
      } else if (event.translationX < -100) {
        runOnJS(dislikeCat)();
      } else {
        translateX.value = withSpring(0);
      }
    });

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF5733" />
        </View>
      );
    }

  return (
    <GestureHandlerRootView style={styles.container}>
      {feedbackType && (
  <Animated.View style={[styles.feedbackContainer, feedbackStyle]}>
    <Text
      style={[
        styles.feedbackText,
        { color: feedbackType === 'like' ? '#6BD88E' : 'red' },
      ]}
    >
      {feedbackType === 'like' ? 'LIKE ❤️' : 'DISLIKE ❌'}
    </Text>
  </Animated.View>
)}

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          {!imageLoaded && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#FF5733" />
            </View>
          )}

          <Image
            source={{ uri: cats[index]?.url }}
            style={styles.image}
            onLoad={() => setImageLoaded(true)}
          />

          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Text style={styles.breed}>{cats[index]?.breeds[0]?.name || 'Unknown'}</Text>
              <Text style={styles.id}>{cats[index]?.id}</Text>
            </View>
            <Text style={styles.origin}>{cats[index]?.breeds[0]?.origin || 'Unknown'}</Text>
          </View>
        </Animated.View>
      </GestureDetector>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity testID="like-button" onPress={dislikeCat} style={[styles.button, styles.dislike]}>
          <Ionicons name="close" size={40} color="red" />
        </TouchableOpacity>

        <TouchableOpacity onPress={likeCat} style={[styles.button, styles.like]}>
          <Ionicons name="heart" size={40} color="#6BD88E" />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  card: {
    width: 350,
    height: 450,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loaderContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  id: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  origin: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'center',
    gap: 40,
  },
  button: {
    width: 55,
    height: 55,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 6,
  },
  dislike: {
    borderWidth: 0,
  },
  like: {
    borderWidth: 0,
  },
  feedbackContainer: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  feedbackText: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

