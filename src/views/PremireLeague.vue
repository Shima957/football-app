<template>
  <div class="flex justify-around">
    <LeagueStandings />
    <MatchDay />
    <ScoreRank />
  </div>
</template>

<script>
import LeagueStandings from "../components/LeagueStanding";
import MatchDay from "../components/MatchDay";
import ScoreRank from "../components/ScoreRank";

export default {
  name: "PremireLeauge",
  components: { LeagueStandings, MatchDay, ScoreRank },
};
</script>
