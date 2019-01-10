import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
  window: {
    width: windowWidth,
    height: windowHeight,
  },
  isSmallDevice: windowWidth < 375,
};

export {
  windowWidth,
  windowHeight,
}
