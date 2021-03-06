const validationRules = {
  nameField: [
    input => /^[a-zA-Z]{3,}$/.test(input) || 'O nome deve conter pelo menos 3 letras'
  ],
  cpfField: [
    input => /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/.test(input) || 'CPF Inválido'
  ],
  registerField: [
    input => /^\d{4}$/.test(input) || 'A matrícula deve conter 4 dígitos'
  ],
  passField: [
    input => /^\d{4,}$/.test(input) || 'A senha deve conter pelo menos 4 dígitos'
  ],
  rfidField: [
    input => /^[a-zA-Z0-9]{8}$/.test(input) || 'O RFID não é válido'
  ],
  productNameField: [
    input => /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{2,}$/.test(input) || 'Nome de produto inválido'
  ],
  valueField: [
    input => /^[0-9.]{1,}$/.test(input) || 'Valor do produto inválido'
  ]
}

export default validationRules
