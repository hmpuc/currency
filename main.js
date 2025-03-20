async function processMoney(){ 

  const currencyInput = document.getElementById('currencyInput').value
  const currencyOutput = document.getElementById('currencyOutput').value 
  const moneyInput = document.getElementById('moneyInput').value;
  const money = parseFloat(moneyInput.replace(',','.'));
  let moneyOutput;

  if (currencyInput == currencyOutput) {
    try {
      moneyOutput = money.toLocaleString('pt-BR', { style: "currency", currency: currencyOutput, maximumFractionDigits: 2, minimumFractionDigits: 2 })
    } catch (error) {
      moneyOutput = money.toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    }
  } else {
    let dados; 
    const api = `https://economia.awesomeapi.com.br/json/last/${currencyInput}-${currencyOutput}?token=14847feade291f1c1e5632b53ee447d8b3da1dbf65f8171ddf2f1edf4cdc2100`;
    await fetch(api).then((response) => response.json()).then((data) => dados = data )
    const currency = currencyInput.concat(currencyOutput);
    try {
      moneyOutput = (money * dados[currency].ask).toLocaleString('pt-BR', { style: "currency", currency: currencyOutput, maximumFractionDigits: 2, minimumFractionDigits: 2 })
    } catch (error) {
      moneyOutput = (money * dados[currency].ask).toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    }
  }
  document.getElementById("moneyOutput").innerHTML = moneyOutput;
};

document.getElementById("moneyInput").onkeydown = async function(e) {
  if (e.key === 'Enter') {
    await processMoney();
  }
}

document.querySelector("button[data-type=converter]") = async function(e) {
  await processMoney();
}