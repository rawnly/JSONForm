import React from 'react'

import { ValidationRules, useFormContext } from 'react-hook-form';
import { FunctionComponent, useEffect } from 'react';
import cx from 'classnames';
import { ClassValue } from 'classnames/types';
import Select from "../Select";
// import validators from '../../../util/validator';

import './Field.scss'

export interface Props {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  validation?: ValidationRules;
  readOnly?: boolean;
  autocomplete?: string | "off";
  options?: { value: string; label: string }[];
  className?: ClassValue | ClassValue[];
  hint?: string;
  required?: boolean;
}

const Field: FunctionComponent<Props> = (props) => {
	const { register, errors, setValue, unregister, formState } = useFormContext();

	const defaultValidation: any = {};

	// switch (props.type) {
	// 	case 'email':
	// 		defaultValidation.value = validators.email.UnCommon;
	// 		defaultValidation.message = 'Please enter a valid email address.';
	// 		break;
	// 	case 'url':
	// 		defaultValidation.value = validators.url;
	// 		defaultValidation.message = 'Please enter a valid url.';
	// 		break;
	// 	default:
	// 		break;
	// }

	useEffect(() => {
		if (props.options) {
			register(
				props.name,
				{
					pattern: defaultValidation,
					...props.validation,
					required: props.required ? `The field "${props.label}" is required.` : undefined,
				}


			);

			return () => unregister(props.name)
		}
	}, []);


	
	return (
    <div className="mb-0 form-group">
      <label className="mb-0 form-label" htmlFor={props.name}>
        {props.children || props.label}
      </label>
      {!props.options ? (
        <input
          id={props.name}
          name={props.name}
          type={props.type}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          autoComplete={props.autocomplete}
          className={cx(props.className || "form-control", {
            "is-valid": formState.dirtyFields.hasOwnProperty(props.name),
          })}
          ref={register({
            pattern: defaultValidation,
            ...props.validation,
            required: props.required
              ? `The field "${props.label}" is required.`
              : undefined,
          })}
        />
      ) : (
        <Select
          name={props.name}
          placeholder={props.placeholder}
          options={props.options}
          onChange={(value) => setValue(props.name, value)}
          getOptionValue={(x) => x.value}
          getOptionLabel={(x) => x.label}
          styles={{
            input: (base) => ({
              ...base,
              paddingTop: ".375rem",
              paddingBottom: ".375rem",
              borderWidth: 0,
            }),
            container: (base) => ({
              ...base,
            }),
            menuList: (base) => ({
              ...base,
              padding: 0,
              borderRadius: 2,
            }),
            option: (base) => ({
              ...base,
              padding: ".25rem .5rem",
              fontSize: "0.875rem",
            }),
            indicatorsContainer: () => ({ display: "none" }),
            control: (base) => ({
              ...base,
              border: "0px solid #cad1d7",
              fontSize: "0.875rem",
              minHeight: 31,
              marginTop: "0 !important",
              "&:hover": {
                border: "10 !important",
              },
            }),
            singleValue: (base) => ({
              ...base,
              color: "#adb5bd",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#adb5bd",
              opacity: 0.8,
            }),
            valueContainer: (base) => ({
              ...base,
              borderWidth: 0,
            }),
          }}
        />
        // <select
        // 	defaultValue={props.placeholder}
        // 	name={props.name}
        // 	id={props.name}
        // 	autoComplete={props.autocomplete}
        // 	className={cx('form-control form-control-sm mt-2', props.className)}
        // 	ref={register(
        // 		props.required
        // 			? {
        // 					...props.validation,
        // 					required: `The field "${props.label}" is required.`,
        // 			  }
        // 			: props.validation,
        // 	)}>
        // 	{props.placeholder && (
        // 		<option value={props.placeholder} selected disabled>
        // 			{props.placeholder}
        // 		</option>
        // 	)}
        // 	{props.options.map(({ value, label }, idx) => (
        // 		<option key={idx} value={value}>
        // 			{label}
        // 		</option>
        // 	))}
        // </select>
      )}
      {!errors[props.name] ? (
        <small className="text-muted">{props.hint || <>&nbsp;</>}</small>
      ) : (
        <small className="text-danger">
          {(errors[props.name] as any).message}
        </small>
      )}
    </div>
  );
};

export default Field;
