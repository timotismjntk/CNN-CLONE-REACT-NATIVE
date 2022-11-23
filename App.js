/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import Toast, {
  SuccessToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';

// navigationContainer
import Navigator from './src/navigators/Navigator';

import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {windowWidth} from './src/utils';

LogBox.ignoreAllLogs(true);

// https://github.com/calintamas/react-native-toast-message/blob/main/docs/custom-layouts.md
const toastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: windowWidth * 0.04,
        fontFamily: 'DMSans-Bold',
      }}
      text2Style={{
        fontSize: windowWidth * 0.036,
        fontFamily: 'DMSans-Regular',
      }}
    />
  ),
  info: props => (
    <InfoToast
      {...props}
      text1Style={{
        fontSize: windowWidth * 0.04,
        fontFamily: 'DMSans-Bold',
      }}
      text2Style={{
        fontSize: windowWidth * 0.036,
        fontFamily: 'DMSans-Regular',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: windowWidth * 0.04,
      }}
      text2Style={{
        fontSize: windowWidth * 0.036,
        fontFamily: 'DMSans-Regular',
      }}
    />
  ),
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigator />
          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
