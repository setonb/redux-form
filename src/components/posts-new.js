import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    // Pass two values into the Action Creator
    // Second one will be a callback function for after the first request completes
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-secondary" style={{marginLeft: '5px'}}>Cancel</Link>
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
})(
  connect(null, { createPost })(PostsNew)
);
