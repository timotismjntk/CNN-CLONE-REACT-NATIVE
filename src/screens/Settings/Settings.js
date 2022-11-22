import React from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {windowWidth, windowHeight} from '../../utils';

export default function Settings({navigation}) {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionHeaderTitle}>ACCOUNT</Text>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Log In to your TIMO Account</Text>
            <View style={styles.separator} />
          </View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Create a free TIMO Account</Text>
            <View style={styles.separator} />
          </View>
          <RectButton
            onPress={() => navigation.navigate('SavedArticles')}
            style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Saved Articles</Text>
            <Text style={styles.sectionSubTitle}>
              Find your saved articles here
            </Text>
            <View style={styles.separator} />
          </RectButton>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeaderTitle}>APP PREFERENCES</Text>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Edition</Text>
            <Text style={styles.sectionSubTitle}>U.S.</Text>
            <View style={styles.separator} />
          </View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Alerts</Text>
            <View style={styles.separator} />
          </View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>
              Android Notification Settings
            </Text>
            <View style={styles.separator} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeaderTitle}>GENERAL</Text>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Send Feedback</Text>
            <View style={styles.separator} />
          </View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Help for Closed Captioning</Text>
            <View style={styles.separator} />
          </View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Privacy Policy</Text>
            <View style={styles.separator} />
          </View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Term of Use</Text>
            <View style={styles.separator} />
          </View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Ad Choices</Text>
            <View style={styles.separator} />
          </View>
        </View>
        <Text style={styles.version}>
          Version 1.0.0 | Built by Timotius Simanjuntak
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: '3%',
  },
  section: {
    marginBottom: '8%',
  },
  sectionHeaderTitle: {
    color: 'grey',
    fontSize: windowWidth * 0.034,
    fontFamily: 'DMSans-Regular',
  },
  sectionRow: {
    marginTop: '3%',
    paddingHorizontal: '1%',
  },
  sectionTitle: {
    color: 'rgba(0,0,0,0.9)',
    fontSize: windowWidth * 0.039,
    fontFamily: 'DMSans-Regular',
  },
  sectionSubTitle: {
    color: 'grey',
    fontSize: windowWidth * 0.032,
    fontFamily: 'DMSans-Regular',
  },
  separator: {
    height: windowHeight * 0.001,
    width: '100%',
    backgroundColor: 'grey',
    marginTop: '3%',
  },
  version: {
    color: 'grey',
    fontSize: windowWidth * 0.032,
    paddingLeft: '1%',
    fontFamily: 'DMSans-Regular',
  },
});
