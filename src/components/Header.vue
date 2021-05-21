<template>
  <header class="bg-grdient p-4">
    <nav>
      <ul class="flex justify-between text-white">
        <li>
          <router-link :to="{ name: 'PremireLeauge', params: { id: Premire } }"
            >Premire League</router-link
          >
        </li>

        <li>
          <router-link :to="{ name: 'LaLiga', params: { id: LaLiga } }"
            >La Liga</router-link
          >
        </li>

        <li>
          <router-link :to="{ name: 'Bundesliga', params: { id: Bundesliga } }"
            >Bundesliga</router-link
          >
        </li>

        <li>
          <router-link :to="{ name: 'SerieA', params: { id: SerieA } }"
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
