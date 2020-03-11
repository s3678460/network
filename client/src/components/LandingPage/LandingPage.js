import React, { Component } from "react";
import "./LandingPage.css";
import logo from "../NavBar/rmit-university-logo.png";
import { Link } from "react-router-dom";
import PropsTypes from "prop-types";
import { connect } from "react-redux";
import { submitForm } from "../../actions/submitActions";
import classnames from "classnames";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
// import DayPickerInput from "react-day-picker/DayPickerInput";
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

//import Date-picker library
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale, setDefaultLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';

import { subDays } from "date-fns";

//Configure maxDate for calendar
const maxDate = new Date()

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      studentNumber: "",
      port1: "",
      port2: "",


      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const clientData = {
      studentNumber: this.state.studentNumber,
      port1: this.state.port1,
      port2: this.state.port2,

    };
    this.props.submitForm(clientData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }







  render() {
    const { errors } = this.state;

    // const {gender} = this.state;
    // console.log(gender)
    return (
      <div >
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-9 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">
                    <a>
                      <img src={logo} width="200" height="140" />
                    </a>
                  </h5>

                  <hr className="my-4" />

                  <form className="form-signin" onSubmit={this.onSubmit}>
                    <div className="row">
                      {/* Full name */}
                      <div className="col-sm">
                        <div className="form-group">
                          <input
                            type="text"
                            id="inputStudentNumber"
                            className={classnames("form-control", {
                              "is-invalid": errors.studentNumber
                            })}
                            placeholder="Student Number"
                            name="studentNumber"
                            value={this.state.className}
                            onChange={this.onChange}
                          />
                          {errors.studentNumber && (
                            <div className="invalid-feedback">
                              {errors.studentNumber}
                            </div>
                          )}
                        </div>
                      </div>




                    </div>


                    <div className="row">

                      <div className="col-sm">
                        <div className="form-group">
                          <input
                            type="text"
                            id="inputPort1"
                            className={classnames("form-control", {
                              "is-invalid": errors.port1
                            })}
                            placeholder="Port 1"
                            name="port1"
                            value={this.state.className}
                            onChange={this.onChange}
                          />
                          {errors.port1 && (
                            <div className="invalid-feedback">
                              {errors.port1}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">

                      <div className="col-sm">
                        <div className="form-group">
                          <input
                            type="text"
                            id="inputPort2"
                            className={classnames("form-control", {
                              "is-invalid": errors.port2
                            })}
                            placeholder="Port 2"
                            name="port2"
                            value={this.state.className}
                            onChange={this.onChange}
                          />
                          {errors.port2 && (
                            <div className="invalid-feedback">
                              {errors.port2}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>




                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                    >
                      Submit
                    </button>

                    <hr className="my-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  submitForm: PropsTypes.func.isRequired,
  errors: PropsTypes.object.isRequired
};

const MapStateToProps = state => ({
  errors: state.errors
});

export default connect(MapStateToProps, { submitForm })(LandingPage);
