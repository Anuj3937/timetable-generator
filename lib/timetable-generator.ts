import {
  days,
  timeSlots,
  getDivisionsByDepartmentAndYear,
  getSubjectsByDepartmentAndSemester,
} from "./data/academic-structure"
import { getFacultyByDepartment, isFacultyAvailableAt } from "./data/faculty-data"
import { getAvailableClassroomsByType, isClassroomAvailableAt } from "./data/classroom-data"
import { createTimetable, addTimetableEntry, type TimetableEntry, type Timetable } from "./data/timetable-data"

// Types for timetable generation
export type GenerationOptions = {
  departmentId: string
  yearId: string
  semesterId: string
  academicYear: string
  preferences: {
    balanceFacultyLoad: boolean
    matchRoomType: boolean
    minimizeGaps: boolean
    preventConflicts: boolean
    includeLunchBreak: boolean
    balanceLabTheory: boolean
  }
  onProgress?: (progress: number, stage: string) => void
}

export type GenerationResult = {
  timetable: Timetable
  conflicts: string[]
  success: boolean
}

// Main timetable generation function
export async function generateTimetable(options: GenerationOptions): Promise<GenerationResult> {
  const { departmentId, yearId, semesterId, academicYear, preferences, onProgress } = options

  const conflicts: string[] = []

  try {
    // Step 1: Initialize data
    onProgress?.(5, "Initializing timetable generation...")

    // Create a new timetable
    const timetableName = `${departmentId.split("-")[1].toUpperCase()} Year ${yearId.split("-")[1]} Semester ${semesterId.split("-")[1]} - ${academicYear}`
    const timetable = createTimetable(timetableName, departmentId, yearId, semesterId, academicYear)

    // Get divisions for this department and year
    const divisions = getDivisionsByDepartmentAndYear(departmentId, yearId)
    if (divisions.length === 0) {
      throw new Error(`No divisions found for department ${departmentId} and year ${yearId}`)
    }

    // Get subjects for this department and semester
    onProgress?.(10, "Loading subjects...")
    const subjects = getSubjectsByDepartmentAndSemester(departmentId, semesterId)
    if (subjects.length === 0) {
      throw new Error(`No subjects found for department ${departmentId} and semester ${semesterId}`)
    }

    // Get faculty for this department
    onProgress?.(15, "Loading faculty...")
    const faculty = getFacultyByDepartment(departmentId)
    if (faculty.length === 0) {
      throw new Error(`No faculty found for department ${departmentId}`)
    }

    // Get classrooms
    onProgress?.(20, "Loading classrooms...")
    const theoryClassrooms = getAvailableClassroomsByType("Theory")
    const labClassrooms = getAvailableClassroomsByType("Lab")

    if (theoryClassrooms.length === 0) {
      throw new Error("No theory classrooms available")
    }

    if (labClassrooms.length === 0) {
      throw new Error("No lab classrooms available")
    }

    // Step 2: Generate timetable for each division
    onProgress?.(25, "Generating timetable for divisions...")

    for (const division of divisions) {
      onProgress?.(
        30 + (divisions.indexOf(division) / divisions.length) * 30,
        `Generating timetable for division ${division.name}...`,
      )

      // Step 2.1: Assign theory classes
      const theorySubjects = subjects.filter((s) => s.type === "Theory" || s.type === "Both")

      for (const subject of theorySubjects) {
        // Calculate how many sessions we need based on theory hours
        // Assuming each session is 1 hour
        const sessionsNeeded = subject.theoryHours
        let sessionsAssigned = 0

        // Sort faculty by workload if balancing is enabled
        let eligibleFaculty = faculty.filter((f) =>
          f.specialization.some(
            (spec) =>
              subject.name.toLowerCase().includes(spec.toLowerCase()) ||
              spec.toLowerCase().includes(subject.name.toLowerCase()),
          ),
        )

        if (eligibleFaculty.length === 0) {
          // If no specialized faculty, take any faculty
          eligibleFaculty = faculty
        }

        if (preferences.balanceFacultyLoad) {
          eligibleFaculty.sort((a, b) => a.currentHoursPerWeek - b.currentHoursPerWeek)
        }

        // Try to assign sessions
        while (sessionsAssigned < sessionsNeeded) {
          let assigned = false

          // Try each day
          for (const day of days) {
            if (assigned) break

            // Try each time slot
            for (const timeSlot of timeSlots) {
              if (assigned) break

              // Skip lunch break
              if (timeSlot.isBreak && preferences.includeLunchBreak) continue

              // Check if this slot is already assigned for this division
              const existingEntry = timetable.entries.find(
                (entry) =>
                  entry.dayId === day.id && entry.timeSlotId === timeSlot.id && entry.divisionId === division.id,
              )

              if (existingEntry) continue

              // Try each faculty
              for (const f of eligibleFaculty) {
                if (assigned) break

                // Check if faculty is available
                const facultyAvailable = isFacultyAvailableAt(f.id, day.id, timeSlot.id, timetable.entries)

                if (!facultyAvailable) continue

                // Try each classroom
                for (const classroom of theoryClassrooms) {
                  if (assigned) break

                  // Check if classroom is available
                  const classroomAvailable = isClassroomAvailableAt(
                    classroom.id,
                    day.id,
                    timeSlot.id,
                    timetable.entries,
                  )

                  if (!classroomAvailable) continue

                  // Assign the class
                  const entry = addTimetableEntry(
                    timetable.id,
                    day.id,
                    timeSlot.id,
                    subject.id,
                    f.id,
                    classroom.id,
                    division.id,
                    false, // Not a lab
                  )

                  if (entry) {
                    assigned = true
                    sessionsAssigned++

                    // Update faculty workload
                    f.currentHoursPerWeek += 1
                  }
                }
              }
            }
          }

          if (!assigned) {
            conflicts.push(`Could not assign all theory sessions for ${subject.name} (Division ${division.name})`)
            break
          }
        }
      }

      // Step 2.2: Assign lab classes
      const labSubjects = subjects.filter((s) => s.type === "Lab" || s.type === "Both")

      for (const subject of labSubjects) {
        // Calculate how many lab sessions we need
        // Lab sessions are typically 2 hours consecutive
        const labSessionsNeeded = Math.ceil(subject.practicalHours / 2)
        let labSessionsAssigned = 0

        // Find eligible faculty
        let eligibleFaculty = faculty.filter((f) =>
          f.specialization.some(
            (spec) =>
              subject.name.toLowerCase().includes(spec.toLowerCase()) ||
              spec.toLowerCase().includes(subject.name.toLowerCase()),
          ),
        )

        if (eligibleFaculty.length === 0) {
          // If no specialized faculty, take any faculty
          eligibleFaculty = faculty
        }

        if (preferences.balanceFacultyLoad) {
          eligibleFaculty.sort((a, b) => a.currentHoursPerWeek - b.currentHoursPerWeek)
        }

        // Try to assign lab sessions
        while (labSessionsAssigned < labSessionsNeeded) {
          let assigned = false

          // Try each day
          for (const day of days) {
            if (assigned) break

            // For labs, we need two consecutive slots
            for (let i = 0; i < timeSlots.length - 1; i++) {
              if (assigned) break

              const firstSlot = timeSlots[i]
              const secondSlot = timeSlots[i + 1]

              // Skip if either slot is a break
              if ((firstSlot.isBreak || secondSlot.isBreak) && preferences.includeLunchBreak) continue

              // Check if these slots are already assigned for this division
              const existingEntry1 = timetable.entries.find(
                (entry) =>
                  entry.dayId === day.id && entry.timeSlotId === firstSlot.id && entry.divisionId === division.id,
              )

              const existingEntry2 = timetable.entries.find(
                (entry) =>
                  entry.dayId === day.id && entry.timeSlotId === secondSlot.id && entry.divisionId === division.id,
              )

              if (existingEntry1 || existingEntry2) continue

              // Try each faculty
              for (const f of eligibleFaculty) {
                if (assigned) break

                // Check if faculty is available for both slots
                const facultyAvailable1 = isFacultyAvailableAt(f.id, day.id, firstSlot.id, timetable.entries)

                const facultyAvailable2 = isFacultyAvailableAt(f.id, day.id, secondSlot.id, timetable.entries)

                if (!facultyAvailable1 || !facultyAvailable2) continue

                // Try each lab classroom
                for (const classroom of labClassrooms) {
                  if (assigned) break

                  // Check if classroom is available for both slots
                  const classroomAvailable1 = isClassroomAvailableAt(
                    classroom.id,
                    day.id,
                    firstSlot.id,
                    timetable.entries,
                  )

                  const classroomAvailable2 = isClassroomAvailableAt(
                    classroom.id,
                    day.id,
                    secondSlot.id,
                    timetable.entries,
                  )

                  if (!classroomAvailable1 || !classroomAvailable2) continue

                  // Assign the lab class to both slots
                  const entry1 = addTimetableEntry(
                    timetable.id,
                    day.id,
                    firstSlot.id,
                    subject.id,
                    f.id,
                    classroom.id,
                    division.id,
                    true, // Is a lab
                  )

                  const entry2 = addTimetableEntry(
                    timetable.id,
                    day.id,
                    secondSlot.id,
                    subject.id,
                    f.id,
                    classroom.id,
                    division.id,
                    true, // Is a lab
                  )

                  if (entry1 && entry2) {
                    assigned = true
                    labSessionsAssigned++

                    // Update faculty workload
                    f.currentHoursPerWeek += 2
                  }
                }
              }
            }
          }

          if (!assigned) {
            conflicts.push(`Could not assign all lab sessions for ${subject.name} (Division ${division.name})`)
            break
          }
        }
      }
    }

    // Step 3: Optimize timetable if needed
    onProgress?.(80, "Optimizing timetable...")

    // Minimize gaps if requested
    if (preferences.minimizeGaps) {
      for (const division of divisions) {
        for (const day of days) {
          // Get all entries for this division and day
          const dayEntries = timetable.entries.filter(
            (entry) => entry.dayId === day.id && entry.divisionId === division.id,
          )

          // Sort by time slot
          dayEntries.sort((a, b) => {
            const slotA = timeSlots.findIndex((slot) => slot.id === a.timeSlotId)
            const slotB = timeSlots.findIndex((slot) => slot.id === b.timeSlotId)
            return slotA - slotB
          })

          // Find gaps and try to move classes
          for (let i = 1; i < dayEntries.length; i++) {
            const prevEntry = dayEntries[i - 1]
            const currEntry = dayEntries[i]

            const prevSlotIndex = timeSlots.findIndex((slot) => slot.id === prevEntry.timeSlotId)
            const currSlotIndex = timeSlots.findIndex((slot) => slot.id === currEntry.timeSlotId)

            // If there's a gap (more than 1 slot difference, accounting for lunch)
            if (currSlotIndex - prevSlotIndex > 1) {
              // Try to move the current class earlier
              for (let j = prevSlotIndex + 1; j < currSlotIndex; j++) {
                const targetSlot = timeSlots[j]

                // Skip lunch break
                if (targetSlot.isBreak && preferences.includeLunchBreak) continue

                // Check if faculty and classroom are available at this time
                const facultyAvailable = isFacultyAvailableAt(
                  currEntry.facultyId,
                  day.id,
                  targetSlot.id,
                  timetable.entries.filter((e) => e.id !== currEntry.id), // Exclude current entry
                )

                const classroomAvailable = isClassroomAvailableAt(
                  currEntry.classroomId,
                  day.id,
                  targetSlot.id,
                  timetable.entries.filter((e) => e.id !== currEntry.id), // Exclude current entry
                )

                if (facultyAvailable && classroomAvailable) {
                  // Move the class
                  const entryIndex = timetable.entries.findIndex((e) => e.id === currEntry.id)
                  if (entryIndex !== -1) {
                    timetable.entries[entryIndex].timeSlotId = targetSlot.id
                    break
                  }
                }
              }
            }
          }
        }
      }
    }

    // Step 4: Final validation
    onProgress?.(90, "Performing final validation...")

    // Check for any remaining conflicts
    const validationConflicts = validateTimetable(timetable)
    conflicts.push(...validationConflicts)

    onProgress?.(100, "Timetable generation complete!")

    return {
      timetable,
      conflicts,
      success: true,
    }
  } catch (error) {
    return {
      timetable: {
        id: "",
        name: "",
        departmentId,
        yearId,
        semesterId,
        academicYear,
        isActive: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        entries: [],
      },
      conflicts: [error instanceof Error ? error.message : "Unknown error occurred"],
      success: false,
    }
  }
}

