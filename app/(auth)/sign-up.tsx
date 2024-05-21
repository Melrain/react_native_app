import { View, Text, ScrollView, Image, Alert, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) Alert.alert('Please fill in all fields');
    try {
      setIsSubmitting(true);
      const result = await createUser({
        username: form.username,
        email: form.email,
        password: form.password
      });
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Failed to create user', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View
          className='w-full justify-center min-h-[85vh] px-4 my-6'
          style={{
            minHeight: Dimensions.get('window').height - 100
          }}
        >
          <Image source={images.logo} className='w-[115px] h-[35px]' resizeMode='contain' />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign Up to Aora</Text>
          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(e: any) => setForm({ ...form, username: e })}
            otherStyles='mt-7'
            keyboardType='username'
            placeholder={'username'}
          />
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
            placeholder={'email'}
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
            keyboardType='password'
            placeholder={'password'}
          />
          <CustomButton title={'Sign Up'} isLoading={isSubmitting} handlePress={submit} containerStyles='mt-7' />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-white text-lg font-pmedium'>Have an account?</Text>
            <Link className='text-lg font-psemibold text-secondary' href={'/sign-in'}>
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
