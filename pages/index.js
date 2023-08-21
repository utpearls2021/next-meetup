import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Next Meetup</title>
        <meta name="description" content="Huge next js meetups for all users "/>
        <meta name="keywords" content="Meetup, Next, Mongodb, Head tag"/>
        <meta name="author" content="Utdev"/>
      </Head>
      <MeetupList meetups={ props.meetups }/>
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect("mongodb+srv://utpearls2021:WUV8IH9AcMb4lUXt@cluster0.bygef7z.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();
  const foramttedMeetup = meetups.map((meetup) => {
   return {
    id: meetup._id.toString(),
    title: meetup.title,
    image: meetup.image,
    description: meetup.description,
    address: meetup.address
   }
  })
  return { props: { meetups: foramttedMeetup }, revalidate: 1 };
}

// export async function getServerSideProps(context) {
// }
export default HomePage;