<template>
  <section :class="$style.wrapper">
    <!-- Valor -->
    <div :class="$style.section">
      <message type="error" v-if="submitted && !isDonationValid"/>
      <h3 :class="$style.title">Selecione um valor</h3>
      <div :class="$style.group">
        <select :class="[$style.select, submitted && !model.donation.recurrence && $style.inputError]" v-model="model.donation.recurrence">
          <option value="">Selecione</option>
          <option value="Única">Única</option>
          <option value="Mensal">Mensal</option>
          <option value="Semestral">Semestral</option>
          <option value="Anual">Anual</option>
        </select>
        <div :class="$style.inputBox">
          <input type="number" :class="[$style.input, submitted && model.donation.value < 15 && $style.inputError]" placeholder="R$ 30,00" v-model="model.donation.value"/>
          <small :class="$style.help">Valor mínimo de R$ 15,00</small>
        </div>
      </div>
    </div>
    <hr :class="$style.divider" />
    <!-- Dados pessoais -->
    <div :class="$style.section">
      <message type="error" v-if="submitted && !isDonatorValid" />
      <h3 :class="$style.title">Dados pessoais</h3>
      <div :class="$style.group">
        <label :class="[$style.label, submitted && !(this.model.donator.first_name && this.model.donator.last_name) && $style.labelError]">
          Nome completo <span :class="$style.required">*</span>
        </label>
        <div :class="$style.inputGroup">
          <input type="text" :class="[$style.input, submitted && !this.model.donator.first_name && $style.inputError]" placeholder="Primeiro nome" v-model="model.donator.first_name"/>
          <input type="text" :class="[$style.input, submitted && !this.model.donator.last_name && $style.inputError]" placeholder="Sobrenome" v-model="model.donator.last_name"/>
        </div>
      </div>
      <div :class="$style.group">
        <label :class="[$style.label, submitted && !validateEmail(model.donator.email) && $style.labelError]">
          Email <span :class="$style.required">*</span>
        </label>
        <div :class="$style.inputGroup">
          <input type="text" :class="[$style.input, submitted && !validateEmail(model.donator.email) && $style.inputError]" placeholder="email@email.com" v-model="model.donator.email"/>
        </div>
      </div>
    </div>
    <!-- Dados de pagamento -->
    <hr :class="$style.divider" />
    <div :class="$style.section">
      <message type="error" v-if="submitted && !isPaymentValid" />
      <h3 :class="$style.title">
        Dados de pagamento
        <span :class="$style.badge">
          <font-awesome-icon :icon="['fa', 'lock']" :class="$style.icon"/>
          DADOS SEGUROS
        </span>
      </h3>
      <div :class="$style.group">
        <label :class="[$style.label, submitted && !this.validateCpf(this.model.payment.document) && $style.labelError]">
          CPF <span :class="$style.required">*</span>
        </label>
        <div :class="$style.inputGroup">
          <input type="text" maxlength="14" minlength="14" :class="[$style.input, submitted && !this.validateCpf(this.model.payment.document) && $style.inputError]" placeholder="000.000.000-00" v-model="model.payment.document"/>
        </div>
      </div>
      <div :class="$style.group">
        <label :class="[$style.label, submitted && (!this.validateCreditCardNumber(this.model.payment.card_number) || this.model.payment.cvv.length !== 3) && $style.labelError]">
          Número de cartão <span :class="$style.required">*</span>
        </label>
        <div :class="$style.inputGroup">
          <input type="text" maxlength="16" minlength="16" :class="[$style.input, $style.flexLarge, submitted && !this.validateCreditCardNumber(this.model.payment.card_number) && $style.inputError]" placeholder="0000 0000 0000 0000" v-model="model.payment.card_number"/>
          <input type="text" maxlength="3" minlength="3" :class="[$style.input, $style.flexSmall, submitted && this.model.payment.cvv.length !== 3 && $style.inputError]" placeholder="CVV" v-model="model.payment.cvv"/>
        </div>
      </div>
      <div :class="$style.group">
        <label :class="[$style.label, submitted && !this.validateCreditCardValidity(this.model.payment.validity) && $style.labelError]">
          Validade do cartão <span :class="$style.required">*</span>
        </label>
        <div :class="$style.inputGroup">
          <input type="date" :class="[$style.input, submitted && !this.validateCreditCardValidity(this.model.payment.validity) && $style.inputError]" placeholder="00/00/0000" v-model="model.payment.validity"/>
        </div>
      </div>
    </div>
    <hr :class="$style.divider" />
    <!-- Enviar -->
    <div :class="$style.footer">
      <div :class="$style.value">{{ recurrenceLabel }}</div>
      <div :class="$style.buttonWrapper">
        <button type="button" :class="$style.confirmButton" @click="submit" :disabled="submitting">
          <span v-if="!submitting">Confirmar doação</span>
          <span v-if="submitting">Aguarde...</span>
        </button>
        <div :class="$style.termsWrapper">
          <input type="checkbox" :class="$style.termsCheckbox" v-model="model.donation.accept_contact"/> <span :class="$style.termsText">Aceito ser contatado para recer informações sobre a ONG</span>
        </div>
        <message :type="result" v-if="result"/>

      </div>
    </div>
  </section>
</template>

<script>
import Message from './Message'
import { initialState, validateEmail, validateCpf, validateCreditCardNumber, validateCreditCardValidity, formatCurrency } from '../lib/utils'
import moment from 'moment'
import axios from 'axios'

