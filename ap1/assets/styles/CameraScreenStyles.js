import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
  // Top container
  cam: {
    flex: 1
  },
  
  // Image preview container
  tools: {
    flexDirection: 'row',
    backgroundColor: '#aaaaaa',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 3
  },

  // Tools images
  imageButtons: {
    // tintColor: '#ffffffff',
    height: 50,
    width: 50,
  }
});