import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, ImageBackground, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import TinderCard from 'react-tinder-card'
import { Text } from '../../../components/Themed';
import axios from 'axios';
import fetch from 'node-fetch'
import { useMagicSession } from '../../../auth/magicSdk';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen() {
  const { session }: any = useMagicSession();

  const [movies, setMovies] = React.useState();
  const [page, setPage] = React.useState();

  const [currentTitle, setCurrentTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = useState()

  let moviesState = movies // This fixes issues with updating movies state forcing it to use the current state and not the state that was active when the card was created.
  const alreadyRemoved = []
  const [lastDirection, setLastDirection] = useState()
  const childRefs = useMemo(() => Array(movies?.length).fill(0).map(i => React.createRef()), [])
  const [connectedEmail, setConnectedEmail] = React.useState("");
  const [matches, setMatches] = React.useState();

  React.useEffect(() => {
    async function getValueFor() {
      let result = await SecureStore.getItemAsync("connectedEmail");
      if (typeof (result) === 'string') {
        // alert("🔐 Here's your value 🔐 \n" + result);
        setConnectedEmail(result)
        return result.toString()
      } else {
        alert('No connectedEmail.');
        setConnectedEmail("Demo@gmail.com")
      }
    }
    getValueFor()
  }, [])
  React.useEffect(() => {
    setPage(0)
    getMovies();
  }, [page])

  // Demo URL : 'https://jsonplaceholder.typicode.com/photos'

  // Chunk Function
  // const chunk = (data: string | any[]) => {
  //   const chunkSize = 10;
  //   let chunkedMovies = []
  //   for (let i = 0; i < data.length; i += chunkSize) {
  //     const chunk = res.data.slice(i, i + chunkSize);
  //     chunkedMovies.push(chunk)
  //   }
  //   return chunkedMovies;
  // }

  // Streaming service api
  // const options = {
  //   method: 'GET',
  //   url: 'https://streaming-availability.p.rapidapi.com/search/filters',
  //   params: {
  //     services: 'netflix',
  //     country: 'us',
  //     output_language: 'en',
  //     order_by: 'original_title',
  //     genres_relation: 'and',
  //     show_type: 'all'
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': 'HIYN33YPwamshwr94ZobUkgsCp4yp1AU8X8jsnG6vg7P62zjSj',
  //     'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  //   }
  // };

  // Random Movie API
  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
    params: {
      list: 'most_pop_movies'
    },
    headers: {
      'X-RapidAPI-Key': 'HIYN33YPwamshwr94ZobUkgsCp4yp1AU8X8jsnG6vg7P62zjSj',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  // API DATA Refs
  // let movieKey = movies[page].movie.id
  // let movieTitle = movies.movie.titleText.text
  // let movieImageUrl  = movies.movie.primaryImage.url


  const getMovies = () => {
    return axios
      .request(options)
      .then((res: { data: { results: React.SetStateAction<undefined>; }; }) => {
        // console.log(res.data.results);
        setMovies(res.data.results)
      })
      .catch((err: any) => setError(err))
  }

  React.useEffect(() => {
    if (currentTitle.length > 0) {
      const getAiDescription = async () => {
        setIsLoading(true)
        try {
          console.log("Calling GPT4")
          var url = "https://api.openai.com/v1/chat/completions";
          var bearer = 'Bearer ' + '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'
          const result = await fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': bearer,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "messages": [
                { "role": "system", "content": "You are a Movie Wizard with knowledge of all movies." },
                { "role": "user", "content": "Write a complete one sentence description for the movie You Get Me" },
                { "role": "assistant", "content": "You Get Me is a psychological thriller that unfolds a tumultuous and dangerous love triangle when a high school student's one-night stand turns into a relentless obsession, leading to a series of chilling consequences." },
                { "role": "user", "content": `Write a complete one sentence description for the movie ${currentTitle}` }
              ],
              "model": "gpt-4",
              "max_tokens": 100,
              "temperature": 1,
              "top_p": 1,
              "n": 1,
              "stream": false,

              "stop": "\n"
            })
          }).then(response => response.json())
            .then((result) => {
              Alert.alert(
                'Description',
                result.choices[0].message.content
              );
              setDescription(result.choices[0].message.content)
              setIsLoading(false);
              return result.choices[0].message.content
            })
        } catch (e) {
          console.log(e);
        }
      }
      let result = getAiDescription()
      if (typeof (result) === 'string') {
        setDescription(result)
      }
    }
  }, [currentTitle])



  const swiped = (direction: string | React.SetStateAction<undefined>, nameToDelete: string, image: string, index: string | number) => {
    console.log('removing: ' + nameToDelete + ' to the ' + direction + ', card # in index: ' + index)
    if (direction === 'right') {
      try {
        fetch('https://mongoapi.jongan2.repl.co/api/likedMovies', {
          'method': 'POST',
          'headers': {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          'body': JSON.stringify({
            movieTitle: nameToDelete,
            image,
            description,
            userWhoLikeEmail: session,
            connectedUserEmail: connectedEmail
          })
        }).then(response => response.json())
          .then(result => console.log(result))
          .then(() => setDescription(""))

      } catch (e) {
        console.log(e)
      }
    }

    if (index === 0) {
      setPage(page + 1)
    }
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name: any) => {
    // console.log(name + ' left the screen!')
    moviesState = moviesState.filter((movie: { title: any; }) => movie.title !== name)
    setMovies(moviesState)
  }

  const CardPress = (Title) => {
    setCurrentTitle(Title)
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.cardContainer}>
          {movies ?
            <>
              {movies?.map((movie: { id: any; titleText: { text: string | undefined; }; primaryImage: { url: any; caption: { plainText: string | undefined; }; }; }, index: string | number) =>
                <TinderCard ref={childRefs[index]} key={movie.id} onSwipe={(dir: any) => swiped(dir, movie.titleText.text, index)} onCardLeftScreen={() => outOfFrame(movie.titleText.text)} className="pressable">
                  <TouchableOpacity onPress={() => CardPress(movie?.primaryImage?.caption.plainText)}>
                    <View style={styles.card}>
                      <ImageBackground style={styles.cardImage} source={{ uri: movie?.primaryImage?.url }}>
                        <Text style={styles.cardTitle}>{movie.titleText.text}</Text>
                      </ImageBackground>

                      {isLoading
                        ?
                        <ActivityIndicator style={styles.bottomView} />
                        :
                        <View style={styles.bottomView}>
                          <Text style={styles.infoText}>{movie?.primaryImage?.caption.plainText ?? "N/A"}</Text>
                        </View>
                      }

                    </View>
                  </TouchableOpacity>
                </TinderCard>
              )}
            </>
            :
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>Loading...</Text>
              <Text>{error?.message}</Text>
              <Text>{error?.name}</Text>
              <Text>{error?.code}</Text>
              <ActivityIndicator />
            </View>}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    height: '100%'
  },
  cardContainer: {
    width: '90%',
    maxWidth: 400,
    height: 500,
    flexDirection: 'column',
  },
  card: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    height: 500,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    // resizeMode: 'cover',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: 'black'
  },
  textBackground: {
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    padding: 5,
    position: 'absolute',
  },
  cardTitle: {
    position: 'absolute',
    bottom: 50,
    margin: 10,
    padding: 5,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    borderRadius: 4,
    textDecorationLine: "underline",
  },
  infoText: {
    color: 'black'
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    borderRadius: 20
  },
});