// Helper function to validate a timetable
function validateTimetable(timetable: Timetable): string[] {
  const conflicts: string[] = []

  // Check for faculty conflicts (same faculty assigned to different classes at the same time)
  for (const day of days) {
    for (const timeSlot of timeSlots) {
      const entriesAtTime = timetable.entries.filter(
        (entry) => entry.dayId === day.id && entry.timeSlotId === timeSlot.id,
      )

      // Check faculty conflicts
      const facultyAssignments = new Map<string, TimetableEntry>()

      for (const entry of entriesAtTime) {
        if (facultyAssignments.has(entry.facultyId)) {
          const existingEntry = facultyAssignments.get(entry.facultyId)!
          conflicts.push(
            `Faculty conflict: Faculty ${entry.facultyId} is assigned to multiple classes on ${day.name} at ${timeSlot.displayName}`,
          )
        } else {
          facultyAssignments.set(entry.facultyId, entry)
        }
      }

      // Check classroom conflicts
      const classroomAssignments = new Map<string, TimetableEntry>()

      for (const entry of entriesAtTime) {
        if (classroomAssignments.has(entry.classroomId)) {
          const existingEntry = classroomAssignments.get(entry.classroomId)!
          conflicts.push(
            `Classroom conflict: Classroom ${entry.classroomId} is assigned to multiple classes on ${day.name} at ${timeSlot.displayName}`,
          )
        } else {
          classroomAssignments.set(entry.classroomId, entry)
        }
      }
    }
  }

  return conflicts
}

