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
} from "./types";

export const nameInput = input => {
  return { type: NAME_INPUT, payload: input };
};

export const infoInput = input => {
  return { type: INFO_INPUT, payload: input };
};

export const contactInput = input => {
  return { type: CONTACT_INPUT, payload: input };
};

export const revenueInput = input => {
  return { type: REVENUE_CONTACT, payload: input };
};

export const selectStatus = input => {
  return { type: SELECT_STATUS, payload: input };
};

export const addCompany = (
  e,
  company,
  name,
  info,
  contact,
  revenue,
  status
) => {
  e.preventDefault();
  const newCompany = {
    id: company.length,
    companyName: name,
    status: status,
    companyInfo: info,
    keyContacts: contact,
    financialPerformance: revenue
  };
  const nCompany = company.concat(newCompany);
  return { type: ADD_COMPANY, payload: nCompany };
};

export const eraseCompany = id => {
  return {
    type: ERASE_COMPANY,
    payload: id
  };
};

export const editCompany = (e, id) => {
  e.preventDefault();
  return { type: EDIT_COMPANY, payload: id };
};

export const openModal = ({ id, name }) => {
  return { type: OPEN_MODAL, payload: { id, name } };
};

export const closeModal = ({ event, close }) => {
  event.preventDefault();
  return { type: CLOSE_MODAL, payload: { close } };
};

//modal inputs
export const mNameInput = input => {
  return { type: M_NAME_INPUT, payload: input };
};

export const mInfoInput = input => {
  return { type: M_INFO_INPUT, payload: input };
};
export const mContactInput = input => {
  return { type: M_CONTACT_INPUT, payload: input };
};
