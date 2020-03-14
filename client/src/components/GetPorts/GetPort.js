import React, { Component } from 'react'
import logo from "../NavBar/rmit-university-logo.png"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContacts } from "../../actions/submitActions"
class GetPort extends Component {
  componentDidMount() {
    this.props.getContacts();
  }
  render() {
    const { contacts } = this.props.contacts;
    return (
      <div>
        <div>
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
                    <table>
                      <tr>
                        <th>Student ID</th>
                        <th>Port 1</th>
                        <th>Port 2</th>
                      </tr>

                      {contacts.map(contact => (


                        <tr>
                          <td>{contact.studentNumber}</td>
                          <td>{contact.port1}</td>
                          <td>{contact.port2}</td>
                        </tr>

                      ))}
                    </table>

                    <hr className="my-4" />


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// GetPort.PropTypes = {
//   contact: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
  contacts: state.contacts
})


export default connect(mapStateToProps, { getContacts })(GetPort);