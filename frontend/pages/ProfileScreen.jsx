import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext); // Get user data from context
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      {user ? (
        <View>
          <Text style={styles.username}>Username: {user.username}</Text>
          <Text style={styles.email}>Email: {user.email}</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.notLoggedIn}>You are not logged in.</Text>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignup} style={styles.button}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  username: {
    fontSize: 18,
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    marginBottom: 8,
  },
  notLoggedIn: {
    fontSize: 18,
    marginBottom: 16,
    color: 'red',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProfileScreen;
