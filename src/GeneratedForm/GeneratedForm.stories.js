import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'

// Component
import { GeneratedForm } from ".";

// Style
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
    title: 'GeneratedForm',
    component: GeneratedForm
}

const formStructure = [
    [
        {
            name: 'firstName',
            placeholder: 'John',
            label: 'First Name'
        },
        {
            name: 'lastName',
            placeholder: 'Doe',
            label: 'Last Name'
        },
    ]
]

export const Form = () => {
    const methods = useForm({ mode: 'onBlur' });

    return (
        <form>
            <FormProvider {...methods}>
                <GeneeratedForm structure={formStructure} />
            </FormProvider>
        </form>
    )
}