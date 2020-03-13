import React from 'react';
import { Field } from 'redux-form';

import PropTypes from 'prop-types';

// ===================== RenderField ==========================

export const RenderField = ({ input, label, type, meta, ...props}) => {
  const { touched, error, warning } = meta;
  
  const borderColor = touched ? error ? '#ff2f2f94' : warning ? '#ff930087' : '#5a5a5a' : '#5a5a5a';

  return(
    <label className='input_field' >
      {label}
      <Field
        {...input}
        {...props}
        style={{ borderColor: borderColor}}
        component={type === 'textarea' ? 'textarea' : 'input'}
        type={type}
      />
      { touched ? error ? <span className="input_err">{error}</span>
      : warning ? <span className="input_war">{warning}</span>
      : null : null}
    </label>
  );
};

RenderField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object,
  name: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  })
};

// ===================== RenderFileInput ==========================

const RenderFileInput = ({
  input: { onChange, onBlur, value: omitValue,...inputProps },
  meta: { omitMeta, error, submitFailed },
  fileSelectedHendler,
  ...props
}) => {
  return (
    <label>
      <input
        onChange={fileSelectedHendler}
        onBlur={onBlur}
        {...inputProps}
        {...props}
      />
      {submitFailed && error && <span>{error}</span>}
    </label>
  );
};


RenderFileInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.object,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
  fileSelectedHendler: PropTypes.func,
};

export const RenderFieldArray = ({ fields, label, meta: { warning, error, submitFailed }}) => {
  const borderColor = submitFailed ? error ? '#ff2f2f94' : warning ? '#ff930087' : '#5a5a5a' : '#5a5a5a';

  const ShowColorIcon = index => {
    if(fields.name === 'colors') {
      return <span className="show_select_colors_admin" style={{ backgroundColor: `${fields.get(index)}` }}/>;
    } else {
      return null;  
    }
  };

  return (
    <ul className={`list_of_${fields.name}`}>
      <li>
        <button type="button" style={{ borderColor: borderColor}} onClick={() => fields.push('')}>Add {label}</button>
      </li>
      {fields.map((field, index) => {
        return (
          <li key={index}>
            {ShowColorIcon(index)}
            <Field name={field} placeholder={label} component={RenderField} type="text" />
            <button type="button" title={`Remove ${label}`} className="btn_remove" onClick={() => fields.remove(index)}>⌫</button>  
        </li>
        );}
      )}
      { submitFailed && warning ? <span>{warning}</span> : null }
    </ul>
  );
};
