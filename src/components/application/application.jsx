import React, { Component } from 'react';
import Results from '../results/results';
import './application.scss';

class Application extends Component {
  state = {
    formComplete: false,
    form: {
      title: {
        type: 'select', options: [
          {value: '', text: 'Select title'},
          {value: 'mr', text: 'Mr'},
          {value: 'mrs', text: 'Mrs'},
          {value: 'miss', text: 'Miss'}
        ], label: 'Title', value: '', isValid: true, errorMessage: 'Select a title', required: true
      },
      firstName: {type: 'text', label: 'First Name', value: '', isValid: true, errorMessage: 'Please enter your first name', required: true},
      lastName: {type: 'text', label: 'Last Name', value: '', isValid: true, errorMessage: 'Please enter your last name', required: true},
      dob: {type: 'date', label: 'Date of Birth', value: '', isValid: true, errorMessage: 'Please enter your date of birth', required: true},
      income: {type: 'number', label: 'Annual Income', value: '', isValid: true, errorMessage: 'Please enter your annual income', required: true},
      employmentStatus: {
        type: 'select', options: [
          {value: '', text: 'Select status'},
          {value: 'full', text: 'Full time employed'},
          {value: 'part', text: 'Part time employed'},
          {value: 'student', text: 'Student'}
        ], label: 'Employment Status', value: '', isValid: true, errorMessage: 'Select an employment status', required: true
      },
      houseNo: {type: 'text', label: 'House Number', value: '', isValid: true, errorMessage: 'Please enter your house number', required: true},
      postcode: {type: 'text', label: 'Postcode', value: '', isValid: true, errorMessage: 'Please enter your postcode', required: true}
    }
  }

  handleTextInput = event => {
    const details = {...this.state.form};
    details[event.target.id].value = event.target.value;
    this.setState({form: details});
  }

  handleDropdown = event => {
    event.preventDefault();
    const details = {...this.state.form};
    details[event.target.id].value = event.target.value;
    this.setState({form: details});
  }

  handleSubmit = event => {
    event.preventDefault();
    let details = {...this.state.form};
    let errors = [];
    for(let field in details) {
      details[field].isValid = true;
      if(details[field].required) {
        details[field].isValid = details[field].value !== '' && details[field].isValid;
      }
      if(!details[field].isValid) {
        errors.push(details[field].isValid);
      }
    }
    this.setState({form: details});
    if(errors.length) {
      return;
    }
    this.setState({formComplete: true});
  }

  elementError = (el) => {
    return !el.config.isValid ? <small className="text-danger">{el.config.errorMessage}</small> : null;
  }

  render() {
    const formElementsArray = [];
    for(let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
      });
    }
    let form = (
      <form onSubmit={this.handleSubmit}>
        {formElementsArray.map(el => {
          if(el.config.type !== 'select') {
            return (
              <div key={el.id} className="form-group col-md-3">
                <label htmlFor={el.id}>{el.config.label} *</label>
                <input type={el.config.type} className="form-control" id={el.id} placeholder={el.config.label} value={el.config.value} onChange={this.handleTextInput} />
                <span>{this.elementError(el)}</span>
              </div>
            )
          }
          if(el.config.type === 'select') {
            return (
              <div key={el.id} className="form-group col-md-3">
              <label htmlFor={el.id}>{el.config.label} *</label>
                <select name={el.id} id={el.id} value={el.config.value} className="form-control" onChange={this.handleDropdown}>
                  {el.config.options.map(option => {
                    return (
                      <option key={option.value} value={option.value}>{option.text}</option>
                    )
                  })}
                </select>
                <span>{this.elementError(el)}</span>
              </div>
            )
          }
        })}
        <small>* <i>required</i></small>
        <input type="submit" className="btn btn-primary pull-right" value="Get Cards" />
      </form>
    )
    let result = null;
    if(this.state.formComplete) {
      result = (
        <Results status={this.state.form.employmentStatus.value} income={this.state.form.income.value} />
      )
    }
    return (
      <div className="application">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">Application Form</div>
            <div className="panel-body">
              {form}
            </div>
          </div>
          {result}
        </div>
      </div>
    )
  }
}

export default Application;