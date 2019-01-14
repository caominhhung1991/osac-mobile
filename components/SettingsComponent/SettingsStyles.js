import Colors from "../../constants/Colors";

const pickerStyle = {
  fontSize: 15,
  paddingTop: 8,
  paddingBottom: 8,
  paddingRight: 35,
  paddingLeft: 8,
  paddingHorizontal: 10,
  borderWidth: 1,
  borderColor: Colors.osacColor,
  borderRadius: 5,
  backgroundColor: 'white',
  color: Colors.osacColor,
}

export default {
  containerStyle: {
    padding: 10,
    borderRadius: 5,
    borderColor: 'white',
  },
  wrapperStyle: {
  },
  titleStyle: {
    fontSize: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#E6E6E6',
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleEditingStyle: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  propInput: {
    fontSize: 15,
    color: '#626262',
    marginRight: 10,
    fontWeight: 'bold',
  },
  propInputCompany: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  propInputText: {
    fontSize: 16,
    letterSpacing: 1,
    color: '#626262',
  },
  dangXuatStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0,
    margin: 10,
  },
  pickerSelectStyles: {
    style: {
      backgroundColor: 'green',
    },
    inputIOS: pickerStyle,
    inputAndroid: pickerStyle,
  },
  buttonStyle: {
    textStyle: { fontSize: 15 },
    buttonStyle: { padding: 8 },
    containerViewStyle: {
      marginLeft: 0,
      marginRight: 6,
    }
  }
}
