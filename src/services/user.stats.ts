import { Injectable } from '@angular/core'
import _ from 'lodash'
import { formatDate, timeAmPm, formatMinutes } from '../helpers/time'
@Injectable()
export class UserStatsProvider {
  allData = {}
  todaysDate: string = '0000-00-00'
  ABSOLUTE_DATE: string = '0000-00-00'
  foodIntake: any
  nutrientData = {
    Energy: 0,
    'Sodium, Na': 0,
    Cholesterol: 0
  }
  macroPercentages = {
    Protein: 0,
    Carbohydrate: 0,
    Fat: 0
  }
  activityData = {
    activeScore: 0,
    activityCalories: 0,
    caloriesBMR: 0,
    caloriesOut: 0,
    distances: [],
    fairlyActiveMinutes: 0,
    lightlyActiveMinutes: 0,
    marginalCalories: 0,
    sedentaryMinutes: 0,
    steps: 0,
    veryActiveMinutes: 0
  }

  sleepData: any
  withingsAuth: object
  fitbitAuth: object
  userDailyStats: any
  userStatsContainer = {
    fname: '',
    lname: '',
    age: 0,
    dob: '',
    gender: '',
    weight: 0,
    heightFeet: '',
    heightInches: '',
    healthGoal: '',
    goalCaloriesIn: 0,
    goalCaloriesOut: 0,
    activityLevel: ''
  }

  currCalories: number = 0

  bpData = [
    { measurement: { pid: 0, date: '', diastolic: 0, systolic: 0, hr: 0 } },
    { measurement: { pid: 0, date: '', diastolic: 0, systolic: 0, hr: 0 } },
    { measurement: { pid: 0, date: '', diastolic: 0, systolic: 0, hr: 0 } }
  ]

  // TODO add keys for recommendation arr
  currRec = {
    recommendations: [
      {
        done: false,
        doneTime: '',
        id: 2,
        show: false,
        skipCount: 0,
        skipTime: '',
        text: ''
      },
      {
        done: false,
        doneTime: '',
        id: 2,
        show: false,
        skipCount: 0,
        skipTime: '',
        text: ''
      }
    ],
    summary: { key: '', msg: '' }
  }

  constructor() {
    this.todaysDate = this.ABSOLUTE_DATE = formatDate(new Date())
  }

  // ================= Food / Nutrients ================
  calcMacros() {
    try {
      const currCals = this.nutrientData.Energy
      const macros = [
        { name: 'Protein', multiplier: 4 },
        { name: 'Carbohydrate, by difference', multiplier: 4 },
        { name: 'Total lipid (fat)', multiplier: 9 }
      ]

      this.macroPercentages.Protein =
        ((this.nutrientData[macros[0].name] * macros[0].multiplier) /
          currCals) *
        100
      this.macroPercentages.Carbohydrate =
        ((this.nutrientData[macros[1].name] * macros[1].multiplier) /
          currCals) *
        100
      this.macroPercentages.Fat =
        ((this.nutrientData[macros[2].name] * macros[2].multiplier) /
          currCals) *
        100
    } catch (e) {
      console.log(e)
    }
  }

  processNutrientData(data) {
    this.nutrientData = data
    this.calcMacros()
  }

  //================= activity ====================/
  processActivityData(data: object) {
    this.activityData = _.get(data, `summary`, {})
  }

  // =================== sleep ====================
  formatMainSleep(data: object) {
    const sleepDataInit = {
      mainSleep: {
        startTime: '',
        endTime: '',
        timeInBed: [0, 0],
        minutesAsleep: 0,
        sleepTime: [0, 0],
        awakeningsCount: 0,
        awakeDuration: 0,
        awakeTime: [0, 0],
        restlessCount: 0,
        restlessDuration: 0,
        restlessTime: [0, 0],
        efficiency: 0
      }
    }
    this.sleepData = sleepDataInit

    try {
      const sleepDetails = _.get(data, 'sleep', [])
      if (sleepDetails.length === 0) return //if no sleep data from db

      const mainSleep = sleepDetails.filter(slpElem => {
        return slpElem.isMainSleep === true
      })
      this.sleepData.mainSleep = { ...mainSleep[0] }
      this.sleepData.mainSleep.timeInBed = formatMinutes(
        _.get(mainSleep[0], 'timeInBed', 0)
      )
      this.sleepData.mainSleep.sleepTime = formatMinutes(_.get(mainSleep[0], 'minutesAsleep', 0)) // prettier-ignore
      this.sleepData.mainSleep.restlessTime = formatMinutes(_.get(mainSleep[0], 'restlessDuration', 0)) // prettier-ignore
      this.sleepData.mainSleep.awakeTime = formatMinutes(_.get(mainSleep[0], 'awakeDuration', 0)) // prettier-ignore
      this.sleepData.mainSleep.startTime = timeAmPm(_.get(mainSleep[0], 'startTime', 0)) // prettier-ignore
      this.sleepData.mainSleep.endTime = timeAmPm(_.get(mainSleep[0], 'endTime', 0)) // prettier-ignore
      this.sleepData.mainSleep.efficiency = _.get(mainSleep[0], 'efficiency', 0) // prettier-ignore
    } catch (e) {
      console.log(e)
    }
  }
  processSleepData(data) {
    this.formatMainSleep(data)
  }
}
