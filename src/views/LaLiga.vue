<template>
  <div
    class="
      flex
      justify-around
      sm:flex-col
      sm:items-center
      md:flex-col
      md:items-center
      lg:flex-col
      lg:items-center
    "
  >
    <LeagueStandings />
    <MatchDay :teamUrl="teamUrl" />
    <ScoreRank :teamUrl="teamUrl" />
  </div>
</template>

<script>
import LeagueStandings from "../components/LeagueStanding";
import MatchDay from "../components/MatchDay";
import ScoreRank from "../components/ScoreRank";

export default {
  name: "LaLiga",
  components: { LeagueStandings, MatchDay, ScoreRank },

  setup() {
    const teamUrl = "https://crests.football-data.org/";

    return { teamUrl };
  },
};
</script>