export default {
  components: {
    Message
  },
  data () {
    return {
      submitted: false,
      submitting: false,
      result: null,
      model: initialState()
    }
  },

  computed: {
    isDonationValid () {
      return this.model.donation.recurrence && this.model.donation.value && this.model.donation.value >= 15
    },
    isDonatorValid () {
      return this.model.donator.first_name && this.model.donator.last_name && this.validateEmail(this.model.donator.email)
    },
    isPaymentValid () {
      return this.validateCpf(this.model.payment.document) && this.validateCreditCardNumber(this.model.payment.card_number) && this.model.payment.cvv.length === 3 && this.validateCreditCardValidity(this.model.payment.validity)
    },
    isValid () {
      return this.isDonationValid && this.isDonatorValid && this.isPaymentValid
    },
    completeName () {
      return `${this.model.donator.first_name} ${this.model.donator.last_name}`
    },
    recurrenceLabel () {
      let recurrence = ''

      switch (this.model.donation.recurrence) {
        case 'Única':
          recurrence = 'uma vez'
          break
        case 'Mensal':
          recurrence = 'mensais'
          break
        case 'Semestral':
          recurrence = 'semestrais'
          break
        case 'Anual':
          recurrence = 'anuais'
          break
      }
      const value = this.model.donation.value && parseFloat(this.model.donation.value).toFixed(2)

      return (value && recurrence) ? `R$ ${value.toString().replace('.', ',')} ${recurrence}` : ''
    }
  },

  methods: {
    validateEmail,
    validateCpf,
    validateCreditCardNumber,
    validateCreditCardValidity,
    formatCurrency,
    submit () {
      const data = {
        recurrence: this.model.donation.recurrence,
        value: `R$${this.formatCurrency(this.model.donation.value)}`,
        complete_name: this.completeName,
        first_name: this.model.donator.first_name,
        last_name: this.model.donator.last_name,
        email: this.model.donator.email,
        document: this.model.payment.document,
        card_number: this.model.payment.card_number,
        cvv: this.model.payment.cvv,
        validity: moment(this.model.payment.validity).format('MM/YYYY'),
        accept_contact: this.model.donation.accept_contact
      }

      this.submitted = true
      if (this.isValid) {
        this.submitting = true
        axios.post(process.env.API_URL, data).then((res) => {
          this.result = 'success'
        }).catch(() => {
          this.result = 'error'
        }).then(() => {
          this.submitted = false
          this.submitting = false
          this.model = initialState()

          setTimeout(() => {
            this.result = null
          }, 5000)
        })
      }
    }
  }
}
</script>

<style lang="scss" module>
  .wrapper {
    background-color: $white;
    position: absolute;
    left: 25vw;
    width: 55vw;
    top: 70vh;

    .section {
      padding: 45px;

      .title {
        margin: 0;
        color: $dark-text;
        font-size: 24px;
        font-weight: bold;
      }

      .group {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 40px;

        .select {
          flex: 1;
          margin-right: 20px;
          height: 40px;
          width: 157px;
          font-size: 16px;
          color: $dark-text;
          border: 1px solid $primary-border;
          border-radius: 2px;
        }
      }

      .label {
        font-size: 16px;
        color: $input-placeholder-color;
        flex: 1;
      }

      .required {
        color: $danger;
      }

      .inputGroup {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        flex: 3;

        .input {
          margin-left: 15px;
        }
      }

      .input {
        font-style: italic;
        height: 40px;
        border: 1px solid $primary-border;
        width: 100%;
        background-color: $input-bg;
        font-size: 14px;
        padding-left: 12px;
        border-radius: 3px;
        font-family: 'Roboto';
      }

      .flexLarge {
        flex: 3;
      }

      .flexSmall {
        flex: 1;
      }

      .help {
        color: $help-text-color;
      }

      ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: $input-placeholder-color;
      }
      ::-moz-placeholder { /* Firefox 19+ */
        color: $input-placeholder-color;
      }
      :-ms-input-placeholder { /* IE 10+ */
        color: $input-placeholder-color;
      }
      :-moz-placeholder { /* Firefox 18- */
        color: $input-placeholder-color;
      }
    }

    .inputError {
      border-color: $danger !important;
    }

    .labelError {
      color: $danger !important;
    }

    .divider {
      border-top: 1px solid $secondary-border;
    }

    .inputBox {
      padding: 25px;
      background-color: $light-bg;
      flex: 4;
    }

    .badge {
      color: $medium-text;
      font-size: 10px;
      background-color: $light-bg;
      padding: 5px;
      border-radius: 3px;
    }

    .footer {
      display: flex;
      background-color: $light-bg;
      padding: 30px 40px;

      .value {
        font-weight: bold;
        flex: 1;
        $color: $dark-text;
      }

      .buttonWrapper {
        flex: 3;
        display: flex;
        flex-direction: column;

        .confirmButton {
          width: fit-content;
          padding: 15px 20px;
          background-color: $warning;
          font-size: 20px;
          font-weight: bold;
          color: $white;
          border: 1px solid $warning;
          border-radius: 3px;
        }
      }

      .termsWrapper {
        margin-top :15px;
        display: flex;
        align-items: center;

        .termsCheckbox {
          font-size: 18px;
        }

        .termsText {
          font-size: 14px;
          color: $help-text-color;
          margin-left: 5px;
        }
      }
    }

    .donationSuccess {
      width: 100%;
    }
  }
</style>
