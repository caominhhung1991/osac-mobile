import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Text } from 'react-native'
import { Card, CardSection, Button, Input, Spinner } from '../common'
// import firebase from 'firebase';
import * as actions from './../../store/actions'
import { Actions } from 'react-native-router-flux'

class LoginForm extends Component {
  state = {
    error: '',
    loading: false,
  }

  componentDidMount() {
    const { firebase } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Actions.main();
      }
    });
  }

  render() {
    const { error } = this.state;
    const { errorTextStyle } = styles;
    const { email, password, onChangeText } = this.props;

    return (
      <Card>
        <CardSection>
          <Input
            placeholder={'user@gmail.com'}
            label={'Email'}
            value={email}
            onChangeText={email => onChangeText('email', email)}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder={'password'}
            label={'Password'}
            value={password}
            onChangeText={password => onChangeText('password', password)}
          />
        </CardSection>

        <Text style={errorTextStyle}>{error}</Text>

        {this.renderButton()}
      </Card >
    )
  }

  onButtonPress = () => {
    const { email, password, firebase } = this.props;
    this.setState({ error: '', loading: true })
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch((err) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail)
      })
  }

  onLoginFail = () => {
    this.setState({ error: 'Authentication Failed!', loading: false })
  }

  onLoginSuccess = () => {
    this.setState({
      loading: false,
      error: ''
    });
    Actions.employeeList();
  }

  onLogOut = () => {
    const { firebase } = this.props;
    firebase.auth().signOut();

    this.setState({
      error: 'Logged out success!'
    })
  }

  renderButton = () => {
    const { loading } = this.state;
    if (loading) {
      return <Spinner size={"small"} />;
    }
    return (<CardSection>
      <Button onPress={this.onButtonPress}>Log in</Button>
      <Button onPress={this.onLogOut}>Log Out</Button>
    </CardSection>);
  }
}

const styles = {
  errorTextStyle: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 20,
  }
}

const mapStateToProps = state => {
  return {
    email: state.selections.email,
    password: state.selections.password,
  }
}

export default connect(mapStateToProps, actions)(LoginForm)
