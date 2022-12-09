const knex = require('../services/connection');

//concluido
const sendMessage = async (req, res) => {
  const { room, sent_by, received_by, message_data, time_sent } = req.body;

  try {
    await knex('message_data')
      .insert({
        sent_by,
        received_by,
        message_data,
        room_id: room,
        time_sent,
      });

    return res.status(201).send();
  } catch (error) {
    console.log(error);
  }
};

//concluido
const getAllContacts = async (req, res) => {
  try {
    const allContacts = await knex('contacts')
      .where({ user_id: req.user.id })
      .returning('*');

    res.status(200).json(allContacts);
  } catch (error) {
    console.log(error);
  }
};

//concluido
const addContact = async (req, res) => {
  const { email } = req.body;

  try {
    if (email === req.user.email) {
      return res.status(404).json({
        message: 'Não foi possível adicionar o contato.',
      });
    }

    const contactToBeAdded = await knex('users').where({ email }).first();

    if (!contactToBeAdded) {
      return res.status(404).json({
        message: 'Nenhum usuário encontrado.',
      });
    }

    const allContacts = req.user.contacts;
    const contactAlreadyExists = allContacts.filter((contact) => {
      return email === contact.email;
    });

    if (contactAlreadyExists.length > 0) {
      return res.status(401).json({ message: 'Contato já adicionado.' });
    }

    const newContact = await knex('contacts')
      .insert({ email, name: contactToBeAdded.name, user_id: req.user.id })
      .returning('*');

    await knex('contacts')
      .insert({
        email: req.user.email,
        name: req.user.name,
        user_id: contactToBeAdded.id,
      })
      .returning('*');

    await knex('conversation_room').insert({
      first_user_email: req.user.email,
      second_user_email: email,
    });

    return res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
  }
};

const getAllConversationData = async (req, res) => {
  const { first_user_email, second_user_email } = req.query;
  
  try {
    const messageData = await knex('message_data')
      .where({
        sent_by: first_user_email,
        received_by: second_user_email,
      })
      .orWhere({ sent_by: second_user_email, received_by: first_user_email })
      .returning('*');

    return res.status(200).json(messageData);
  } catch (error) {
    console.log(error);
  }
};

const getConversationRoom = async (req, res) => {
  const { contact } = req.body;

  try {
    const allChatRooms = await knex('conversation_room')
      .where({
        first_user_email: req.user.email
      })
      .orWhere({
        second_user_email: req.user.email,
      })
      .returning('*');

    return res.status(200).json(allChatRooms);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMessage,
  getAllContacts,
  addContact,
  getAllConversationData,
  getConversationRoom,
};
