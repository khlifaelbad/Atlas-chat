import { ErrorMessage, Field } from 'formik';

export const FormField = ({ placeholder,name, label, type = 'text' }) => (
  <label>
    {label}
    <Field name={name} type={type}  placeholder={placeholder}/>
    <ErrorMessage className="error" component="div" name={name} />
  </label>
);
