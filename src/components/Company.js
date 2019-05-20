import React, { Component } from "react";
import { connect } from "react-redux";
import {
  eraseCompany,
  editCompany,
  openModal
} from "../actions/companyActions";

import "../App.css";

class Company extends Component {
  statusColor = status => {
    switch (status) {
      case "approved":
        return "status-green";
      case "pending approval":
        return "status-orange";
      case "declined":
        return "status-red";
      default:
        return "";
    }
  };
  render() {
    return (
      <div style={styles.container}>
        {this.props.companies.map((company, index) => (
          <div key={company.id}>
            <h1 style={styles.elementBottomPad}>{company.companyName}</h1>
            <div style={styles.elementBottomPad}>
              <p style={styles.textContainer}>{company.companyInfo}</p>
              <p style={styles.textContainer}>
                <span className="bold-span">HR Contacts:</span>{" "}
                {company.keyContacts}
              </p>
              <p style={styles.textContainer}>
                <span className="bold-span">Status:</span>{" "}
                <span className={this.statusColor(company.status)}>
                  {company.status}
                </span>
              </p>
              <p style={styles.textContainer}>
                <span className="bold-span">Financial Performance: </span>
                <i
                  className="fas fa-clipboard icon-report"
                  onClick={() =>
                    this.props.openModal({ id: company.id, name: "report" })
                  }
                />
              </p>
            </div>
            <div className="icons">
              <i
                className="fas fa-trash-alt icon"
                onClick={() => this.props.eraseCompany(company.id)}
              />
              <i
                className="fas fa-user-edit icon"
                onClick={() =>
                  this.props.openModal({ id: company.id, name: "edit" })
                }
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    companies: state.input.company
  };
};

export default connect(
  mapStateToProps,
  { eraseCompany, editCompany, openModal }
)(Company);

const styles = {
  container: {
    width: "50%",
    padding: 10,
    margin: 10
  },
  textContainer: {
    textAlign: "left",
    fontSize: 18,
    lineHeight: 1.7
  },
  elementBottomPad: {
    paddingBottom: 20
  }
};
