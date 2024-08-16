const MongoClient = require('mongodb');
const url = 'mongodb+srv://bennyxu:T3eL8KOMydkKc6Ya@cluster0.h4t5cmh.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient.MongoClient(url);

const translate = require('./src/translate.js');

async function find_or_store(long_url) {
    try {

        const database = client.db('Cluster0');
        const collection = database.collection('urls');

        var query = { long_url: long_url }
        var result = await collection.findOne(query);

        if (result) { // website already stored in database

            var short_url = translate.hex_to_url(result._id.toString('hex'));
            return short_url;

        } else { // new website

            var website = { long_url: long_url };
            var obj = await collection.insertOne(website);
            var short_url = translate.hex_to_url(obj.insertedId.toString('hex'));
            return short_url;

        }
    } finally {
        await client.close();
    }
}

exports.find_or_store = find_or_store;
