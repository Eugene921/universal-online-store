import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, FieldArray } from 'redux-form';

import { RenderField, RenderFieldArray } from './field';
import RenderFieldImages from './image';

const ProductForAdminForm = props => {
  const { handleSubmit, checkOfCreateNew, reset, pristine, submitting, asyncValidating } = props;

  return (
    <form className="item_full_for_admin" onSubmit={handleSubmit} onReset={reset}>
      <div className="item_full_images_for_admin">
        <FieldArray name="images" label="image" component={RenderFieldImages} />
      </div>
      <div className="item_full_data_for_admin">
        <Field name="link" label="Link" disabled={!checkOfCreateNew} component={RenderField} type="text" />

        <Field name="name" label="Name" component={RenderField} type="text" />

        <Field name="details" label="Details" component={RenderField} rows="10" cols="50" type="textarea" />

        <Field name="costPerItem" label="Cost per item" component={RenderField} type="text" />

        <FieldArray name="colors" label="color" component={RenderFieldArray} />

        <FieldArray name="sizes" label="size" component={RenderFieldArray} />

        <button type="submit" className="btn_seve_cheang btn" disabled={pristine || submitting || !!asyncValidating}>
          { checkOfCreateNew ? 'Save' : 'Change' }
        </button>

        <button type="button" className="btn_cencel_cheang btn" disabled={pristine || submitting} onClick={reset}>
          Cancel
        </button>
      </div>
    </form>
  );
};

ProductForAdminForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  checkOfCreateNew: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  asyncValidating: PropTypes.any,
};

export default reduxForm({
  form: 'adminFormProduct',
  enableReinitialize: true,
  })(ProductForAdminForm);