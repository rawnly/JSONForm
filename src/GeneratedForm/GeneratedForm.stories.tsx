import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'

// Component
import { GeneratedForm } from ".";

// Style
import 'bootstrap/dist/css/bootstrap.min.css'
import { FormStructure } from './FormGenerator';

export default {
    title: 'GeneratedForm',
}

interface FormValues { firstName: string, lastName: string }

let formStructure: FormStructure<any> = [
    [
        {
            label: 'First Name',
            placeholder: 'John',
            name: 'firstName',
            required: true
        },
        {
            label: 'Last Name',
            placeholder: 'Doe',
            name: 'lastName',
            required: true
        },
    ]
]

export const Form = () => {
    const methods = useForm<FormValues>({ mode: "onBlur" });

    const onSubmit = (values: FormValues) =>
      alert(`Hello ${values.firstName} ${values.lastName}`);

    return (
      <div className="d-flex flex-column">
        <div
          className="card shadow border-0 m-5 px-5 py-4"
          style={{ maxWidth: 600, width: "80vw" }}
        >
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
              <GeneratedForm structure={formStructure} />
            </FormProvider>
            <div className="form-group pt-3 d-flex justify-content-end align-items-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div>
            <pre>
                {JSON.stringify(formStructure,null,2)}
            </pre>
        </div>
      </div>
    );
}