// Function to detect conflicts in a timetable
export function detectConflicts(timetable: Timetable): {
  type: "faculty" | "classroom"
  dayId: string
  timeSlotId: string
  conflictingEntries: TimetableEntry[]
}[] {
  const conflicts: {
    type: "faculty" | "classroom"
    dayId: string
    timeSlotId: string
    conflictingEntries: TimetableEntry[]
  }[] = []

  // Check for faculty conflicts
  for (const day of days) {
    for (const timeSlot of timeSlots) {
      const entriesAtTime = timetable.entries.filter(
        (entry) => entry.dayId === day.id && entry.timeSlotId === timeSlot.id,
      )

      // Check faculty conflicts
      const facultyAssignments = new Map<string, TimetableEntry[]>()

      for (const entry of entriesAtTime) {
        if (!facultyAssignments.has(entry.facultyId)) {
          facultyAssignments.set(entry.facultyId, [])
        }
        facultyAssignments.get(entry.facultyId)!.push(entry)
      }

      // Find conflicts
      for (const [facultyId, entries] of facultyAssignments.entries()) {
        if (entries.length > 1) {
          conflicts.push({
            type: "faculty",
            dayId: day.id,
            timeSlotId: timeSlot.id,
            conflictingEntries: entries,
          })
        }
      }

      // Check classroom conflicts
      const classroomAssignments = new Map<string, TimetableEntry[]>()

      for (const entry of entriesAtTime) {
        if (!classroomAssignments.has(entry.classroomId)) {
          classroomAssignments.set(entry.classroomId, [])
        }
        classroomAssignments.get(entry.classroomId)!.push(entry)
      }

      // Find conflicts
      for (const [classroomId, entries] of classroomAssignments.entries()) {
        if (entries.length > 1) {
          conflicts.push({
            type: "classroom",
            dayId: day.id,
            timeSlotId: timeSlot.id,
            conflictingEntries: entries,
          })
        }
      }
    }
  }

  return conflicts
}

// Function to resolve a conflict
export function resolveConflict(
  timetable: Timetable,
  conflict: {
    type: "faculty" | "classroom"
    dayId: string
    timeSlotId: string
    conflictingEntries: TimetableEntry[]
  },
  resolution: {
    entryId: string
    updates: {
      facultyId?: string
      classroomId?: string
      dayId?: string
      timeSlotId?: string
    }
  },
): Timetable {
  // Create a copy of the timetable
  const updatedTimetable: Timetable = {
    ...timetable,
    entries: [...timetable.entries],
  }

  // Find the entry to update
  const entryIndex = updatedTimetable.entries.findIndex((entry) => entry.id === resolution.entryId)

  if (entryIndex !== -1) {
    // Update the entry
    updatedTimetable.entries[entryIndex] = {
      ...updatedTimetable.entries[entryIndex],
      ...resolution.updates,
    }

    updatedTimetable.updatedAt = new Date().toISOString()
  }

  return updatedTimetable
}

