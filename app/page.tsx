import SetlistPlanner from "../components/SetlistPlanner";
import { getSongs } from "./actions/songActions";

export default async function Home() {
  const initialSongs = await getSongs();

  return <SetlistPlanner initialSongs={initialSongs} />;
}
