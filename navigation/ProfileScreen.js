
import React from 'react';
import { View, Text, Button } from 'react-native';

function ProfileScreen({ navigation }) {
  return (
    <View>
      <Text>Profile Screen</Text>

      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default ProfileScreen;
