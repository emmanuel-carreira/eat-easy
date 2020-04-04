const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const user = await connection('user').select('*');
    
        return response.json(user);
    },

    async create(request, response){
        const { username, password, email, active } = request.body;

        try { 
            await connection('user').insert({
                username,
                password,
                email,
                active
            })
        } catch (exception) {
            console.log('Exception: ' + exception);
            return response.status(400).send();
        }

        return response.status(200).send();
    },

    async delete(request, response){
        const { id } = request.params;

        try { 
            await connection('user').where('id', '=' , id).update({
                active : false
            }) 
        } catch (exception) {
            console.log('Exception: ' + exception);
            return response.status(400).send();
        }
        
        return response.status(200).send();
    }
}   
