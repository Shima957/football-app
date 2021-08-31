<template>
  <div class="mt-6 scorerank-min-max-w">
    <loading v-if="state.loading" class="scorerank-wh"></loading>
    <error v-if="state.error" class="scorerank-wh"></error>

    <table class="border-2 rounded shadow-lg" v-if="state.show">
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
            <div class="flex items-center">
              <img
                :src="`${teamUrl}${item.team.id}.svg`"
                class="w-5 h-5 mr-2"
              />
              <span>{{ item.team.name }}</span>
            </div>
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

import Loading from "./Loading.vue";
import Error from "./Error.vue";

export default {
  props: { teamUrl: String },
  components: { Loading, Error },

  setup() {
    const route = useRoute();

    const state = reactive({
      scoreRank: [],
      loading: true,
      error: false,
      show: false,
    });

    onMounted(() => {
      getData();
    });

    const getData = async () => {
      try {
        const res = await axios.get(
          `https://api.football-data.org/v2/competitions/${route.params.id}/scorers`
        );
        state.scoreRank.push(...res.data.scorers);
        state.loading = false;
        state.show = true;
      } catch (e) {
        state.loading = false;
        state.error = true;
      }
    };

    return { state };
  },
};
</script>

<style></style>
