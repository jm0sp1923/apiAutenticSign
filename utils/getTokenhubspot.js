import "dotenv/config";
import pkg from 'request-promise-native';
const { post } = pkg;

import fs from 'fs';
import { join } from 'path';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN_PATH = join(__dirname, '../tokens.json');


const CLIENT_ID = process.env.CLIENT_ID_HUBSPOT;
const CLIENT_SECRET = process.env.CLIENT_SECRET_HUBSPOT;

console.log(CLIENT_ID, CLIENT_SECRET);

const data = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));

const refreshAccessToken = async () => {
    
    const refreshTokenProof = {
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: data.refresh_token
    };
  
    try {
      const responseBody = await post('https://api.hubapi.com/oauth/v1/token', { form: refreshTokenProof });
      const tokens = JSON.parse(responseBody);

      return tokens.access_token;
    } catch (e) {
      console.error('❌ Error refreshing access token:', e.message);
      process.exit(1);
    }
  };


export default refreshAccessToken;