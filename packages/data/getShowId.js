const getShowId = async (showName) => {
  const baseUrl = "https://api.tvmaze.com/search/shows?q=";
  const query = encodeURIComponent(showName);
  const url = `${baseUrl}${query}`;
  const req = await fetch(url);
  const data = await req.json();
  console.log(data);
  if (data.length > 0) {
    return data[0].show.id;
  } else {
    throw new Error("Show not found");
  }
};
export default getShowId;
