import { DevTool } from '@hookform/devtools';
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

const Contact = (props) => {
  const { register, control, handleSubmit, reset, formState } = useForm();

  const {
    isSubmitSuccessful,
    isSubmitting,
    isSubmitted,
    errors,
    dirtyFields,
    touchedFields,
  } = formState;

  const { fields, append, remove } = useFieldArray({
    name: 'phoneNumbers',
    control: control,
  });

  const submit = (data) => {
    console.log('form submitted', data);
  };

  const submissionError = (errors) => {
    console.log('submission errors', errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);
  return (
    <>
      <h3>Contact Details</h3>
      <form noValidate onSubmit={handleSubmit(submit, submissionError)}>
        <div className='mb-3'>
          <label htmlFor='firstName' className='form-label'>
            First Name
          </label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            {...register('firstName')}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='lastName' className='form-label'>
            Last Name
          </label>
          <input
            type='text'
            className='form-control'
            id='lastName'
            {...register('lastName')}
          />
        </div>
        <div className='my-4'>
          <button
            className='btn btn-info btn-sm'
            type='button'
            onClick={() => {
              append({ label: '', number: 0 });
            }}
          >
            Add Phone Number
          </button>
        </div>
        {fields.map((p, i) => {
          return (
            <div className='row mb-3' key={p.id}>
              <div className='col-5'>
                <input
                  type='text'
                  className='form-control me-3'
                  {...register(`phoneNumbers.${i}.label`)}
                />
              </div>
              <div className='col-5'>
                <input
                  type='number'
                  className='form-control'
                  {...register(`phoneNumbers.${i}.number`)}
                />
              </div>
              <div className='col-2'>
                <button
                  className='btn btn-danger btn-sm ms-4'
                  type='button'
                  onClick={() => remove(i)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        <button className='btn btn-primary mt-3' type='submit'>
          Submit
        </button>
      </form>
    </>
  );
};

export default Contact;
