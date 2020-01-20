import { resolve } from 'path';
import { config } from 'dotenv';
const environment = `./env/${process.env.NODE_ENV}`.trim();
config({ path: resolve(__dirname, environment) });
