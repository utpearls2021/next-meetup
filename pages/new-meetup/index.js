import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

export default function Meetup() {
  const router = useRouter();
  async function handleMeetupAdd(value) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        contentType: "application/json"
      }
    });

    const data = await response.json();
    console.log("data",data);
    router.push("/");
  }
  return <NewMeetupForm onAddMeetup={handleMeetupAdd}/>
}