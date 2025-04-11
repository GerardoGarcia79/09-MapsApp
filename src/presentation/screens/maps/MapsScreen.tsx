/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View} from 'react-native';
import {useLocationStore} from '../../store/location/useLocationStore';
import {Maps} from '../../components/maps/Maps';
import {LoadingScreen} from '../loading/LoadingScreen';
import {useEffect} from 'react';

export const MapsScreen = () => {
  const {lastKnownLocation, getLocation} = useLocationStore();

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Maps initialLocation={lastKnownLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
