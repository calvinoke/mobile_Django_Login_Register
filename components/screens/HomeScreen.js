import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../globalContext/globalContext';

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.replace('Login'); // Replace with the name of your login screen route
    }
  }, [user, navigation]);

  const handleLogout = () => {
    logout();
    navigation.replace('Login'); // Replace with the name of your login screen route
  };

  if (!user) {
    return null; // Or you can return a loading indicator or some fallback UI
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.username}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
