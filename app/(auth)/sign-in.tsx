import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(form);
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} className='w-[115px] h-[35px]' resizeMode='contain' />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Aora</Text>
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
          <CustomButton title={'Sign In'} isLoading={isSubmitting} handlePress={submit} containerStyles='mt-7' />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-white text-lg font-pmedium'>Don't have an account?</Text>
            <Link className='text-lg font-psemibold text-secondary' href={'/sign-up'}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
