<template>
  <svg class="chart"></svg>
</template>

<script>
import * as d3 from 'd3'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'

const margin = { top: 20, right: 30, bottom: 30, left: 40 }
const width = 960 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom

export default {
  name: 'Chart',
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  watch: {
    data: function () {
      this.render()
    },
  },
  mounted: function () {
    this.render()
  },
  methods: {
    x: function () {
      return scaleOrdinal().range([0, width])
    },
    y: function () {
      return scaleLinear().range([height, 0])
    },
    render: function () {
      const x = this.x().domain(this.data.map(d => d.name))
      const y = this.y().domain([0, d3.max(this.data.map(d => d.value))])

      const xAxis = axisBottom(x)
      const yAxis = axisLeft(y)

      const char = d3.select(this.$el)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      char.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)

      char.append('g')
        .attr('class', 'y axis')
        .call(yAxis)

      char.selectAll('.bar')
        .data(this.data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.value))
        .attr('width', 20)
        .attr('height', d => height - y(d.value))
    },
  },
}
</script>

<style>
  .bar {
    fill: steelblue;
  }

  .axis text {
    font: 10px sans-serif;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }

  .x.axis path {
    display: none;
  }
</style>
