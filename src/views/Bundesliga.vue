<template>
  <div class="flex">
    <LeagueStandings />
    <MatchDay />
  </div>
</template>

<script>
import LeagueStandings from "../components/LeagueStanding";
import MatchDay from "../components/MatchDay";

export default {
  name: "Bundesliga",
  components: { LeagueStandings, MatchDay },
};
</script>
