let calculateService = {
  calculateTvaAmount : calculateTvaAmount
}


function calculateTvaAmount(interventions){
  let result = 0;
  interventions.forEach(intervention => {
    result += (intervention.priceHT * parseInt(intervention.tva))/100
  })
  return result;
}

module.exports = calculateService;
