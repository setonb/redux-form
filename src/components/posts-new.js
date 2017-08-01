import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        {field.meta.error}
      </div>
    )
  }

  render() {
    return (
      <form action="">
        <Field
          name="title"
          component={this.renderField}
          label="Title"
        />
        <Field
          name="categories"
          component={this.renderField}
          label="Categories"
        />
        <Field
          name="content"
          component={this.renderField}
          label="Post Content"
        />
      </form>
    );
  }
}

// Function to validate values from form
function validate(values) {
  const errors = {}; // set up initial empty errors object

  // Validations
  if (!values.title) {
    errors.title = "Enter a title!";
  }

  if (!values.categories) {
    errors.categories = "Enter a category!";
  }

  if (!values.content) {
    errors.content = "Enter some content!";
  }

  // return errors object.
  // Any properties on the errors object will fail the form submission
  return errors;
}

export default reduxForm({
  validate, // Pass in validate function ( ES6 syntax allows validate: validate to be just validate )
  form: 'PostsNewForm'
})(PostsNew);
