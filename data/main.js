import getSeasonIds from "./getSeasonIds.js";
import getShowId from "./getShowId.js";
import getEpisodes from "./getEpisodes.js";
import fs from "fs";

const main = async () => {
  const showName = "It's Always Sunny in Philadelphia";
  const showId = await getShowId(showName);
  console.log(showId);
  const seasonIds = await getSeasonIds(showId);
  console.log(seasonIds);

  const episodes = seasonIds.map(async (season) => {
    const episodes = await getEpisodes(season.id);
    return episodes.map((episode) => ({
      ...episode,
      startTime: "",
      startDay: "",
    }));
  });
  const allEpisodes = await Promise.all(episodes);
  console.log(allEpisodes.flat());

  fs.writeFileSync(
    "episodes.json",
    JSON.stringify(allEpisodes.flat(), null, 2),
    "utf-8"
  );
};

main();
