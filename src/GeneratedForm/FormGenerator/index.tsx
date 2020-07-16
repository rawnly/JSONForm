import React, { FunctionComponent } from 'react'

import { useFormContext } from 'react-hook-form';
import { Row, Col } from 'reactstrap';
import Field, { Props as FieldProps } from '../Field';
import { SetRequired, Except } from 'type-fest';


export interface GeneratedField<T, K extends keyof T = keyof T> extends SetRequired<Except<FieldProps, 'name'>, 'label'> {
	name: K;

	when?: ((values: T) => boolean) | boolean;

	xs?: 2 | 4 | 6 | 8 | 10 | 12;
	md?: 2 | 4 | 6 | 8 | 10 | 12;
	lg?: 2 | 4 | 6 | 8 | 10 | 12;

	inputClassName?: string;
}

export type FormStructure<T, K extends keyof T = keyof T> = GeneratedField<T, K>[][];

interface Props<T> {
	structure: FormStructure<T>;
	inputClass?: string;
}

const GeneratedForm = <T extends {}>(props: Props<T>) => {
	const { watch } = useFormContext();

	const values = watch();

	const when = (w) => (w instanceof Function ? w(values) : w);

	return (
    <>
      {props.structure.map((fields, idx) => (
        <Row key={idx}>
          {fields.map(
            ({ xs = Math.floor(12 / fields.length), lg, md, ...field }, idx) =>
              field.when ? (
                when(field.when) && (
                  <Col {...{ xs, lg, md }} key={idx}>
                    <Field
                      {...field}
                      className={field.className ?? props.inputClass}
                      name={(field.name as string) || field.label}
                    />
                  </Col>
                )
              ) : (
                <Col {...{ xs, lg, md }} key={idx}>
                  <Field
                    {...field}
                    className={field.className ?? props.inputClass}
                    name={(field.name as string) || field.label}
                  />
                </Col>
              )
          )}
        </Row>
      ))}
    </>
  );
};

export default GeneratedForm;
