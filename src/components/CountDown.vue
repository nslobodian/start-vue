<template>
  <div>
    {{ prettyTime }}
  </div>
</template>

<script>
import differenceInSeconds from 'date-fns/difference_in_seconds'
import endOfToday from 'date-fns/end_of_today'

const today = () => new Date()

function addLeadingZeros (number, targetLength = 2) {
  let output = Math.abs(number).toString()
  while (output.length < targetLength) {
    output = '0' + output
  }
  return output
}

export default {
  name: 'CountDown',
  data () {
    return {
      time: differenceInSeconds(endOfToday(), today()),
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
