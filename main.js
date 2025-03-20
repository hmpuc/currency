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
    const api = `https://v6.exchangerate-api.com/v6/a006125ed4c025d1dc51bc2f/pair/${currencyInput}/${currencyOutput}`;
    await fetch(api).then((response) => response.json()).then((data) => dados = data )
    const currency = currencyInput.concat(currencyOutput);
    try {
      moneyOutput = (money * dados.conversion_rate).toLocaleString('pt-BR', { style: "currency", currency: currencyOutput, maximumFractionDigits: 2, minimumFractionDigits: 2 })
    } catch (error) {
      moneyOutput = (money * dados.conversion_rate).toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    }
    if (money * dados.conversion_rate <= 0.1) moneyOutput = (money * dados.conversion_rate).toLocaleString('pt-BR', { style: 'currency', currency: currencyOutput, maximumFractionDigits: 6})
  }
  document.getElementById("moneyOutput").innerHTML = moneyOutput;
};

document.getElementById("moneyInput").onkeydown = async function(e) {
  if (e.key === 'Enter') {
    await processMoney();
  }
};

document.querySelector("button[data-type=converter]") = async function(e) {
  await processMoney();
};