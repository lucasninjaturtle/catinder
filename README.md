# 🐱💚 CaTinder ❌

### CaTinder is a fun and interactive cat-swiping app inspired by Tinder!Swipe left to pass, swipe right to like, and save your favorite cats to your collection. 😻

## 📲 Getting Started

Note: Ensure you have completed the Set Up Your Environment guide before proceeding.

Step 1: Install Dependencies

Run the following command in the root of your project:
```
npm install
```

## Step 2: Build and Run the App

Android:
```
npm run android
```
iOS:

# Install CocoaPods dependencies (only needed for the first time)
```
bundle install
bundle exec pod install
npm run ios
```

# To run tests
```
npm test
```

## 📦 Dependencies

react-native

react-navigation

axios

react-native-dotenv

@react-navigation/bottom-tabs

@react-navigation/material-top-tabs

react-native-pager-view

react-native-gesture-handler

react-native-vector-icons

ionicons

react-native-reanimated

@testing-library/react-native

jest

## 🎥 Demo Video

https://res.cloudinary.com/dowfpmath/image/upload/v1740672563/CaTinder-ezgif.com_vtp1op.gif

![CaTinder Demo](https://res.cloudinary.com/dowfpmath/image/upload/v1740672563/CaTinder-ezgif.com_vtp1op.gif?raw=true)

<a href="https://www.loom.com/share/f813439a72584aa7bdb24236949ad053?sid=ecb668dd-1e96-49c7-babd-4e131b5fe1ff" target="_blank" rel="noopener noreferrer">
  Ver video en Loom
</a>


## 🎭 How Swiping Works

CaTinder mimics Tinder's swiping behavior:

✅ LIKE (💚 Heart) → Calls addFavourite(imageId)

The cat is added to your favorites via an API request.

✅ FAVORITES (⭐ Star) → Calls getFavourites()

Displays a list of your favorite cats from the API.

❌ DISLIKE (❌ Cross) → Moves to the next cat (no API request).

Just skips the current cat, no data is stored.

This behavior is inspired by Tinder, where disliked profiles simply disappear without storing any history.

🚀 Enjoy swiping through the cutest cats! 😻

