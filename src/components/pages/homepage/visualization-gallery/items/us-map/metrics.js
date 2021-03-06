import mapStyle from './us-map.module.scss'

const getAverage = (history, state, value) =>
  history
    .find(group => group.nodes[0].state === state)
    .nodes.slice(0, 7)
    .reduce((total, item) => total + value(item), 0) / 7

export default {
  casesPer100k: {
    title: 'Average daily new COVID-19 cases per 100k people (past 7 days)',
    getValue: (history, state) =>
      getAverage(
        history,
        state.state,
        item => item.childPopulation.positiveIncrease.per100k,
      ),
    getUsValue: history =>
      history
        .slice(0, 7)
        .reduce(
          (total, item) =>
            total + item.childPopulation.positiveIncrease.per100k,
          0,
        ) / 7,
    getColor: item => {
      if (item > 75) {
        return mapStyle.level4
      }
      if (item > 50) {
        return mapStyle.level3
      }
      if (item > 25) {
        return mapStyle.level2
      }
      return mapStyle.level1
    },
    legend: [
      {
        style: mapStyle.level1,
        label: 'Under 25',
      },
      {
        style: mapStyle.level2,
        label: '26 - 50',
      },
      {
        style: mapStyle.level3,
        label: '51 - 75',
      },
      {
        style: mapStyle.level4,
        label: 'Over 75 cases per 100k',
      },
    ],
  },
  sevenDayPositive: {
    title: 'Average daily new COVID-19 cases (past 7 days)',
    getValue: (history, state) =>
      getAverage(history, state.state, item => item.positiveIncrease),

    getUsValue: history =>
      history
        .slice(0, 7)
        .reduce((total, item) => total + item.positiveIncrease, 0) / 7,
    getColor: item => {
      if (item > 5000) {
        return mapStyle.level4
      }
      if (item > 3000) {
        return mapStyle.level3
      }
      if (item > 2000) {
        return mapStyle.level2
      }
      return mapStyle.level1
    },
    legend: [
      {
        style: mapStyle.level1,
        label: 'Below 2,000',
      },
      {
        style: mapStyle.level2,
        label: '2,000 - 3,000',
      },
      {
        style: mapStyle.level3,
        label: '3,000 - 5,000',
      },
      {
        style: mapStyle.level4,
        label: 'Over 5,000 cases',
      },
    ],
  },
}
