const currencyInput = 'USD';
const currencyOutput = 'BRL';
const moneyInput = `10921509,87434`;
const money = parseFloat(moneyInput.replace(',','.'));
let moneyOutput;

(async() => { 
  if (currencyInput == currencyOutput) {
    moneyOutput = moneyInput
  } else {
    let dados; 
    const api = `https://economia.awesomeapi.com.br/json/last/${currencyInput}-${currencyOutput}?token=14847feade291f1c1e5632b53ee447d8b3da1dbf65f8171ddf2f1edf4cdc2100`;
    await fetch(api).then((response) => response.json()).then((data) => dados = data)
    const currency = currencyInput.concat(currencyOutput);
    moneyOutput = (money * dados[currency].ask).toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  }
  console.log(moneyOutput)
})();