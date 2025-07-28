import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { fetchExample, login, setAuthToken } from '../api';
import { useUser } from '../context/UserContext';

const HomeScreen = () => {
  const { user, login: setUser, addXP, addReward } = useUser();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['example'],
    queryFn: fetchExample,
    enabled: !!user?.token, // Only fetch if logged in
  });

  // Example mutation for login
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Assume API returns { id, name, xp, rewards, token }
      setUser(data);
      setAuthToken(data.token);
      Toast.show({ type: 'success', text1: 'Login Success', text2: `Welcome ${data.name}` });
      queryClient.invalidateQueries({ queryKey: ['example'] });
    },
    onError: (err) => {
      Toast.show({ type: 'error', text1: 'Login Failed', text2: err.message });
    },
  });

  const handleXP = () => {
    addXP(10);
    Toast.show({ type: 'success', text1: 'XP Gained', text2: '+10 XP!' });
  };
  const handleReward = () => {
    addReward(1);
    Toast.show({ type: 'success', text1: 'Reward Gained', text2: '+1 Reward!' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      {user ? (
        <>
          <Text style={styles.text}>Welcome, {user.name}</Text>
          <Text style={styles.text}>XP: {user.xp} | Rewards: {user.rewards}</Text>
          <Button title="Gain 10 XP" onPress={handleXP} />
          <Button title="Get Reward" onPress={handleReward} />
          {isLoading && <Text style={styles.text}>Loading...</Text>}
          {error && <Text style={styles.text}>Error: {error.message}</Text>}
          {data && <Text style={styles.text}>API Data: {JSON.stringify(data)}</Text>}
        </>
      ) : (
        <Button
          title="Login Example"
          onPress={() => loginMutation.mutate({ email: 'test@example.com', password: 'password123' })}
        />
      )}
      {loginMutation.isPending && <Text style={styles.text}>Logging in...</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
});

export default HomeScreen; 