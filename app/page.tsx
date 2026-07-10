import SetlistPlanner from "../components/SetlistPlanner";
import type { Song } from "../types/song";

export default async function Home() {
  const initialSongs: Song[] = [];

  return <SetlistPlanner initialSongs={initialSongs} />;
}
