import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { UserContext } from '../contexts/UserContext'; // Import UserContext

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext); // Use setUser from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    console.log('Attempting to log in with:', email, password); // Debugging log

    try {
      const response = await axios.post('http://10.0.2.2:5000/auth/login', { email, password });

      console.log('Login response:', response.data);  // Debugging log for successful response

      if (response.data.token) {
        console.log('Login successful, token received:', response.data.token);  // Debugging log for successful login
        // Update user context
        setUser(response.data.user);
        navigation.navigate('Main', { screen: 'Profile' });  // Navigate to Profile tab within Main tab navigator
      } else {
        console.log('No token in response');
        setError('Error occurred during login. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      if (err.response) {
        console.error('Error response:', err.response.data);
        setError(err.response.data.message || 'Error occurred during login.');
        Alert.alert('Login Failed', err.response.data.message || 'Network error');
      } else {
        setError('Network error. Please try again.');
        Alert.alert('Login Failed', 'Network error. Please try again.');
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image source={require("../assets/TopVector.png")} style={styles.topImage} />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hello</Text>
      </View>
      <View>
        <Text style={styles.signInText}>Sign in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Fontisto name="locked" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Text style={styles.forgotPasswordText}>Forgot your password</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.signInButtonContainer}>
        <Text style={styles.signIn}>Sign in</Text>
        <LinearGradient colors={["#F97794", "#623AA2"]} style={styles.linearGradient}>
          <AntDesign name="arrowright" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.footerText}>Don't have an account? Create</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    position: "relative",
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: 130,
  },
  helloContainer: {},
  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "500",
    color: "#262626",
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color: "#262626",
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 20,
    alignItems: "center",
    height: 50,
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
  },
  forgotPasswordText: {
    color: "#BEBEBE",
    textAlign: "right",
    width: "90%",
    fontSize: 15,
  },
  signInButtonContainer: {
    flexDirection: "row",
    marginTop: 120,
    width: "90%",
    justifyContent: "flex-end",
  },
  signIn: {
    color: "#262626",
    fontSize: 25,
    fontWeight: "bold",
  },
  linearGradient: {
    height: 34,
    width: 56,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  footerText: {
    color: "#262626",
    textAlign: "center",
    fontSize: 16,
    marginTop: 120,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
