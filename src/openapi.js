import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
  organization: process.env.ORGANIZATION_ID
})

const openApi = new OpenAIApi(config);

export { openApi };