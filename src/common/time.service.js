import endOfToday from 'date-fns/end_of_today'

export const today = () => new Date()

export const addLeadingZeros = (number, targetLength = 2) => {
  let output = Math.abs(number).toString()
  while (output.length < targetLength) {
    output = '0' + output
  }
  return output
}

export const filters = [
  {
    name: 'day',
    dispayFormat: 'h:mm:ss',
    endTime: endOfToday(),
  },
  {
    name: 'month',
    dispayFormat: 'D',
    endTime: endOfToday(),
  },
  {
    name: 'year',
    dispayFormat: 'h:mm:ss',
    endTime: endOfToday(),
  },
]
