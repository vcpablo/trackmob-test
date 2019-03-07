import { validate as validateCPF } from 'gerador-validador-cpf'
import moment from 'moment'

export const validateEmail = (email) => {
  const regexp = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
  return email && regexp.test(email)
}

export const validateCpf = (cpf) => {
  return cpf.length === 14 && validateCPF(cpf)
}

export const validateCreditCardNumber = (value = '') => {
  return value.length === 16
}

export const validateCreditCardValidity = (validity) => {
  return validity && moment(validity).isSameOrAfter(new Date())
}

export const formatCurrency = (value) => {
  return parseFloat(value || '0').toFixed(2).replace('.', ',')
}

export const initialState = () => {
  return {
    donation: {
      recurrence: '',
      value: '',
      accept_contact: false
    },
    donator: {
      first_name: '',
      last_name: '',
      email: ''
    },
    payment: {
      document: '',
      card_number: '',
      validity: '',
      cvv: ''
    }
  }
}
