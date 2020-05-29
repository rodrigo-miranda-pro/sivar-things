export const formikUtil = (formik) => ({
    formikProps: (name, label, emptyValue = '') => ({
        name: name,
        label: label,
        value: typeof formik.values[name] !== 'undefined' ? formik.values[name] : emptyValue,
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: formik.touched[name] && formik.errors[name] ? true: false,
        helperText: formik.touched[name] ? formik.errors[name] : emptyValue
    })
})
