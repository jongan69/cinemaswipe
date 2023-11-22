import { StyleSheet } from 'react-native';

import ContentCard from '../../../components/ContentCard';
import { Text, View } from '../../../components/Themed';
import { useSession } from '../../../auth/ctx';
import { usePathname, useSegments } from 'expo-router';
import React from 'react';

import * as AppData from '../../../../app.json'
import ListCard from '../../../components/ListCard';
// import StyledFlashList from '../../../components/StyledFlashList';
import { MDBDataTable } from 'mdbreact';
import usePagination from '../../../resources/hooks/usePagination';
import { ExternalLink } from '../../../components/ExternalLink';
import { IMovie } from '../../../types/Interfaces';

export default function WebNotifications() {
  const { session, signOut }: any = useSession();
  const segments = useSegments();
  const [connectedEmail, setConnectedEmail] = React.useState("");

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
  const [matches, setMatches] = React.useState([]);
  const [onlyMatches, setOnlyMatches] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const matchUrl = onlyMatches
    ? `https://mongoapi.jongan2.repl.co/api/likedmovies?userWhoLikeEmail=${session}&connectedUserEmail=${connectedEmail}`
    : `https://mongoapi.jongan2.repl.co/api/likedmovies?userWhoLikeEmail=${session}`


  React.useEffect(() => {
    setMatches((): any => [])
    async function getMatches() {
      fetch(matchUrl, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(result => {
          setMatches(result)
        })
    }
    getMatches()

  }, [refreshing])

  React.useEffect(() => {
    if (matches.length > 0) setData(matches)
  }, [matches])
  const [data, setData]: any = React.useState([])

  // for pagination
  const PER_PAGE = 20;
  const paginatedMatches = usePagination(data, PER_PAGE).currentData()


  function MovieList(props: { movies: any; }) {
    const movies = props.movies;
    console.log(movies)
    return (
      <ul>
        {movies?.map((movie: IMovie) =>
          <ExternalLink key={movie._id} href={`https://www.google.com/search?q=${movie.movieTitle}`}>
            <ListCard key={movie._id} item={movie} />
          </ExternalLink>
        )}
      </ul>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <ContentCard
          header={'Matches'}
          highlight={`You are matching with ${connectedEmail}`}
          subtitle={`You liked ${matches?.length} Movies`}
          link={`${AppData.expo.githubUrl}/blob/main/src/app/${segments[0]}/${segments[1] ? `${segments[1]}/` : ''}${segments[2] ? `${segments[2]}` : ''}.tsx`} linkText={''}
        />
        {/* <StyledFlashList data={[matches, refreshing, setRefreshing]} /> */}
        {paginatedMatches?.length > 0 && <MovieList movies={paginatedMatches} />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
