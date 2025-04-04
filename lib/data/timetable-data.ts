// Timetable data and types
import { v4 as uuidv4 } from "uuid"

export type TimetableEntry = {
  id: string
  timetableId: string
  dayId: string
  timeSlotId: string
  subjectId: string
  facultyId: string
  classroomId: string
  divisionId: string
  isLab: boolean
}

export type Timetable = {
  id: string
  name: string
  departmentId: string
  yearId: string
  semesterId: string
  academicYear: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  entries: TimetableEntry[]
}

// Sample timetable data
export const timetableData: Timetable[] = [
  {
    id: "timetable-1",
    name: "CSE Year 1 Semester 1 - 2023-24",
    departmentId: "dept-cs",
    yearId: "year-1",
    semesterId: "sem-1",
    academicYear: "2023-24",
    isActive: true,
    createdAt: "2023-07-15T10:00:00Z",
    updatedAt: "2023-07-15T10:00:00Z",
    entries: [
      // Monday
      {
        id: "entry-1",
        timetableId: "timetable-1",
        dayId: "day-1",
        timeSlotId: "slot-1",
        subjectId: "subject-1",
        facultyId: "faculty-2",
        classroomId: "classroom-1",
        divisionId: "div-cs-1-a",
        isLab: false,
      },
      {
        id: "entry-2",
        timetableId: "timetable-1",
        dayId: "day-1",
        timeSlotId: "slot-2",
        subjectId: "subject-2",
        facultyId: "faculty-3",
        classroomId: "classroom-1",
        divisionId: "div-cs-1-a",
        isLab: false,
      },
      {
        id: "entry-3",
        timetableId: "timetable-1",
        dayId: "day-1",
        timeSlotId: "slot-3",
        subjectId: "subject-3",
        facultyId: "faculty-4",
        classroomId: "classroom-1",
        divisionId: "div-cs-1-a",
        isLab: false,
      },
      // Lunch break is handled by the UI
      {
        id: "entry-4",
        timetableId: "timetable-1",
        dayId: "day-1",
        timeSlotId: "slot-5",
        subjectId: "subject-4",
        facultyId: "faculty-1",
        classroomId: "classroom-1",
        divisionId: "div-cs-1-a",
        isLab: false,
      },
      {
        id: "entry-5",
        timetableId: "timetable-1",
        dayId: "day-1",
        timeSlotId: "slot-6",
        subjectId: "subject-4",
        facultyId: "faculty-1",
        classroomId: "classroom-9",
        divisionId: "div-cs-1-a",
        isLab: true,
      },
      {
        id: "entry-6",
        timetableId: "timetable-1",
        dayId: "day-1",
        timeSlotId: "slot-7",
        subjectId: "subject-4",
        facultyId: "faculty-1",
        classroomId: "classroom-9",
        divisionId: "div-cs-1-a",
        isLab: true,
      },

      // Tuesday
      {
        id: "entry-7",
        timetableId: "timetable-1",
        dayId: "day-2",
        timeSlotId: "slot-1",
        subjectId: "subject-3",
        facultyId: "faculty-4",
        classroomId: "classroom-1",
        divisionId: "div-cs-1-a",
        isLab: false,
      },
      {
        id: "entry-8",
        timetableId: "timetable-1",
        dayId: "day-2",
        timeSlotId: "slot-2",
        subjectId: "subject-1",
        facultyId: "faculty-2",
        classroomId: "classroom-1",
        divisionId: "div-cs-1-a",
        isLab: false,
      },
      {
        id: "entry-9",
        timetableId: "timetable-1",
        dayId: "day-2",
        timeSlotId: "slot-3",
        subjectId: "subject-2",
        facultyId: "faculty-3",
        classroomId: "classroom-1",
        divisionId: "div-cs-1-a",
        isLab: false,
      },
      // Lunch break
      {
        id: "entry-10",
        timetableId: "timetable-1",
        dayId: "day-2",
        timeSlotId: "slot-5",
        subjectId: "subject-2",
        facultyId: "faculty-3",
        classroomId: "classroom-15",
        divisionId: "div-cs-1-a",
        isLab: true,
      },
      {
        id: "entry-11",
        timetableId: "timetable-1",
        dayId: "day-2",
        timeSlotId: "slot-6",
        subjectId: "subject-2",
        facultyId: "faculty-3",
        classroomId: "classroom-15",
        divisionId: "div-cs-1-a",
        isLab: true,
      },
    ],
  },
]

