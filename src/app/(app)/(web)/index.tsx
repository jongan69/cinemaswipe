import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, ImageBackground, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import TinderCard from 'react-tinder-card'
import { Text } from '../../../components/Themed';
import axios from 'axios';
import fetch from 'node-fetch'

import { IMovie } from '../../../types/Interfaces';
import { useSession } from '../../../auth/ctx';

const localApiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY

export default function WebHome() {
  const { session }: any = useSession();
  const [movies, setMovies] = React.useState<IMovie>();
  const [page, setPage] = React.useState(0);
  const [currentTitle, setCurrentTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = useState()
  const alreadyRemoved: string[] = []
  const [lastDirection, setLastDirection] = useState("")
  const childRefs = useMemo(() => Array(movies?.length).fill(0).map(i => React.createRef()), [])
  const [connectedEmail, setConnectedEmail] = React.useState("");

 

  let moviesState: any = movies // This fixes issues with updating movies state forcing it to use the current state and not the state that was active when the card was created.

  React.useEffect(() => {
    async function getValueFor() {
      const result = localStorage.getItem('connectedEmail');
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

  // Random Movie API
  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
    params: {
      list: 'top_rated_series_250'
    },
    headers: {
      'X-RapidAPI-Key': 'HIYN33YPwamshwr94ZobUkgsCp4yp1AU8X8jsnG6vg7P62zjSj',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  const getMovies = () => {
    return axios
      .request(options)
      .then((res: any) => {
        console.log(res.data.results);
        setMovies(res.data.results)
      })
      .catch((err: any) => console.log(err))
  }

  React.useEffect(() => {
    if (currentTitle.length > 0) {
      const getAiDescription = async () => {
        setIsLoading(true)
        try {
          console.log(`Calling GPT4 with ${localApiKey ?? 'null'}` )
          var url = "https://api.openai.com/v1/chat/completions";
          var bearer = `Bearer ${localApiKey}`
          await fetch(url, {
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
            .then((result: { choices: { message: { content: any; }; }[]; }) => {
              alert(result.choices[0].message.content)
              console.log(result.choices[0].message.content)
              setDescription(result.choices[0].message.content)
              setIsLoading(false);
            })
        } catch (e) {
          console.log(e);
        }
      }
      getAiDescription()
    }
  }, [currentTitle])



  const swiped = async (direction: string, nameToDelete: string, image: string, index: string | number) => {
    console.log('removing: ' + nameToDelete + ' to the ' + direction + ', page is last index: ' + index)
    if (direction === 'right') {
      try {
        const response = await axios.post('https://mongoapi.jongan2.repl.co/api/likedMovies', {
          movieTitle: nameToDelete,
          image,
          description,
          userWhoLikeEmail: session,
          connectedUserEmail: connectedEmail
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response.data);
        setDescription("");
      } catch (error) {
        console.error(error);
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

  const CardPress = (moviesState: string | any[] | undefined) => {
    if (moviesState) {
      let movie = moviesState[moviesState.length - (1 + alreadyRemoved.length)]
      console.log(movie)
      setCurrentTitle(movie.titleText.text)
    }
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.cardContainer}>
          {movies !== undefined ?
            <>
              {movies.map((movie: { id: any; titleText: { text: string; }; primaryImage: { url: any; caption: { plainText: string; }; }; }, index: string | number) =>
                <TinderCard ref={childRefs[index]} key={movie.id} onSwipe={(dir: any) => swiped(dir, movie.titleText.text, movie?.primaryImage?.url, index)} onCardLeftScreen={() => outOfFrame(movie.titleText.text)} className="pressable">
                  <div>
                    <div style={styles.card}>
                      <ImageBackground style={styles.cardImage} source={{ uri: movie?.primaryImage?.url }}>
                        <Text style={styles.cardTitle}>{movie.titleText.text}</Text>
                      </ImageBackground>
                      <View style={styles.bottomView}>
                        <Text style={styles.infoText}>{movie.primaryImage?.caption.plainText}</Text>
                      </View>
                    </div>
                  </div>
                </TinderCard>
              )}
            </>
            : <ActivityIndicator />}
          {!isLoading
            ? <button
              style={{ zIndex: 100, bottom: 0, backgroundColor: 'green' }}
              onClick={() => CardPress(moviesState)}>Description</button>
            : <ActivityIndicator />
          }
          {description.length > 0 &&
            <div>
              <p>{description}</p>
            </div>
          }
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