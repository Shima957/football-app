<template>
  <header class="bg-grdient py-4">
    <nav>
      <ul class="flex justify-around text-white">
        <li>
          <router-link :to="{ name: 'League', params: { id: Premire } }"
            >Premire League</router-link
          >
        </li>

        <li>
          <router-link :to="{ name: 'League', params: { id: LaLiga } }"
            >La Liga</router-link
          >
        </li>

        <li>
          <router-link :to="{ name: 'League', params: { id: Bundesliga } }"
            >Bundesliga</router-link
          >
        </li>

        <li>
          <router-link :to="{ name: 'League', params: { id: SerieA } }"
            >Serie A</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      Premire: "PL",
      LaLiga: "PD",
      Bundesliga: "BL1",
      SerieA: "SA",
    };
  },
};
</script>

<style></style>
