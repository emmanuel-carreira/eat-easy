const connection = require('../database/connection');

module.exports = {
  async create (request, response) {
    const { userId, quantity, date } = request.body;

    try {
      await connection('water').insert({ userId, quantity, date })
    } catch (exception) {
      console.log('Exception: ' + exception);
      return response.status(400).send();
    }

    return response.status(201).send();
  },

  async delete (request, response) {
    const { id } = request.params;

    try {
      await connection('water').where('id', id).del();
    } catch (exception) {
      console.log('Exception: ' + exception);
      return response.status(400).send();
    }

    return response.status(204).send();
  },

  async index (request, response) {
    const { userId, startDate, endDate } = request.query;
    const waterEntries = await connection('water')
      .select('id', 'quantity', 'date')
      .where('userId', userId)
      .andWhere('date', '>=', startDate)
      .andWhere('date', '<=', endDate);

    return response.json(waterEntries);
  }
}
