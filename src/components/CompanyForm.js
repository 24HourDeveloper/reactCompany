import React, { Component } from "react";
import { connect } from "react-redux";

import {
  nameInput,
  infoInput,
  contactInput,
  revenueInput,
  selectStatus,
  addCompany
} from "../actions/companyActions";
import Modal from "./Modal";
import Company from "./Company";
import "../App.css";

class CompanyForm extends Component {
  render() {
    const {
      companies,
      name,
      info,
      contact,
      revenue,
      status,
      stat
    } = this.props;
    return (
      <>
        <div style={styles.container}>
          <h1 style={styles.bottomPad}>Company Dashboard</h1>
          <form>
            <input
              className="inputStyle"
              type="text"
              placeholder="Company Name"
              name="name"
              value={name}
              onChange={text => this.props.nameInput(text.target.value)}
            />
            <br />
            <textarea
              className="inputStyle"
              placeholder="Company Info"
              name="info"
              value={info}
              onChange={text => this.props.infoInput(text.target.value)}
            />
            <br />
            <input
              className="inputStyle"
              type="text"
              placeholder="Company Contact"
              name="contact"
              value={contact}
              onChange={text => this.props.contactInput(text.target.value)}
            />
            <br />
            <input
              className="inputStyle"
              type="text"
              placeholder="Enter Last 3 Years Separated By Comma"
              name="revenue"
              onChange={text =>
                this.props.revenueInput(
                  text.target.value.split(",").map(Number)
                )
              }
            />
            <br />
            <div style={styles.dropdownStyle}>
              <p style={styles.statusStyle}>Status: </p>
              <select
                style={styles.dropdown}
                onChange={selection =>
                  this.props.selectStatus(selection.target.value)
                }
              >
                {status.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </div>
            <button
              className="buttonForm"
              onClick={e =>
                this.props.addCompany(
                  e,
                  companies,
                  name,
                  info,
                  contact,
                  revenue,
                  stat
                )
              }
            >
              Add Company
            </button>
            <br />
          </form>
        </div>
        <Company />
        <Modal />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    companies: state.input.company,
    name: state.input.name,
    info: state.input.info,
    contact: state.input.contact,
    revenue: state.input.revenue,
    status: state.input.status,
    stat: state.input.stat
  };
};

export default connect(
  mapStateToProps,
  { nameInput, infoInput, contactInput, revenueInput, selectStatus, addCompany }
)(CompanyForm);

const styles = {
  container: {
    width: "50%",
    padding: 10,
    borderRightStyle: "solid",
    borderRightColor: "#000",
    borderRightWidth: 1,
    backgroundColor: "#A7AAAD"
  },
  bottomPad: { marginBottom: 20 },
  dropdownStyle: {
    display: "flex",
    width: "100%",
    fontSize: 18
  },
  statusStyle: { width: "35%", padding: 10 },
  dropdown: {
    width: "50%",
    padding: 10,
    fontSize: 18,
    borderWidth: 0.5,
    borderColor: "#000",
    marginBottom: 20
  }
};
