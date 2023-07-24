import { DevTool } from '@hookform/devtools';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = (props) => {
  const { register, control, handleSubmit, reset, formState } = useForm();

  const { isSubmitSuccessful, isSubmitting, isSubmitted, errors } = formState;

  const submit = (data) => {
    console.log('form submitted', data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <h3>Login Form</h3>
      <form noValidate onSubmit={handleSubmit(submit)}>
        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>
            Username
          </label>
          <input
            type='email'
            className='form-control'
            id='username'
            {...register('username', {
              required: 'Username is required',
              validate: {
                serverValidation: async (fv) => {
                  const response = await axios
                    .get('https://jsonplaceholder.typicode.com/comments/5')
                    .then((r) => r.data);

                  return (
                    response.email === fv || 'This username is not allowed'
                  );
                },
              },
            })}
          />
          <p className='text-danger form-text'>{errors.username?.message}</p>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            {...register('password', {
              validate: {
                numbersOnly: (fv) => {
                  const regex = /^[0-9]{4}$/;
                  return regex.test(fv) || 'Password should be 4 digits';
                },
              },
            })}
          />
          <p className='text-danger form-text'>{errors.password?.message}</p>
        </div>

        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Login;
