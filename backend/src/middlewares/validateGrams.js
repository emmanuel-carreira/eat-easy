function validateGrams(request, response, next) {
  const { grams, protein, carbohydrates, fats } = request.body;
  const isValid = parseFloat(grams) >= parseFloat(protein) + parseFloat(carbohydrates) + parseFloat(fats);

  if(isValid) return next();

  return response.status(400).send();
}

module.exports = validateGrams;
