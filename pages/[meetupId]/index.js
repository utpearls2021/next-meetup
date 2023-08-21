import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetail(props) {
  const { meetup } = props;
  return (
    <section>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description}/>
        <meta name="keywords" content="Meetup, Next, Mongodb, Head tag"/>
        <meta name="author" content="Utdev"/>
      </Head>
      <img style={{width: "100%"}} src={meetup.image}/>
      <h3>{meetup.title}</h3>
      <p>{meetup.address}</p>
      <p>{meetup.description} </p>
    </section>
  )
}

export async function getStaticPaths() {

  const client = await MongoClient.connect("mongodb+srv://utpearls2021:WUV8IH9AcMb4lUXt@cluster0.bygef7z.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString()
      }
    }))
    // paths:[
    //   {
    //     params:{
    //       meetupId: "1"
    //     }
    //   },
    //   {
    //     params:{
    //       meetupId: "next"
    //     }
    //   }
    // ]
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect("mongodb+srv://utpearls2021:WUV8IH9AcMb4lUXt@cluster0.bygef7z.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const singlemeetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId)});
  delete singlemeetup._id;
  client.close();
  return {
    props: {
      meetup: singlemeetup
    }
  }
}

export default MeetupDetail;