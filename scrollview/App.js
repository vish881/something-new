import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const stories = ['My Story', 'Travel', 'Friends', 'Work', 'Nature'];

const posts = [
  { id: '1', title: 'My First Post', color: '#FCA5A5' },
  { id: '2', title: 'Travel Diaries', color: '#93C5FD' },
  { id: '3', title: 'Friends Forever', color: '#86EFAC' },
  { id: '4', title: 'Nature Love', color: '#FDE68A' },
  { id: '5', title: 'Memories', color: '#C4B5FD' },
  { id: '6', title: 'New Journey', color: '#FDBA74' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>V</Text>
          </View>

          <View style={styles.stats}>
            <View>
              <Text style={styles.number}>24</Text>
              <Text>Posts</Text>
            </View>

            <View>
              <Text style={styles.number}>1.2K</Text>
              <Text>Followers</Text>
            </View>

            <View>
              <Text style={styles.number}>350</Text>
              <Text>Following</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.bio}>
          <Text style={styles.name}>Vishwajit</Text>
          <Text>Developer 💻</Text>
          <Text>Learning React Native 🚀</Text>
          <Text>Building something amazing!</Text>
        </View>

        {/* Follow Button */}
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Follow</Text>
        </Pressable>

        {/* Stories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {stories.map((story, index) => (
            <View style={styles.story} key={index}>
              <View style={styles.storyCircle}>
                <Text style={styles.storyEmoji}>📸</Text>
              </View>
              <Text>{story}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Posts */}
        <Text style={styles.postHeading}>My Posts</Text>

        <View style={styles.posts}>
          {posts.map((post) => (
            <View
              key={post.id}
              style={[styles.post, { backgroundColor: post.color }]}
            >
              <Text>{post.title}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },

  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  number: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  bio: {
    paddingHorizontal: 20,
    gap: 5,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#2563EB',
    margin: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  story: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },

  storyCircle: {
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },

  storyEmoji: {
    fontSize: 25,
  },

  postHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
  },

  posts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  post: {
    width: '30%',
    height: 110,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});