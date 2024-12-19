import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@astrajs/collections';

console.log('Database ID:', process.env.ASTRA_DB_ID);
console.log('Database Region:', process.env.ASTRA_DB_REGION);

const client = createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
    baseUrl: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com`,
});

// Correct way to get a collection
export const getCollection = async (collectionName) => {
    const collection = client.collection('default_keyspace', collectionName); // Use the collectionName parameter
    return collection;
};

export const getRecipesCollection = async () => {
    return await getCollection('recipes'); // Access the 'recipes' collection directly
};
