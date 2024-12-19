import { createClient } from '@astrajs/collections';
import dotenv from 'dotenv';
dotenv.config();

console.log('Database ID:', process.env.ASTRA_DB_ID);
console.log('Database Region:', process.env.ASTRA_DB_REGION);

const client = createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
    baseUrl: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com`,
});

export const getCollection = async (collectionName) => {
    const collection = client
        .keyspace('recipes')
        .collection(collectionName);
    return collection;
};
