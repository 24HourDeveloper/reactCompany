import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import {
  closeModal,
  editCompany,
  mNameInput,
  mInfoInput,
  mContactInput,
  selectStatus
} from "../actions/companyActions";

import "../App.css";

class Modal extends Component {
  renderModal = () => {
    if (this.props.modalName === "report") {
      return (
        <div
          style={styles.container}
          className={this.props.isOpen ? "open" : "close"}
        >
          <div className="edit-modal">
            <h1 style={styles.titlebottomPad}>Company Dashboard</h1>
            <Bar
              data={{
                labels: ["2016", "2017", "2018"],
                datasets: [
                  {
                    label: "Revenue Total Each Year",
                    data: [3000, 9901, 1700],
                    backgroundColor: ["#2785C3", "#2785C3", "#2785C3"]
                  }
                ]
              }}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true
                      }
                    }
                  ]
                }
              }}
            />
            <button
              className="buttonForm"
              onClick={e => this.props.closeModal({ event: e, close: false })}
            >
              Close
            </button>
          </div>
        </div>
      );
    } else if (this.props.modalName === "edit") {
      return (
        <div
          style={styles.container}
          className={this.props.isOpen ? "open" : "close"}
        >
          <div className="edit-modal">
            <h1 style={styles.titlebottomPad}>Company Dashboard</h1>
            <form>
              <input
                className="inputStyle"
                type="text"
                placeholder="Company Name"
                name="mName"
                value={this.props.mName}
                onChange={text => this.props.mNameInput(text.target.value)}
              />
              <br />
              <input
                className="inputStyle"
                type="text"
                placeholder="Company Info"
                name="info"
                value={this.props.mInfo}
                onChange={text => this.props.mInfoInput(text.target.value)}
              />
              <br />
              <input
                className="inputStyle"
                type="text"
                placeholder="Company Contact"
                name="contact"
                value={this.props.mContact}
                onChange={text => this.props.mContactInput(text.target.value)}
              />
              <br />
              <div style={styles.statusContainer}>
                <p style={styles.statusStyle}>Status: </p>
                <select
                  style={styles.dropdownStyle}
                  onChange={selection =>
                    this.props.selectStatus(selection.target.value)
                  }
                >
                  {this.props.status.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </div>
              <button
                className="buttonForm"
                onClick={e => this.props.editCompany(e, this.props.id)}
              >
                Update Company
              </button>
              <br />
              <button
                className="buttonForm"
                onClick={e => this.props.closeModal({ event: e, close: false })}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      );
    }
    return null;
  };

  render() {
    console.log(this.props.name);
    return this.renderModal();
  }
}

const mapStateToProps = state => {
  return {
    company: state.input.company,
    isOpen: state.input.isOpen,
    modalName: state.input.modalName,
    id: state.input.id,
    mName: state.input.mName,
    mInfo: state.input.mInfo,
    mContact: state.input.mContact,
    status: state.input.status
  };
};

export default connect(
  mapStateToProps,
  {
    closeModal,
    editCompany,
    mNameInput,
    mInfoInput,
    mContactInput,
    selectStatus
  }
)(Modal);

const styles = {
  container: {
    backgroundColor: "rgb(33, 141, 212, .3)",
    position: "fixed",
    top: 0,
    bottom: 0,
    width: "70%",
    paddingTop: "10%",
    paddingLeft: "20%"
  },
  titlebottomPad: { marginBottom: 20 },
  statusContainer: {
    display: "flex",
    width: "100%",
    fontSize: 18
  },
  dropdownStyle: {
    width: "50%",
    padding: 10,
    fontSize: 18,
    borderWidth: 0.5,
    borderColor: "#000",
    marginBottom: 20
  },
  statusStyle: { width: "35%", padding: 10 }
};
