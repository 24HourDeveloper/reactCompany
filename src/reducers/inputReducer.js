import {
  NAME_INPUT,
  INFO_INPUT,
  CONTACT_INPUT,
  REVENUE_CONTACT,
  SELECT_STATUS,
  ADD_COMPANY,
  ERASE_COMPANY,
  EDIT_COMPANY,
  OPEN_MODAL,
  CLOSE_MODAL,
  M_NAME_INPUT,
  M_INFO_INPUT,
  M_CONTACT_INPUT
} from "../actions/types";
import { companies, status } from "../companies";

const INITIAL_STATE = {
  company: companies,
  id: 0,
  name: "",
  info: "",
  contact: "",
  status: status,
  stat: "researching",
  revenue: "",
  isOpen: false,
  modalName: "",
  mName: "",
  mInfo: "",
  mContact: ""
};

export default (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case NAME_INPUT:
      return { ...state, name: action.payload };
    case INFO_INPUT:
      return { ...state, info: action.payload };
    case CONTACT_INPUT:
      return { ...state, contact: action.payload };
    case REVENUE_CONTACT:
      return { ...state, revenue: action.payload };
    case SELECT_STATUS:
      return { ...state, stat: action.payload };
    case ADD_COMPANY:
      return {
        ...state,
        name: "",
        info: "",
        revenue: [],
        contact: "",
        stat: "researching",
        company: action.payload
      };
    case ERASE_COMPANY:
      return {
        ...state,
        company: state.company.filter(item => item.id !== action.payload)
      };
    case EDIT_COMPANY:
      return {
        ...state,
        company: state.company.map(item => {
          let obj = {
            id: action.payload,
            companyName: state.mName,
            status: state.stat,
            companyInfo: state.mInfo,
            keyContacts: state.mContact,
            financialPerformance: item.financialPerformance
          };
          if (item.id === action.payload) {
            item = obj;
            return item;
          }
          return item;
        }),
        isOpen: false,
        mName: "",
        mInfo: "",
        mContact: ""
      };
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        modalName: action.payload.name,
        id: action.payload.id
      };
    case CLOSE_MODAL:
      return { ...state, isOpen: action.payload.close };
    case M_NAME_INPUT:
      return { ...state, mName: action.payload };
    case M_INFO_INPUT:
      return { ...state, mInfo: action.payload };
    case M_CONTACT_INPUT:
      return { ...state, mContact: action.payload };
    default:
      return state;
  }
};
