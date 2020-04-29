const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { grams, protein, carbohydrates, fats } = request.body;

    try {
      const calories = parseFloat(fats)*9 + (parseFloat(protein) + parseFloat(carbohydrates))*4;
      await connection('ingredient').insert({ grams, calories, protein, carbohydrates, fats });
    } catch (exception) {
      console.log('Exception: ' + exception);
      return response.status(400).send();
    }

    return response.status(201).send();
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await connection('ingredient').where('id', id).del();
    } catch (exception) {
      console.log('Exception: ' + exception);
      return response.status(400).send();
    }

    return response.status(204).send();
  },

  async update(request, response) {
    const { id } = request.params;
    const { grams, protein, carbohydrates, fats } = request.body;

    try {
      const calories = parseFloat(fats)*9 + (parseFloat(protein) + parseFloat(carbohydrates))*4;
      await connection('ingredient').where('id', id).update({ grams, calories, protein, carbohydrates, fats });
    } catch (exception) {
      console.log('Exception: ' + exception);
      return response.status(400).send();
    }

    return response.status(204).send();
  },

  async index(request, response) {
    const { id } = request.params;

    try {
      const ingredient = await connection('ingredient').select('*').where('id', id);
      return response.json(ingredient[0]);
    } catch (exception) {
      console.log('Exception: ' + exception);
      return response.status(400).send();
    }
  },

  async list(request, response) {
    const { page = 1 } = request.query;

    const ingredients = await connection('ingredient')
      .select('*')
      .limit(10)
      .offset((page - 1) * 10);

    const [countObject] = await connection('ingredient').count();
    response.header('X-Total-Count', countObject['count(*)']);

    return response.json(ingredients);
  }
}
