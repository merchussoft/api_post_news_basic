const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const sendMessageTelegramApi = (data = {}) => {
    // Enviar la solicitud POST a la API de Telegram
    axios.post(`${process.env.URL_API_TELEGRAM}bot${process.env.BOT_TOKEN_TELEGRAM}/sendPhoto`, {
        chat_id: process.env.CHAT_ID_BOT_TELEGRAM,
        photo: data.url_image,
        caption: `<strong>${data.title}</strong> <a href='${data.leermas}'>Leer más >></a>`,
        parse_mode: 'HTML'
    })
        .catch((error) => {
            console.error('Error al enviar el mensaje y la imagen:', error);
        });
}


module.exports = {
    sendMessageTelegramApi
}