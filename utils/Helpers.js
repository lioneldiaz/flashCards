import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { NOTIFICATION_KEY } from './Constants'
/**
 * @description Allows us to format the data.
 * @param {Object} result
 * @return {Object}
 */
export function formattedData (result) {
  let data = JSON.parse(result)
  return data
}

/**
 * @description Generate unique key
 * @return {string}
 */
export function generateKey () {
  return Date.now() + Math.random().toString(36).substr(-10)
}

/**
 * @description Validate that the field is only letter and space
 * @param {string} field
 * @return {bool}
 */
export function validateLetter (field) {
  const expressionJustLetter = /^[A-Za-z ]+$/
  return expressionJustLetter.test(removeSpace(field))
}
/**
 * @description Calculate the success percentage
 * @param {numbre} correct
 * @param {number} incorrect
 */
export function percentage (correct, incorrect) {
  return ((correct * 100)/(correct + incorrect)).toFixed(0)
}
/**
 * @description Cancel all scheduled notifications
 */
export function clearNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
/**
 * @description Schedule a local notification to fire at some specific time in the future
 */
export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((result) => {
      if (result === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(10)
              tomorrow.setMinutes(30)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: "day"
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
            }
          })
      }
    })
}
/**
 * @description Used to describe the local notification
 * @return {Object}
 */
function createNotification () {
  return {
    title: 'Study',
    body: 'Do not forget to study today',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}