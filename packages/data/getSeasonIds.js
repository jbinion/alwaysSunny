const getSeasonIds = async (showId) => {
  const baseUrl = ["https://api.tvmaze.com/shows/", "/seasons"];
  const url = `${baseUrl[0]}${showId}${baseUrl[1]}`;
  const req = await fetch(url);
  const data = await req.json();
  const seasonObjects = data.map((season) => ({
    id: season.id,
    number: season.number,
    episodeCount: season.episodeOrder,
  }));
  return seasonObjects;
};
export default getSeasonIds;
