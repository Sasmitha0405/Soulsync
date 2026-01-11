export async function fetchSongs(mood) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${mood}+songs&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
  );

  const data = await res.json();

  if (data.error) {
    console.error("YouTube API Error:", data.error);
    return [];
  }

  return data.items || [];
}
