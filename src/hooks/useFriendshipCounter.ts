import { useEffect, useState } from 'react'

export interface FriendshipDuration {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function diffFromNow(startDate: string): FriendshipDuration {
  const start = new Date(startDate)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  let hours = now.getHours() - start.getHours()
  let minutes = now.getMinutes() - start.getMinutes()
  let seconds = now.getSeconds() - start.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes -= 1
  }
  if (minutes < 0) {
    minutes += 60
    hours -= 1
  }
  if (hours < 0) {
    hours += 24
    days -= 1
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
    months -= 1
  }
  if (months < 0) {
    months += 12
    years -= 1
  }

  return {
    years: Math.max(years, 0),
    months: Math.max(months, 0),
    days: Math.max(days, 0),
    hours: Math.max(hours, 0),
    minutes: Math.max(minutes, 0),
    seconds: Math.max(seconds, 0),
  }
}

/** Live-updating duration since a given ISO start date. */
export function useFriendshipCounter(startDate: string): FriendshipDuration {
  const [duration, setDuration] = useState<FriendshipDuration>(() => diffFromNow(startDate))

  useEffect(() => {
    const id = window.setInterval(() => setDuration(diffFromNow(startDate)), 1000)
    return () => window.clearInterval(id)
  }, [startDate])

  return duration
}
