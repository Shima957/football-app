<template>
  <div class="mt-6 ml-6">
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
        <tr v-for="(item, index) in state.standing" :key="index" class="border">
          <td class="p-2 border-r-2 text-center">{{ item.position }}</td>
          <td class="p-2 border-r-2">{{ item.team.name }}</td>
          <td class="p-2 border-r-2 text-center">{{ item.playedGames }}</td>
          <td class="p-2 text-center">{{ item.points }}</td>
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

    return { state };
  },
};
</script>

<style></style>
