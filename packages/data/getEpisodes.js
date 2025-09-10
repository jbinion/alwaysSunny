const getEpisodes = async (seasonId) => {
  const baseUrl = ["https://api.tvmaze.com/seasons/", "/episodes"];
  const url = `${baseUrl[0]}${seasonId}${baseUrl[1]}`;
  const req = await fetch(url);
  const data = await req.json();
  console.log(data);
  const episodeObjects = data.map((episode) => ({
    id: episode.id,
    season: episode.season,
    name: episode.name,
    number: episode.number,
    airdate: episode.airdate,
  }));
  return episodeObjects;
};

export default getEpisodes;
