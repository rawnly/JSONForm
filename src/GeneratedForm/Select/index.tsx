import React from 'react'
import { useEffect, useState } from 'react';
import RSelect, { StylesConfig, Theme } from 'react-select';

interface SelectProps<T, V extends T[keyof T]> {
	value?: V;
	options: T[];
	onChange: (value: V, item: T) => void;

	getOptionLabel?: (item: T) => string;
	getOptionValue?: (item: T) => V;
	labelTransform?: (label: string) => string;

	placeholder?: string;

	name?: string;

	style?: any;
	styles?: StylesConfig;
	theme?: Theme

	disabled?: boolean;
	isLoading?: boolean;
}

const Select = <T extends any, V extends T[keyof T]>(props: SelectProps<T, V>) => {
	const [selected, setSelected] = useState<T>(null);

	const getLabel = (item: any): string => {
		const label = props.getOptionLabel instanceof Function ? props.getOptionLabel(item) : item.label;
		return props.labelTransform instanceof Function ? props.labelTransform(label) : label;
	};

	const getValue = (item: any): V => (props.getOptionValue ? props.getOptionValue(item) : item.value);
	const getItem = () => props.options.find((item) => getValue(item) === props.value);

	useEffect(() => {
		setSelected(getItem());
	}, [props.value]);

	const onChange = (item: T) => {
		setSelected(item);
		props.onChange(getValue(item), item);
	};


	return (
		<RSelect
			// menuIsOpen
			isLoading={props.isLoading}
			isDisabled={props.disabled}
			placeholder={props.placeholder}
			onChange={onChange}
			options={props.options}
			getOptionLabel={getLabel}
			getOptionValue={item => getValue(item).toString()}
			value={selected}
			styles={props.styles}
			style={props.style}
			id={props.name}
			name={props.name}
		/>
	);
};

export default Select;
