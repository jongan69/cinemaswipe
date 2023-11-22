import { StyleSheet, Image } from 'react-native';

import ContentCard from '../../../components/ContentCard';
import { Text, View } from '../../../components/Themed';
import { useSession } from '../../../auth/ctx';
import { useSegments } from 'expo-router';
import React from 'react';

import * as AppData from '../../../../app.json'
import ListCard from '../../../components/ListCard';
import { ExternalLink } from '../../../components/ExternalLink';
import { IMovie } from '../../../types/Interfaces';
import Pagination from '../../../components/web/Pagination.web';

export default function WebNotifications() {
  const { session }: any = useSession();
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
  const PageSize = 20;
  const [currentPage, setCurrentPage] = React.useState(1);
  const paginatedMatches = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  function ListCard(props) {
    return (
      <View style={styles.listCard}>
        <ExternalLink
          href={`https://www.google.com/search?q=${props.item.movieTitle}`}>
          <Image source={{ uri: props.item.image }} style={{ height: 50, width: 50 }} />
          <Text
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            {props.item.movieTitle}
          </Text>
        </ExternalLink>
      </View>
    );
  }

  function MovieList(props: { movies: any; }) {
    const movies = props.movies;
    console.log(movies)
    return (
      <ul>
        {movies?.map((movie: IMovie) =>
          <ListCard key={movie._id} item={movie} />
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

      </View>
      <View style={{ alignItems:'center'}}>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </View>
      <View>
        {paginatedMatches?.length > 0 && <MovieList movies={paginatedMatches} />}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
  listCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 50,
    width: '100%',
    margin: 10
  },
});
