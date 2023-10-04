import { sample } from '../data';
import { spell } from '../spell';
import { rune } from '../rune';
import { atomWithDefault } from 'jotai/utils';
import { useAtomValue } from 'jotai';

// 함께한 소환사 아이콘, 이름, 게임 수, 승-패, 승률 메서드
// 20 게임의 매치 데이터와 검색된 소환사 받기
const getDuoPlayer = (data, cur) => {
  const map = new Map();
  const line = new Map();
  line.set('TOP', 0);
  line.set('MIDDLE', 0);
  line.set('JUNGLE', 0);
  line.set('AD', 0);
  line.set('UTILITY', 0);

  let recentData = {
    win: 0,
    lose: 0,
    count: 0,
    kill: 0,
    death: 0,
    assist: 0,
    score: 0,
    kill_participation: 0,
    line: [],
  };

  data.forEach((e) => {
    if (e.win == 1) {
      e.winner.forEach((v) => {
        if (v.summoner_name != cur) {
          if (map.has(v.summoner_name)) {
            const getUser = map.get(v.summoner_name);
            map.set(v.summoner_name, {
              name: getUser.name,
              win: getUser.win + 1,
              lose: getUser.lose,
              count: getUser.count + 1,
              percent: 0,
            });
          } else {
            map.set(v.summoner_name, {
              name: v.summoner_name,
              win: 1,
              lose: 0,
              count: 1,
              percent: 0,
            });
          }
        } else {
          recentData = {
            ...recentData,
            win: recentData.win + 1,
            count: recentData.count + 1,
            kill: recentData.kill + v.kill,
            death: recentData.death + v.death,
            assist: recentData.assist + v.assist,
            score: recentData.score + v.kda,
            kill_participation:
              recentData.kill_participation + v.kill_participation,
          };
          line.set(v.line_name, line.get(v.line_name) + 1);
        }
      });
    } else if (e.win == 0) {
      e.loser.forEach((v) => {
        if (v.summoner_name != cur) {
          if (map.has(v.summoner_name)) {
            const getUser = map.get(v.summoner_name);
            map.set(v.summoner_name, {
              name: getUser.name,
              win: getUser.win,
              lose: getUser.lose + 1,
              count: getUser.count + 1,
              percent: 0,
            });
          } else {
            map.set(v.summoner_name, {
              name: v.summoner_name,
              win: 0,
              lose: 1,
              count: 1,
              percent: 0,
            });
          }
        } else {
          recentData = {
            ...recentData,
            lose: recentData.lose + 1,
            count: recentData.count + 1,
            kill: recentData.kill + v.kill,
            death: recentData.death + v.death,
            assist: recentData.assist + v.assist,
            score: recentData.score + v.kda,
            kill_participation:
              recentData.kill_participation + v.kill_participation,
          };
          line.set(v.line_name, line.get(v.line_name) + 1);
        }
      });
    }
  });
  const result = Array.from(map.entries()).map((e) => {
    return [
      e[0],
      { ...e[1], percent: Math.floor((e[1].win / e[1].count) * 100) },
    ];
  });

  recentData.line = line;
  console.log(line);
  console.log(recentData.count);
  // kill death assist score participation
  recentData.kill = Number((recentData.kill / recentData.count).toFixed(2));
  recentData.death = Number((recentData.death / recentData.count).toFixed(2));
  recentData.assist = Number((recentData.assist / recentData.count).toFixed(2));
  recentData.score = Number((recentData.score / recentData.count).toFixed(2));
  recentData.kill_participation = Number(
    (recentData.kill_participation / recentData.count).toFixed(2)
  );

  return { result, recentData };
};

// 획득 골드량 포맷팅 메서드
const formatGold = (number) => {
  if (number >= 10000) {
    const quotient = Math.floor(number / 1000);
    return `${quotient / 10}만`;
  }
  if (number >= 1000) {
    const quotient = Math.floor(number / 100);
    return `${quotient / 10}천`;
  }
  return number.toString();
};

// 요청 데이터 가공 메서드
const formattingData = async () => {
  let win = 0;
  const user = sample.profile[0].summoner_name;

  const arr = sample.match_histories.map((e) => {
    let cur;
    let summary = [[], []];
    // 매치마다 시간 계산
    const timestamp = e[0].play_time;
    const now = new Date();
    const time = Math.floor((now - timestamp) / 1000);
    let match_ago;
    if (time / 3600 > 23) {
      match_ago = `${Math.floor(time / 3600 / 24)}일 전`;
    } else {
      if ((time % 3600) / 60 < 60) {
        match_ago = `${Math.floor((time % 3600) / 60)}분 전`;
      } else {
        match_ago = `${Math.floor(time / 3600)}시간 전`;
      }
    }

    // 매치 별 플레이 시간 가공
    const str = e[0].play_duration.split('');
    if (str.length < 5) {
      e[0].play_duration = str[0] + str[1] + ':' + str[2] + str[3];
    }

    const winner = [];
    const loser = [];

    e.forEach((v, i) => {
      // 소환사마다 획득 골드 계산
      const gold = v.gold;
      v.gold = formatGold(gold);

      // 소환사 스펠 정보 가공
      const spell_0 = v.spell_0_id;
      const spell_1 = v.spell_1_id;

      if (typeof spell_0 == 'number') {
        v.spell_0_id = spell.data[spell_0].id;
        v.spell_1_id = spell.data[spell_1].id;
      }

      // 소환사 룬 정보 가공
      const rune_0 = v.rune_0_id;
      const rune_1 = v.rune_1_id;

      if (typeof rune_0 == 'number') {
        rune.forEach((e) => {
          if (e.id == rune_0) {
            const rune_icon = e.icon.split('/');
            const end_str = rune_icon[rune_icon.length - 1].split('.')[0];
            v.rune_0_id = end_str;
          }
          if (e.id == rune_1) {
            const rune_icon = e.icon.split('/');
            const end_str = rune_icon[rune_icon.length - 1].split('.')[0];
            v.rune_1_id = end_str;
          }
        });
      }

      // 이긴 소환사 진 소환사 정보 가공
      if (v.win_or_lose == 0) {
        summary[1].push({
          name: v.summoner_name,
          champ: v.champion_name_en,
        });
        loser.push(v);
      } else {
        summary[0].push({
          name: v.summoner_name,
          champ: v.champion_name_en,
        });
        winner.push(v);
      }

      // 검색된 소환사 저장
      if (v.summoner_name == user) {
        cur = i;
        win = v.win_or_lose;
      }
    });

    // 계산된 매치 시간대 저장
    e[cur].play_time = match_ago;

    // 객체 배열로 리턴
    return {
      win,
      cur,
      summary,
      data: e,
      winner,
      loser,
    };
  });
  const result = await getDuoPlayer(arr, user);
  const duoPlayer = result.result.filter((e) => {
    if (e[1].count > 1) return e;
  });

  duoPlayer.sort(function (a, b) {
    return b[1].count - a[1].count;
  });

  const recent = result.recentData;

  // 가공된 데이터 리턴
  return {
    profile: sample.profile[0],
    duoPlayer,
    recent,
    match_histories: arr,
  };
};

const recordAtom = atomWithDefault(formattingData);

// const updateRecordAtom = atom(null, async (get, set) => {
//   set(recordAtom, await getRecord());
// });

export const useRecord = () => useAtomValue(recordAtom);

// export const useUpdateRecord = () => useSetAtom(updateRecordAtom);