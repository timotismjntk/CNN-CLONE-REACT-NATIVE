import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import Toast from 'react-native-toast-message';

const initialState = {
  userDataFacebook: {},
  isLoading: false,
};

export const loginFacebook = createAsyncThunk('auth/login', async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return await auth().signInWithCredential(facebookCredential);
  } catch (e) {}
});

export const logoutFacebook = createAsyncThunk('auth/logout', async () => {
  try {
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: 'Signout Success',
    });
    return auth().signOut()
  } catch (e) {}
});

const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [loginFacebook.pending]: state => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [loginFacebook.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoading: false,
        userDataFacebook: payload,
      };
    },
    [loginFacebook.rejected]: state => {
      return {
        ...state,
        isLoading: false,
      };
    },
    [logoutFacebook.pending]: state => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [logoutFacebook.fulfilled]: state => {
      return {
        ...state,
        isLoading: false,
        userDataFacebook: {},
      };
    },
    [logoutFacebook.rejected]: state => {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = authSlicer.actions;

export default authSlicer.reducer;
