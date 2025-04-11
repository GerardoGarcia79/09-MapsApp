import {StyleSheet, View} from 'react-native';
// import {Maps} from '../../components/maps/Maps';

export const MapsScreen = () => {
  // getCurrentLocation().then(location => {
  //   console.log(location);
  // });

  return <View style={styles.container}>{/* <Maps /> */}</View>;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
