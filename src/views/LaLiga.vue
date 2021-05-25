<template>
  <div class="flex">
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
