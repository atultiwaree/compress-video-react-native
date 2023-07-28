import {StyleSheet, Text, View, Button, PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import RNVideoHelper from 'react-native-video-helper';

import RNFS, {DownloadDirectoryPath} from 'react-native-fs';

const App = () => {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Virus Attack ♍',
          message:
            'Want to push virus in your device' +
            'so your phone can get damage properly.',
          buttonNeutral: 'Nikal yaha se',
          buttonNegative: 'Nai',
          buttonPositive: 'De Raha',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  /**
   * @States
   */

  const [videoUri, setVideoUri] = useState();

  /**
   * @Funcitons
   */

  const pickVideo = async () => {
    try {
      let mediaInfo = await launchImageLibrary({mediaType: 'video'});
      RNVideoHelper.compress(mediaInfo?.assets[0]?.uri, {
        quality: 'low',
        defaultOrientation: 0,
      })
        .progress(value => {
          console.warn('progress', value);
        })
        .then(compressedUri => {
          console.warn('compressedUri', `file://${compressedUri}`);
          setVideoUri(`file://${compressedUri}`);
        });
    } catch (e) {
      console.log('pickVideError', e);
    }
  };

  const saveVideo = async () => {
    console.log('🌧', DownloadDirectoryPath);
    RNFS.moveFile(videoUri, `${DownloadDirectoryPath}/somthing.mp4`)
      .then(e => console.log('Saved', e))
      .catch(e => console.log('Error Saved', e));
  };

  return (
    <View>
      <Text>{videoUri}</Text>
      <Button title="Pick vidoe" onPress={pickVideo} />
      <Button title="Save vidoe" onPress={saveVideo} />
      <Button title="request permissions" onPress={requestCameraPermission} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
