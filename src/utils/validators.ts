import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  mobile: yup.string(),
});


export const loginSchema = yup.object().shape({
    usernameOrEmail: yup.string().required('Username or Email is required'),
    password: yup.string().required('Password is required'),
});

export const requestResetSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
});

export const resetPasswordSchema = yup.object().shape({
    token: yup.string().required('Token is required'),
    newPassword: yup.string().required('New Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm Password is required'),
});