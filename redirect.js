const MongoClient = require('mongodb');
const url = 'mongodb+srv://bennyxu:T3eL8KOMydkKc6Ya@cluster0.h4t5cmh.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient.MongoClient(url);

async function get_url(id) {
    try {
        const database = client.db('Cluster0');
        const collection = database.collection('urls');

        var query = { _id: new MongoClient.ObjectId(id) };
        var result = await collection.findOne(query);

        if (result) {
            return result.long_url;
        } else {
            return '!';
        }

    } finally {
        await client.close();
    }
}

exports.get_url = get_url;
