import { useEffect, useState } from 'react';
import { SplashScreen } from 'expo-router';
import * as Font from "expo-font";
import { Asset } from 'expo-asset';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const [{ localUri }] = await Asset.loadAsync(require('../../../assets/images/icon.png'));

        // Load fonts
        await Font.loadAsync({
          'SpaceMono': require('../../../assets/fonts/SpaceMono-Regular.ttf'),
          'Roboto-MediumItalic': require('../../../assets/fonts/Roboto-MediumItalic.ttf'),
          'Inter-Bold': require('../../../assets/fonts/Inter-Bold.ttf'),
          'Roboto-Medium': require('../../../assets/fonts/Roboto-Medium.ttf'),
          'Roboto-Regular': require('../../../assets/fonts/Roboto-Regular.ttf'),
        });

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}