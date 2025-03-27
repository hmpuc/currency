async function processMoney(){ 

    const currencyInput = document.getElementById('currencyInput').value
    const currencyOutput = document.getElementById('currencyOutput').value 
    const moneyInput = document.getElementById('moneyInput').value;
    let money = parseFloat(moneyInput.replace(',','.'));
    let moneyOutput;
    
    if (!moneyInput) {
      money = 0;
    }
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
    return moneyOutput;
  };
    
  async function processFlag() {
    
    const value = document.getElementById('currencyOutput').value;
    const countryCode = document.getElementById('currencyOutput').querySelector(`option[value=${value}]`).getAttribute("data-country");
    let imageUrl;
    const apiUrl = `https://api.api-ninjas.com/v1/countryflag?country=${countryCode}`
    await fetch(apiUrl, { method: 'GET', headers: { 'X-Api-Key': 'qIlgw54fbjCvqxB1YFp0qg==QQybneFRQ2BH2F3y'}})
      .then(response => response.json())
      .then(data => { imageUrl = data.square_image_url })
      .catch(error => {
        console.error(error);
        return;
      });
      
    return imageUrl;
  }
    
  async function processClick() {
    const flagUrl = await processFlag();
    const money = await processMoney();
  
    const image = document.getElementById('imageResult');
    image.src = flagUrl;
  
    document.getElementById("moneyOutput").innerHTML = money;
  }
    
  document.getElementById("moneyInput").onkeydown = async function(e) {
    if (e.key === 'Enter') {
      const flagUrl = await processFlag();
      const money = await processMoney();
  
      const image = document.getElementById('imageResult');
      image.src = flagUrl;
  
      document.getElementById("moneyOutput").innerHTML = money;
    }
  };
    
  document.addEventListener("DOMContentLoaded", async function() {
      
    const flagUrl = await processFlag();
    const money = await processMoney();
  
    const image = document.getElementById('imageResult');
    image.src = flagUrl;
  
    document.getElementById("moneyOutput").innerHTML = money;
  });
    
    
      