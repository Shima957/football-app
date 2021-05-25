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
          <th class="p-2 border-r-2">キックオフ</th>
          <th class="p-2 border-r-2">得点</th>
          <th class="p-2">アウェイチーム</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in state.matches" :key="index" class="border">
          <!-- ホームチーム -->
          <td class="p-2 border-r-2 text-left">
            <div class="flex items-center">
              <img
                :src="`${teamUrl}${item.homeTeam.id}.svg`"
                alt="logo"
                class="w-5 h-5 mr-2"
              />
              <span>{{ item.homeTeam.name }}</span>
            </div>
          </td>
          <td
            class="p-2 text-center"
            :class="winnerHighlight(item.score.winner, 'homeTeam')"
          >
            {{ item.score.fullTime.homeTeam }}
          </td>
          <td class="p-2 text-center text-white bg-indigo-500">
            <div>{{ getMatchDay(item.utcDate) }}</div>
            <div>{{ getMatchTime(item.utcDate) }}</div>
          </td>

          <!-- アウェイチーム -->
          <td
            class="p-2 border-r-2 text-center"
            :class="winnerHighlight(item.score.winner, 'awayTeam')"
          >
            {{ item.score.fullTime.awayTeam }}
          </td>
          <td class="p-2 text-left">
            <div class="flex items-center">
              <img
                :src="`${teamUrl}${item.awayTeam.id}.svg`"
                alt="logo"
                class="w-5 h-5 mr-2"
              />
              <span>{{ item.awayTeam.name }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import {
  getMatchDay,
  getMatchTime,
  winnerHighlight,
} from "../modules/UseMatchDayComponent";

export default {
  props: { teamUrl: String },

  setup() {
    const state = reactive({
      matches: "",
      matchDay: "",
      totalMatchDay: "",
    });

    const route = useRoute();

    onMounted(() => {
      firstView();
    });

    //初期表示
    const firstView = async () => {
      await seachTotalMatchDay();
      await seachLastMatchDay();
      const res = await getMatchData();

      state.matches = res.data.matches;
    };

    //試合データを取得
    const getMatchData = () => {
      return axios
        .get(
          `https://api.football-data.org/v2/competitions/${route.params.id}/matches?matchday=${state.matchDay}`
        )
        .catch((err) => {
          console.log(err);
        });
    };

    //何節まで終了しているか調べる
    const seachLastMatchDay = async () => {
      const res = await axios
        .get(
          `https://api.football-data.org/v2/competitions/${route.params.id}/matches`
        )
        .catch((err) => {
          console.log(err);
        });

      const data = res.data.matches;

      const noScheduled = data.some((param) => {
        param.status === "SCHEDULED";
      });

      const noFinished = data.some((param) => {
        param.status === "FINISHED";
      });

      if (!noScheduled) {
        //全日程が終了している場合
        state.matchDay = state.totalMatchDay;
      } else if (noScheduled && !noFinished) {
        //シーズン開幕前
        state.matchDay = 1;
      } else {
        //シーズン中
        const findDate = data.find((param) => {
          const date = new Date(param.utcDate);
          const currentDate = new Date();
          return (
            date.getFullYear() === currentDate.getFullYear() &&
            date.getMonth() === currentDate.getMonth() &&
            param.status === "SCHDULED"
          );
        });

        const finishedMatchIndex = data.indexOf(findDate) - 1;
        const finishedMatch = data[finishedMatchIndex].matchday;
        state.matchDay = finishedMatch;
      }
    };

    //全部で何節あるか調べる
    const seachTotalMatchDay = async () => {
      const route = useRoute();
      const res = await axios
        .get(
          `https://api.football-data.org/v2/competitions/${route.params.id}/standings?standingType=TOTAL`
        )
        .catch((err) => {
          console.log(err);
        });

      const totalMatchDay = res.data.standings[0].table.length * 2 - 2;
      state.totalMatchDay = totalMatchDay;
    };

    // watchEffect(async () => {
    //   const res = await getMatchData();

    //   state.matches = res.data.matches;
    // });

    return { state, getMatchTime, getMatchDay, winnerHighlight };
  },
};
</script>

<style></style>
