import { signIn } from 'next-auth/react';

export const signinUser = async (email, password) => {
  try {
    const response = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    return response;
  } catch (error) {
    throw error;
  }
};