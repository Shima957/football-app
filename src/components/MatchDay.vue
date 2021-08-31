<template>
  <div class="mt-6 matchday-min-max-w">
    <loading v-if="state.loading" class="matchday-wh"></loading>
    <error v-if="state.error" class="matchday-wh"></error>
    <div v-if="state.show">
      <select
        v-model="state.matchDay"
        class="border border-gray-300 rounded-md"
      >
        <option v-for="n in state.totalMatchDay" :key="n" :value="n">
          {{ n }}節
        </option>
      </select>
      <table class="border-2 shadow-lg">
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
          <tr
            v-for="(item, index) in state.matches"
            :key="index"
            class="border"
          >
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
  </div>
</template>

<script>
import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import Loading from "./Loading.vue";
import Error from "./Error.vue";

import {
  getMatchDay,
  getMatchTime,
  winnerHighlight,
} from "../modules/UseMatchDayComponent";

export default {
  props: { teamUrl: String },
  components: { Loading, Error },

  setup() {
    const state = reactive({
      matches: "",
      matchDay: "",
      totalMatchDay: "",
      loading: true,
      error: false,
      show: false,
    });

    const route = useRoute();

    onMounted(() => {
      seachTotalMatchDay();
      firstView();
    });

    //初期表示
    const firstView = async () => {
      await seachLastMatchDay();
      await getMatchData();
    };

    //試合データを取得
    const getMatchData = async () => {
      try {
        const res = await axios.get(
          `https://api.football-data.org/v2/competitions/${route.params.id}/matches?matchday=${state.matchDay}`
        );
        state.matches = res.data.matches;
        state.loading = false;
        state.show = true;
      } catch (e) {
        state.show = false;
        state.error = true;
      }
    };

    //何節まで終了しているか調べる
    const seachLastMatchDay = async () => {
      try {
        const res = await axios.get(
          `https://api.football-data.org/v2/competitions/${route.params.id}/matches`
        );
        const data = res.data.matches;

        const preSeason = data.every((param) => {
          param.status === "SCHEDULED";
        });

        const endSeason = data.every((param) => {
          param.status === "FINISHED";
        });

        if (endSeason) {
          //全日程が終了している場合
          state.matchDay = state.totalMatchDay;
        } else if (preSeason) {
          //シーズン開幕前
          state.matchDay = 1;
        } else {
          //シーズン中
          const findDate = data.find((param) => {
            const date = new Date(param.utcDate);
            const currentDate = new Date();
            return (
              date.getFullYear() >= currentDate.getFullYear() &&
              date.getMonth() >= currentDate.getMonth() &&
              param.status === "SCHEDULED"
            );
          });

          const finishedMatchIndex = data.indexOf(findDate) - 1;
          const finishedMatch = data[finishedMatchIndex].matchday;
          state.matchDay = finishedMatch;
        }
      } catch (e) {
        console.log(e);
        state.loading = false;
        state.error = true;
      }
    };

    //全部で何節あるか調べる
    const seachTotalMatchDay = async () => {
      const route = useRoute();
      try {
        state.totalMatchDay = "";
        const res = await axios.get(
          `https://api.football-data.org/v2/competitions/${route.params.id}/standings?standingType=TOTAL`
        );
        const totalMatchDay = res.data.standings[0].table.length * 2 - 2;
        state.totalMatchDay = totalMatchDay;
      } catch (e) {
        console.log(e);
        state.loading = false;
        state.error = true;
      }
    };

    watch(
      () => state.matchDay,
      async (value) => {
        try {
          state.show = false;
          state.loading = true;
          const res = await axios.get(
            `https://api.football-data.org/v2/competitions/${route.params.id}/matches?matchday=${value}`
          );
          state.matches = res.data.matches;

          state.loading = false;
          state.show = true;
        } catch (e) {
          console.log(e);
          state.show = false;
          state.loading = false;
          state.error = true;
        }
      }
    );

    return { state, getMatchTime, getMatchDay, winnerHighlight };
  },
};
</script>

<style></style>
