<template>
  <div class="mt-6 ml-6">
    <table class="border-2 rounded shadow-lg">
      <thead>
        <tr>
          <th class="p-2 border-r-2">#</th>
          <th class="p-2 border-r-2">選手</th>
          <th class="p-2">得点</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in state.scoreRank"
          :key="index"
          class="border"
        >
          <td class="p-2 text-center border-r-2">{{ index + 1 }}</td>
          <td class="p-2 border-r-2">
            <span>{{ item.player.name }}</span>
            <div>{{ item.team.name }}</div>
          </td>
          <td class="p-2 text-center">{{ item.numberOfGoals }}</td>
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
      scoreRank: "",
    });

    onMounted(() => {
      getData();
    });

    const getData = async () => {
      const res = await axios
        .get(
          `https://api.football-data.org/v2/competitions/${route.params.id}/scorers`
        )
        .catch((err) => {
          console.log(err);
        });

      state.scoreRank = res.data.scorers;
    };

    return { state };
  },
};
</script>

<style></style>
