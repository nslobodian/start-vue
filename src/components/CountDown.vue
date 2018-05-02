<template>
  <div>
    {{ prettyTime }}
    <div>
      <input
        autofocus autocomplete="off"
        placeholder="What needs to be added?"
        v-model="newValue"
        type="number"
        @keyup.enter="addValue">
    </div>
    <div>
      <Chart :data="dataArr"/>
    </div>
  </div>
</template>

<script>
import differenceInSeconds from 'date-fns/difference_in_seconds'
import { today, addLeadingZeros } from '../common/time.service'
import endOfToday from 'date-fns/end_of_today'
import Chart from '@/components/Chart'

const dataArr = [
  {
    name: 'A',
    value: 2,
  },
  {
    name: 'B',
    value: 17,
  },
  {
    name: 'C',
    value: 12,
  },
  {
    name: 'D',
    value: 43,
  },
  {
    name: 'E',
    value: 5,
  },
]

export default {
  name: 'CountDown',
  components: {
    Chart,
  },
  data () {
    return {
      newValue: '',
      time: differenceInSeconds(endOfToday(), today()),
      dataArr,
    }
  },
  created: function () {
    // this.timer = setInterval(this.computeTime, 1000)
  },
  computed: {
    prettyTime () {
      let time = this.time / 60
      let minutes = parseInt(time)
      let seconds = Math.round((time - minutes) * 60)
      return `${addLeadingZeros(minutes)}:${addLeadingZeros(seconds)}`
    },
  },
  methods: {
    addValue: function () {
      dataArr.push(+this.newValue)
      this.newValue = ''
    },
    computeTime: function () {
      if (this.time > 0) {
        this.time--
      } else {
        clearInterval(this.timer)
      }
    },
  },
}
</script>

<style scoped>
</style>
