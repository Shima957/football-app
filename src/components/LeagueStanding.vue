<template>
  <div class="mt-6 standing-min-w">
    <table class="border-2 rounded shadow-lg">
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

export default {
  props: { teamUrl: String },

  setup() {
    const route = useRoute();

    const state = reactive({
      standing: "",
    });

    onMounted(async () => {
      const res = await axios
        .get(
          `https://api.football-data.org/v2/competitions/${route.params.id}/standings?standingType=TOTAL`
        )
        .catch((err) => {
          console.log(err);
        });
      state.standing = res.data.standings[0].table;
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
