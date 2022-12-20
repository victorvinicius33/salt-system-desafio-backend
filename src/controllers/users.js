const knex = require('../services/connection');
const bcrypt = require('bcrypt');

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const emailAlreadyExists = await knex('users').where({ email }).first();

    if (emailAlreadyExists) {
      return res.status(400).json({
        message:
          'O e-mail informado já está sendo utilizado por outro usuário.',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await knex('users')
      .insert({ name, email, password: hashPassword })
      .returning('*');

    if (!newUser) {
      return res
        .status(400)
        .json({ message: 'Não foi possivel cadastrar o usuário.' });
    }

    async function addBotContact() {
      try {
        await knex('contacts').insert({
          email: 'bot@gmail.com',
          name: 'bot',
          user_id: newUser[0].id,
        });

        await knex('contacts').insert({
          email,
          name,
          user_id: 1,
        });

        await knex('conversation_room').insert({
          first_user_email: email,
          second_user_email: 'bot@gmail.com',
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (email !== 'bot@gmail.com') {
      addBotContact();
    }

    const { password: _, ...newUserData } = newUser[0];

    return res.status(201).json(newUserData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detailUser = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  signUpUser,
  detailUser,
};
