import {Text,View,Button} from 'react-native';
import React from 'react';

function HomeScreen({navigation}){
    return(
<>
<View>
    <Text>
        Home Screen
    </Text>
    <Button 
    title='get your profile'
     onPress={()=>navigation.navigate('Profile')}>

    </Button>
</View>
</>
    );
}
export default HomeScreen;