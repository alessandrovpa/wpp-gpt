import { openApi } from './openapi.js';

const getBotResponse = async (clientText) => {
  const options = {
    model: "text-davinci-003", // Modelo GPT a ser usado
    prompt: clientText, // Texto enviado pelo usuário
    temperature: 1, // Nível de variação das respostas geradas, 1 é o máximo
    max_tokens: 4000 // Quantidade de tokens (palavras) a serem retornadas pelo bot, 4000 é o máximo
  }

  try{
    const response = await openApi.createCompletion(options);
    let botResponse = "";
    response.data.choices.forEach(({text}) => {
      botResponse+=text;
    });
    return `Bot Jorge: \n${botResponse.trim()}`;
  }
  catch(e) {
    return `ERROR: ${e.response.data.error.message}`;
  }
}

export { getBotResponse };