import { create } from 'venom-bot';
import * as dotenv from 'dotenv';
import { getBotResponse } from './botResponse.js';
import { getImageResponse } from './imageResponse.js';

dotenv.config();

create({session: 'chat-gpt', multidevice: true})
  .then((client) => {start(client)})
  .catch((error) => console.log(error));

const commands = (client, message) => {
  const iaCommands = {
    davinci3: '/bot',
    dalle: '/img'
  }

  let firstWord = message.text.substring(0, message.text.indexOf(" "));
  switch(firstWord){
    case iaCommands.davinci3:
      const question = message.text.substring(message.text.indexOf(" "));
      getBotResponse(question).then((response) => {
        client.sendText(message.from === process.env.PHONE_NUMBER ? message.to : message.from, response)
      })
      break;
    
    case iaCommands.dalle:
      const imgDescription = message.text.substring(message.text.indexOf(" "));
      getImageResponse(imgDescription, message).then((response) => {
        client.sendImage(
          message.from === process.env.PHONE_NUMBER ? message.to : message.from,
          response,
          imgDescription,
          ''
        )
      })
      break;
  }
}

async function start(client){
  client.onAnyMessage((message) => {
    if(message.from===process.env.PHONE_NUMBER) {
      commands(client, message);
    }
  })
}