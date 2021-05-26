//試合の日付を取得
const getMatchDay = (utcDate) => {
  const jstDate = new Date(utcDate);
  const month = jstDate.getMonth() + 1;
  const date = jstDate.getDate();
  const day = ["日", "月", "火", "水", "木", "金", "土"][jstDate.getDay()];

  return `${month}/${date}${day}`;
};

// キックオフ時間を取得
const getMatchTime = (utcDate) => {
  const jstDate = new Date(utcDate);
  const time = `${jstDate.getHours()}:${("0" + jstDate.getMinutes()).slice(
    -2
  )}`;
  return time;
};

//勝ったクラブのハイライト
const winnerHighlight = (win, team) => {
  if (win === "HOME_TEAM" && team === "homeTeam") {
    return "bg-blue-200";
  } else if (win === "AWAY_TEAM" && team === "awayTeam") {
    return "bg-blue-200";
  }
};

export { getMatchDay, getMatchTime, winnerHighlight };
