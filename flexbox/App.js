
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
    <View style={styles.container}>
      
     <View style={styles.faltu}>
        <Text>this is important</Text>
      </View>
      <View style={styles.feku}>
        <Text>this is important</Text>
      </View>
      <View style={styles.jhatu}>
        <Text>
          this could be a jhatu profile
        </Text>
      </View>
    </View>
     
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection :'row-reverse',
    justifyContent:"space-evenly",
    // justifyContent:"space-around",
// justifyContent:"center"
//justifyContent:"space-between",
alignItems:"center"   
  },
  faltu:{
   
    width :100,
    height:100,

    backgroundColor:"orange",
  },
  feku:{
   
    width :100,
    height:100,
    backgroundColor:"green",

  },
   jhatu:{
   
    width :100,
    height:100,
    backgroundColor:"black",

  },
});
