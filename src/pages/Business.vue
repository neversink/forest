<template>
  <div style="height:100%;">
    <v-progress-linear v-if="is_loading" :indeterminate="true"></v-progress-linear>
    <highstock v-else highstock :options="options" class="main-stock"></highstock>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

const groupingUnits = [
  [
    'week', // unit name
    [1] // allowed multiples
  ],
  [
    'month', [1, 2, 3, 4, 6]
  ]
];

export default {
  name: 'Business',
  data() {
    return {
      is_loading: true
    }
  },
  computed: {
    ...mapGetters('market', [
      'datas'
    ]),
    options() {
      return {
        chart: {
          backgroundColor: '#212121'
        },
        rangeSelector: {
          selected: 1,
          inputEnabled: false
          // inputDateFormat: '%Y-%m-%d'
        },
        title: {
          text: '平安银行',
          style: { color: 'white', marginTop: '10px' }
        },
        xAxis: {
          dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%m-%d',
            week: '%m-%d',
            month: '%y-%m',
            year: '%Y'
          }
        },
        tooltip: {
          split: false,
          shared: true,
        },
        yAxis: [{
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            // text: '股价'
          },
          height: '65%',
          resize: {
            enabled: true
          },
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            // text: '成交量'
          },
          top: '65%',
          height: '35%',
        }],
        series: [{
          type: 'candlestick',
          name: '股价',
          color: 'green',
          lineColor: 'green',
          upColor: 'red',
          upLineColor: 'red',
          tooltip: {},
          navigatorOptions: {
          },
          data: this.datas.ohlc,
          dataGrouping: {
            units: groupingUnits
          },
          id: 'sz'
        }, {
          type: 'column',
          name: '交易量',
          data: this.datas.volume,
          yAxis: 1,
          dataGrouping: {
            units: groupingUnits
          }
        }],
        credits: {
          enabled: false
        }
      }
    }
  },
  created() {
    this.getDatas().then(() => {
      this.is_loading = false
    });
  },
  methods: {
    ...mapActions('market', [
      'getDatas',
    ]),
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-stock {
  height: 100%;
}

::-webkit-scrollbar {
  display: none;
}

</style>
