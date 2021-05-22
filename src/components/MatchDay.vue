<template>
  <div class="mt-6 ml-6">
    <select v-model="state.matchDay">
      <option v-for="n in state.totalMatchDay" :key="n" :value="n">
        {{ n }}節
      </option>
    </select>
    <table class="border-2 rounded shadow-lg">
      <thead>
        <tr>
          <th class="p-2 border-r-2">ホームチーム</th>
          <th class="p-2 border-r-2">得点</th>
          <th class="p-2 border-r-2">日時</th>
          <th class="p-2 border-r-2">得点</th>
          <th class="p-2">アウェイチーム</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in state.matches" :key="index" class="border">
          <td class="p-2 border-r-2 text-center">
            {{ item.homeTeam.name }}
          </td>
          <td class="p-2 border-r-2 text-center">
            {{ item.score.fullTime.homeTeam }}
          </td>
          <td class="p-2 border-r-2 text-center">
            {{ getMatchDay(item.utcDate) }}
          </td>
          <td class="p-2 border-r-2 text-center">
            {{ item.score.fullTime.awayTeam }}
          </td>
          <td class="p-2">{{ item.awayTeam.name }}</td>
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
    const state = reactive({
      matches: "",
      matchDay: "",
      totalMatchDay: "",
    });

    // const matchDay = ref("");

    const route = useRoute();

    onMounted(() => {
      firstView();
      seachTotalMatchDay();
    });

    //初期表示
    const firstView = async () => {
      await seachLastMatchDay();
      const res = await axios.get(
        `https://api.football-data.org/v2/competitions/${route.params.id}/matches?matchday=${state.matchDay}`
      );

      state.matches = res.data.matches;
    };

    //何節まで終了しているか調べる
    const seachLastMatchDay = async () => {
      const res = await axios.get(
        `https://api.football-data.org/v2/competitions/${route.params.id}/matches`
      );
      const data = res.data.matches;

      const currentDate = new Date();

      const findDate = data.find((param) => {
        const date = new Date(param.utcDate);
        return (
          date.getUTCFullYear() === currentDate.getUTCFullYear() &&
          date.getUTCMonth() === currentDate.getUTCMonth() &&
          param.status === "SCHEDULED"
        );
      });

      const finishedMatchIndex = data.indexOf(findDate) - 1;
      const finishedMatch = data[finishedMatchIndex].matchday;
      state.matchDay = finishedMatch;
    };

    //試合の日付を取得
    const getMatchDay = (utcDate) => {
      const jstDate = new Date(utcDate);
      const month = jstDate.getMonth() + 1;
      const date = jstDate.getDate();
      const day = ["日", "月", "火", "水", "木", "金", "土"][jstDate.getDay()];

      return `${month}/${date}${day}`;
    };

    //全部で何節あるか調べる
    const seachTotalMatchDay = async () => {
      const route = useRoute();
      const res = await axios.get(
        `https://api.football-data.org/v2/competitions/${route.params.id}/standings?standingType=TOTAL`
      );

      const totalMatchDay = res.data.standings[0].table.length * 2 - 2;
      state.totalMatchDay = totalMatchDay;
    };

    return { state, getMatchDay };
  },
};
</script>

<style></style>