// Helper functions
export function getAllTimetables(): Timetable[] {
  return timetableData
}

export function getTimetableById(id: string): Timetable | undefined {
  return timetableData.find((timetable) => timetable.id === id)
}

export function getTimetablesByDepartment(departmentId: string): Timetable[] {
  return timetableData.filter((timetable) => timetable.departmentId === departmentId)
}

export function getTimetablesByYear(yearId: string): Timetable[] {
  return timetableData.filter((timetable) => timetable.yearId === yearId)
}

export function getTimetablesBySemester(semesterId: string): Timetable[] {
  return timetableData.filter((timetable) => timetable.semesterId === semesterId)
}

export function getActiveTimetables(): Timetable[] {
  return timetableData.filter((timetable) => timetable.isActive)
}

export function getTimetableEntries(timetableId: string): TimetableEntry[] {
  const timetable = getTimetableById(timetableId)
  return timetable ? timetable.entries : []
}

export function getTimetableEntriesByDay(timetableId: string, dayId: string): TimetableEntry[] {
  const entries = getTimetableEntries(timetableId)
  return entries.filter((entry) => entry.dayId === dayId)
}

export function getTimetableEntriesByTimeSlot(timetableId: string, timeSlotId: string): TimetableEntry[] {
  const entries = getTimetableEntries(timetableId)
  return entries.filter((entry) => entry.timeSlotId === timeSlotId)
}

export function getTimetableEntriesByDivision(timetableId: string, divisionId: string): TimetableEntry[] {
  const entries = getTimetableEntries(timetableId)
  return entries.filter((entry) => entry.divisionId === divisionId)
}

export function getTimetableEntriesByFaculty(timetableId: string, facultyId: string): TimetableEntry[] {
  const entries = getTimetableEntries(timetableId)
  return entries.filter((entry) => entry.facultyId === facultyId)
}

export function getTimetableEntriesByClassroom(timetableId: string, classroomId: string): TimetableEntry[] {
  const entries = getTimetableEntries(timetableId)
  return entries.filter((entry) => entry.classroomId === classroomId)
}

export function createTimetable(
  name: string,
  departmentId: string,
  yearId: string,
  semesterId: string,
  academicYear: string,
): Timetable {
  const newTimetable: Timetable = {
    id: `timetable-${uuidv4()}`,
    name,
    departmentId,
    yearId,
    semesterId,
    academicYear,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    entries: [],
  }

  timetableData.push(newTimetable)
  return newTimetable
}

export function addTimetableEntry(
  timetableId: string,
  dayId: string,
  timeSlotId: string,
  subjectId: string,
  facultyId: string,
  classroomId: string,
  divisionId: string,
  isLab: boolean,
): TimetableEntry | null {
  const timetable = getTimetableById(timetableId)
  if (!timetable) return null

  const newEntry: TimetableEntry = {
    id: `entry-${uuidv4()}`,
    timetableId,
    dayId,
    timeSlotId,
    subjectId,
    facultyId,
    classroomId,
    divisionId,
    isLab,
  }

  timetable.entries.push(newEntry)
  timetable.updatedAt = new Date().toISOString()

  return newEntry
}

export function updateTimetableEntry(
  entryId: string,
  updates: Partial<Omit<TimetableEntry, "id" | "timetableId">>,
): TimetableEntry | null {
  for (const timetable of timetableData) {
    const entryIndex = timetable.entries.findIndex((entry) => entry.id === entryId)
    if (entryIndex !== -1) {
      timetable.entries[entryIndex] = {
        ...timetable.entries[entryIndex],
        ...updates,
      }
      timetable.updatedAt = new Date().toISOString()
      return timetable.entries[entryIndex]
    }
  }

  return null
}

export function deleteTimetableEntry(entryId: string): boolean {
  for (const timetable of timetableData) {
    const entryIndex = timetable.entries.findIndex((entry) => entry.id === entryId)
    if (entryIndex !== -1) {
      timetable.entries.splice(entryIndex, 1)
      timetable.updatedAt = new Date().toISOString()
      return true
    }
  }

  return false
}

export function deleteTimetable(timetableId: string): boolean {
  const timetableIndex = timetableData.findIndex((timetable) => timetable.id === timetableId)
  if (timetableIndex !== -1) {
    timetableData.splice(timetableIndex, 1)
    return true
  }

  return false
}

