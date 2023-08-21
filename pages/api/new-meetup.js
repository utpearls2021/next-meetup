import { MongoClient } from "mongodb";

async function handler(req, res) {
  try {
    console.log("req.body", req.body);

    if(req.method === "POST") {

      const client = await MongoClient.connect("mongodb+srv://utpearls2021:WUV8IH9AcMb4lUXt@cluster0.bygef7z.mongodb.net/meetups?retryWrites=true&w=majority");
      const db = client.db();

      const meetupCollection = db.collection("meetups");
      const result = await meetupCollection.insertOne(JSON.parse(req.body));
      console.log("insert", result);
      if (result) {
        client.close();
        res.status(200).json(result);
      }

    }
  } catch (ex) {
    console.log("errerer", ex);
  }
}

export default handler;