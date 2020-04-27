const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { grams, protein, carbohydrates, fats } = request.body;

    try {
      const calories = fats*9 + (protein + carbohydrates)*4;
      await connection('ingredient').insert({ grams, calories, protein, carbohydrates, fats });
    } catch (exception) {
      console.log('Exception: ' + exception);
      return response.status(400).send();
    }

    return response.status(201).send();
  },
}
