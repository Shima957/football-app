<template>
  <div class="mt-6 standing-min-w">
    <loading v-if="state.loading" class="standing-wh"></loading>
    <error v-if="state.error" class="standing-wh"></error>
    <table class="border-2 rounded shadow-lg" v-if="state.show">
      <thead>
        <tr>
          <th class="p-2 border-r-2">#</th>
          <th class="p-2 border-r-2">チーム</th>
          <th class="p-2 border-r-2">試合</th>
          <th class="p-2">Pts</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, index) in state.standing"
          :key="index"
          class="border CL-range EL-range"
          :class="demotedRange()"
        >
          <td class="p-2 border-r-2 text-center">
            {{ item.position }}
          </td>
          <td class="p-2 border-r-2 flex items-center">
            <img :src="item.team.crestUrl" alt="logo" class="w-5 h-5 mr-2" />
            <span>{{ item.team.name }}</span>
          </td>
          <td class="p-2 border-r-2 text-center">
            {{ item.playedGames }}
          </td>
          <td class="p-2 text-center">
            {{ item.points }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted, reactive } from "vue";

import Loading from "./Loading.vue";
import Error from "./Error.vue";

export default {
  props: { teamUrl: String },
  components: { Loading, Error },

  setup() {
    const route = useRoute();

    const state = reactive({
      standing: [],
      show: false,
      loading: true,
      error: false,
    });

    onMounted(async () => {
      try {
        const res = await axios.get(
          `https://api.football-data.org/v2/competitions/${route.params.id}/standings?standingType=TOTAL`
        );
        state.standing.push(...res.data.standings[0].table);
        state.loading = false;
        state.show = true;
      } catch (e) {
        state.loading = false;
        state.error = true;
      }
    });

    const demotedRange = () => {
      switch (route.params.id) {
        case "PL":
        case "PD":
        case "SA":
          return "demoted-range";
        case "BL1":
          return ["BL-demoted-range", "BL-demoted-playoff"];
      }
    };

    return { state, demotedRange };
  },
};
</script>

<style></style>
