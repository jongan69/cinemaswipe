import { View } from '../components/Themed';
import React from 'react';
import Header from '../components/Header.web';
import Banner from '../components/web/Banner.web';

export default function Details() {

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="About"
        subTitle="CinemaSwipe: Discover Movies Together"
      />

      {/* First team member */}
      <Banner
        title="Welcome to CinemaSwipe, our personal movie discovery hub! 🎬 This repository is a labor of love designed to make choosing movies a breeze. Imagine a Tinder-like experience for movies – just swipe left for a pass and right for a potential movie night winner!"
        subtitle="Whether you're in the mood for a cozy night in or an epic cinematic adventure, CinemaSwipe is here to help you find the perfect movie match. Happy swiping and enjoy your movie nights! 🎉🎥"
        description="
        **Features:**
        - 🍿 **Swipe Interface:** Effortlessly discover new movies with a simple swipe.

        - 🎥 **Diverse Genres:** Explore a wide range of genres to suit any mood.

        - 📝 **Personalized Lists:** Curate your own watchlist and favorites.

        - 🌟 **Movie Ratings:** Get instant ratings and reviews to help you decide
        .
        - 🕵️‍♂️ **Advanced Filters:** Fine-tune your search based on release date, popularity, and more.
        
        "
        img="https://github.com/jongan69/jongan69/blob/main/profile.PNG?raw=true"
      />
    </View>
  );
}
