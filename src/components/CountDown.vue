<template>
  <div>
    {{ prettyTime }}
  </div>
</template>

<script>
import differenceInSeconds from 'date-fns/difference_in_seconds'
import { today, addLeadingZeros } from '../common/time.service'

export default {
  name: 'CountDown',
  data () {
    return {
      time: differenceInSeconds(today()),
    }
  },
  created: function () {
    this.timer = setInterval(this.computeTime, 1000)
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
