// Academic structure data and types

export type Department = {
  id: string
  code: string
  name: string
  shortName: string
}

export type Year = {
  id: string
  value: number
  name: string
}

export type Semester = {
  id: string
  value: number
  name: string
  type: "Odd" | "Even"
}

export type Division = {
  id: string
  name: string
  departmentId: string
  yearId: string
  strength: number
}

export type TimeSlot = {
  id: string
  startTime: string
  endTime: string
  displayName: string
  isBreak?: boolean
}

export type Day = {
  id: string
  name: string
  shortName: string
  value: number
}

// Departments
export const departments: Department[] = [
  { id: "dept-cs", code: "CS", name: "Computer Science & Engineering", shortName: "CSE" },
  { id: "dept-ee", code: "EE", name: "Electrical Engineering", shortName: "EE" },
  { id: "dept-me", code: "ME", name: "Mechanical Engineering", shortName: "ME" },
  { id: "dept-ce", code: "CE", name: "Civil Engineering", shortName: "CE" },
  { id: "dept-ec", code: "EC", name: "Electronics & Communication", shortName: "ECE" },
]

// Years
export const years: Year[] = [
  { id: "year-1", value: 1, name: "First Year" },
  { id: "year-2", value: 2, name: "Second Year" },
  { id: "year-3", value: 3, name: "Third Year" },
  { id: "year-4", value: 4, name: "Fourth Year" },
]

// Semesters
export const semesters: Semester[] = [
  { id: "sem-1", value: 1, name: "Semester 1", type: "Odd" },
  { id: "sem-2", value: 2, name: "Semester 2", type: "Even" },
  { id: "sem-3", value: 3, name: "Semester 3", type: "Odd" },
  { id: "sem-4", value: 4, name: "Semester 4", type: "Even" },
  { id: "sem-5", value: 5, name: "Semester 5", type: "Odd" },
  { id: "sem-6", value: 6, name: "Semester 6", type: "Even" },
  { id: "sem-7", value: 7, name: "Semester 7", type: "Odd" },
  { id: "sem-8", value: 8, name: "Semester 8", type: "Even" },
]

// Divisions
export const divisions: Division[] = [
  { id: "div-cs-1-a", name: "A", departmentId: "dept-cs", yearId: "year-1", strength: 60 },
  { id: "div-cs-1-b", name: "B", departmentId: "dept-cs", yearId: "year-1", strength: 60 },
  { id: "div-cs-2-a", name: "A", departmentId: "dept-cs", yearId: "year-2", strength: 60 },
  { id: "div-cs-2-b", name: "B", departmentId: "dept-cs", yearId: "year-2", strength: 60 },
  { id: "div-cs-3-a", name: "A", departmentId: "dept-cs", yearId: "year-3", strength: 60 },
  { id: "div-cs-3-b", name: "B", departmentId: "dept-cs", yearId: "year-3", strength: 60 },
  { id: "div-cs-4-a", name: "A", departmentId: "dept-cs", yearId: "year-4", strength: 60 },
  { id: "div-cs-4-b", name: "B", departmentId: "dept-cs", yearId: "year-4", strength: 60 },

  { id: "div-ee-1-a", name: "A", departmentId: "dept-ee", yearId: "year-1", strength: 60 },
  { id: "div-ee-2-a", name: "A", departmentId: "dept-ee", yearId: "year-2", strength: 60 },
  { id: "div-ee-3-a", name: "A", departmentId: "dept-ee", yearId: "year-3", strength: 60 },
  { id: "div-ee-4-a", name: "A", departmentId: "dept-ee", yearId: "year-4", strength: 60 },

  { id: "div-me-1-a", name: "A", departmentId: "dept-me", yearId: "year-1", strength: 60 },
  { id: "div-me-2-a", name: "A", departmentId: "dept-me", yearId: "year-2", strength: 60 },
  { id: "div-me-3-a", name: "A", departmentId: "dept-me", yearId: "year-3", strength: 60 },
  { id: "div-me-4-a", name: "A", departmentId: "dept-me", yearId: "year-4", strength: 60 },
]

// Time slots
export const timeSlots: TimeSlot[] = [
  { id: "slot-1", startTime: "09:00", endTime: "10:00", displayName: "09:00 - 10:00" },
  { id: "slot-2", startTime: "10:00", endTime: "11:00", displayName: "10:00 - 11:00" },
  { id: "slot-3", startTime: "11:00", endTime: "12:00", displayName: "11:00 - 12:00" },
  { id: "slot-4", startTime: "12:00", endTime: "13:00", displayName: "12:00 - 01:00", isBreak: true },
  { id: "slot-5", startTime: "13:00", endTime: "14:00", displayName: "01:00 - 02:00" },
  { id: "slot-6", startTime: "14:00", endTime: "15:00", displayName: "02:00 - 03:00" },
  { id: "slot-7", startTime: "15:00", endTime: "16:00", displayName: "03:00 - 04:00" },
  { id: "slot-8", startTime: "16:00", endTime: "17:00", displayName: "04:00 - 05:00" },
]

// Days
export const days: Day[] = [
  { id: "day-1", name: "Monday", shortName: "Mon", value: 1 },
  { id: "day-2", name: "Tuesday", shortName: "Tue", value: 2 },
  { id: "day-3", name: "Wednesday", shortName: "Wed", value: 3 },
  { id: "day-4", name: "Thursday", shortName: "Thu", value: 4 },
  { id: "day-5", name: "Friday", shortName: "Fri", value: 5 },
  { id: "day-6", name: "Saturday", shortName: "Sat", value: 6 },
]

// Helper functions
export function getDepartmentById(id: string): Department | undefined {
  return departments.find((dept) => dept.id === id)
}

export function getYearById(id: string): Year | undefined {
  return years.find((year) => year.id === id)
}

export function getSemesterById(id: string): Semester | undefined {
  return semesters.find((sem) => sem.id === id)
}

export function getDivisionById(id: string): Division | undefined {
  return divisions.find((div) => div.id === id)
}

export function getDayById(id: string): Day | undefined {
  return days.find((day) => day.id === id)
}

export function getTimeSlotById(id: string): TimeSlot | undefined {
  return timeSlots.find((slot) => slot.id === id)
}

export function getDivisionsByDepartmentAndYear(departmentId: string, yearId: string): Division[] {
  return divisions.filter((div) => div.departmentId === departmentId && div.yearId === yearId)
}

export function getSemestersByYear(yearId: string): Semester[] {
  const yearValue = years.find((y) => y.id === yearId)?.value
  if (!yearValue) return []

  const semesterValues = [yearValue * 2 - 1, yearValue * 2]
  return semesters.filter((sem) => semesterValues.includes(sem.value))
}

export function getSubjectsByDepartmentAndSemester(departmentId: string, semesterId: string): any[] {
  return []
}

