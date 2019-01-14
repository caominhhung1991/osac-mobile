import Colors from "../../constants/Colors";

const pickerStyle = {
  fontSize: 15,
  paddingTop: 8,
  paddingBottom: 8,
  // paddingRight: 35,
  paddingLeft: 8,
  paddingHorizontal: 10,
  borderWidth: 1,
  borderColor: Colors.osacColor,
  borderRadius: 5,
  backgroundColor: 'white',
  color: Colors.osacColor,
  marginLeft: 20,
  marginTop: 10,
}

export default {
  cardStyles: {
    containerStyle: {
      marginTop: 30,
      borderRadius: 6,
      borderColor: 'white',
    },
    featuredTitleStyle: {
    },
    imageStyle: {
      borderRadius: 6,
      height: 100,
    },
    imageWrapperStyle: {
      borderRadius: 10,
    }
  },
  buttonStyles: {
    textStyle: { fontSize: 13 },
    buttonStyle: { padding: 5 },
    containerViewStyle: {
      marginLeft: 0,
      marginRight: 6,
      position: 'absolute',
      top: 15,
      left: 200,
    }
  },
  buttonDongStyles: {
    textStyle: {
      fontSize: 13
    },
    buttonStyle: {
      width: 100,
      padding: 10,
    },
    containerViewStyle: {
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 0,
      marginRight: 6,
    }
  },
  buttonBoPhanStyles: {
    textStyle: {
      fontSize: 13
    },
    buttonStyle: {
      width: 100,
      padding: 10,
    },
    containerViewStyle: {
      marginTop: 5,
      // marginBottom: 15,
      marginLeft: 0,
      marginRight: 6,
    }
  },
  buttonCaLamViecStyles: {
    textStyle: {
      fontSize: 13
    },
    buttonStyle: {
      width: 70,
      padding: 10,
    },
    containerViewStyle: {
      marginTop: 5,
      // marginBottom: 15,
      marginLeft: 0,
      marginRight: 6,
    }
  },
  pickerSelectStyles: {
    style: {
      backgroundColor: 'green',
    },
    inputIOS: pickerStyle,
    inputAndroid: pickerStyle,
  },
}