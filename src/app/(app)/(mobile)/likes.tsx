import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Text, View } from '../../../components/Themed';
import * as SecureStore from 'expo-secure-store';
import { Redirect } from 'expo-router';

import CustomSwitch from '../../../components/CustomSwitch';
import Separator from '../../../components/Separator';
import StyledFlashList from '../../../components/StyledFlashList';

import { useMagicSession } from '../../../auth/magicSdk';

export default function LikesScreen() {
  if (Platform.OS === 'web') {
    // Call the replace method to redirect to a new route without adding to the history.
    // We do this in a useFocusEffect to ensure the redirect happens every time the screen
    // is focused.
    return <Redirect href="/(app)/(web)/" />;
  } else {
    const { session }: any = useMagicSession();
    const [connectedEmail, setConnectedEmail] = React.useState("");
    const [matches, setMatches] = React.useState();
    const [onlyMatches, setOnlyMatches] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const matchUrl = onlyMatches
      ? `https://mongoapi.jongan2.repl.co/api/likedmovies?userWhoLikeEmail=${session}&connectedUserEmail=${connectedEmail}`
      : `https://mongoapi.jongan2.repl.co/api/likedmovies?userWhoLikeEmail=${session}`

    const onSelectSwitch = () => {
      setOnlyMatches(!onlyMatches)
    };

    useEffect(() => {
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


    useEffect(() => {
      setMatches([])
      async function getMatches() {
        fetch(matchUrl, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(result => setMatches(result))
      }
      getMatches()
    }, [onlyMatches, refreshing])

    return (
      <View style={{ flex: 1 }}>
        <CustomSwitch
          selectionMode={1}
          option1="Likes"
          option2="Matches"
          onSelectSwitch={onSelectSwitch}
        />
        {onlyMatches && <Text style={{ alignSelf: 'center', justifyContent: 'center' }}>Matches With {connectedEmail}</Text>}
        <Separator />
        <StyledFlashList data={[matches, refreshing, setRefreshing]} />
      </View>
    );
  }
}


