// Classroom data and types

export type ClassroomType = "Theory" | "Lab" | "Seminar" | "Workshop"

export type Classroom = {
  id: string
  roomNumber: string
  building: string
  floor: number
  capacity: number
  type: ClassroomType
  hasProjector: boolean
  hasComputers: boolean
  hasAC: boolean
  isAvailable: boolean
}

// Sample classroom data
export const classroomData: Classroom[] = [
  // Theory Classrooms - Main Building
  {
    id: "classroom-1",
    roomNumber: "MB-101",
    building: "Main Building",
    floor: 1,
    capacity: 60,
    type: "Theory",
    hasProjector: true,
    hasComputers: false,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-2",
    roomNumber: "MB-102",
    building: "Main Building",
    floor: 1,
    capacity: 60,
    type: "Theory",
    hasProjector: true,
    hasComputers: false,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-3",
    roomNumber: "MB-103",
    building: "Main Building",
    floor: 1,
    capacity: 60,
    type: "Theory",
    hasProjector: true,
    hasComputers: false,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-4",
    roomNumber: "MB-104",
    building: "Main Building",
    floor: 1,
    capacity: 60,
    type: "Theory",
    hasProjector: true,
    hasComputers: false,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-5",
    roomNumber: "MB-201",
    building: "Main Building",
    floor: 2,
    capacity: 60,
    type: "Theory",
    hasProjector: true,
    hasComputers: false,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-6",
    roomNumber: "MB-202",
    building: "Main Building",
    floor: 2,
    capacity: 60,
    type: "Theory",
    hasProjector: true,
    hasComputers: false,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-7",
    roomNumber: "MB-203",
    building: "Main Building",
    floor: 2,
    capacity: 60,
    type: "Theory",
    hasProjector: true,
    hasComputers: false,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-8",
    roomNumber: "MB-204",
    building: "Main Building",
    floor: 2,
    capacity: 60,
    type: "Theory",
    hasProjector: true,
    hasComputers: false,
    hasAC: true,
    isAvailable: true,
  },

  // Computer Labs - CS Building
  {
    id: "classroom-9",
    roomNumber: "CS-101",
    building: "CS Building",
    floor: 1,
    capacity: 30,
    type: "Lab",
    hasProjector: true,
    hasComputers: true,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-10",
    roomNumber: "CS-102",
    building: "CS Building",
    floor: 1,
    capacity: 30,
    type: "Lab",
    hasProjector: true,
    hasComputers: true,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-11",
    roomNumber: "CS-103",
    building: "CS Building",
    floor: 1,
    capacity: 30,
    type: "Lab",
    hasProjector: true,
    hasComputers: true,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-12",
    roomNumber: "CS-201",
    building: "CS Building",
    floor: 2,
    capacity: 30,
    type: "Lab",
    hasProjector: true,
    hasComputers: true,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-13",
    roomNumber: "CS-202",
    building: "CS Building",
    floor: 2,
    capacity: 30,
    type: "Lab",
    hasProjector: true,
    hasComputers: true,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-14",
    roomNumber: "CS-203",
    building: "CS Building",
    floor: 2,
    capacity: 30,
    type: "Lab",
    hasProjector: true,
    hasComputers: true,
    hasAC: true,
    isAvailable: true,
  },

  // Electronics Labs - EC Building
  {
    id: "classroom-15",
    roomNumber: "EC-101",
    building: "EC Building",
    floor: 1,
    capacity: 30,
    type: "Lab",
    hasProjector: true,
    hasComputers: true,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-16",
    roomNumber: "EC-102",
    building: "EC Building",
    floor: 1,
    capacity: 30,
    type: "Lab",
    hasProjector: true,
    hasComputers: true,
    hasAC: true,
    isAvailable: true,
  },

  // Mechanical Labs - ME Building
  {
    id: "classroom-17",
    roomNumber: "ME-101",
    building: "ME Building",
    floor: 1,
    capacity: 30,
    type: "Lab",
    hasProjector: true,
    hasComputers: false,
    hasAC: false,
    isAvailable: true,
  },
  {
    id: "classroom-18",
    roomNumber: "ME-102",
    building: "ME Building",
    floor: 1,
    capacity: 30,
    type: "Workshop",
    hasProjector: false,
    hasComputers: false,
    hasAC: false,
    isAvailable: true,
  },

  // Seminar Halls
  {
    id: "classroom-19",
    roomNumber: "SH-101",
    building: "Main Building",
    floor: 1,
    capacity: 100,
    type: "Seminar",
    hasProjector: true,
    hasComputers: true,
    hasAC: true,
    isAvailable: true,
  },
  {
    id: "classroom-20",
    roomNumber: "SH-201",
    building: "Main Building",
    floor: 2,
    capacity: 150,
    type: "Seminar",
    hasProjector: true,
    hasComputers: true,
    hasAC: true,
    isAvailable: true,
  },
]

// Helper functions
export function getAllClassrooms(): Classroom[] {
  return classroomData
}

export function getClassroomById(id: string): Classroom | undefined {
  return classroomData.find((classroom) => classroom.id === id)
}

export function getClassroomByRoomNumber(roomNumber: string): Classroom | undefined {
  return classroomData.find((classroom) => classroom.roomNumber === roomNumber)
}

export function getClassroomsByType(type: ClassroomType): Classroom[] {
  return classroomData.filter((classroom) => classroom.type === type)
}

export function getClassroomsByBuilding(building: string): Classroom[] {
  return classroomData.filter((classroom) => classroom.building === building)
}

export function getClassroomsByFloor(floor: number): Classroom[] {
  return classroomData.filter((classroom) => classroom.floor === floor)
}

export function getAvailableClassrooms(): Classroom[] {
  return classroomData.filter((classroom) => classroom.isAvailable)
}

export function getAvailableClassroomsByType(type: ClassroomType): Classroom[] {
  return classroomData.filter((classroom) => classroom.isAvailable && classroom.type === type)
}

// Function to update classroom availability
export function updateClassroomAvailability(id: string, isAvailable: boolean): Classroom | null {
  const classroomIndex = classroomData.findIndex((c) => c.id === id)
  if (classroomIndex === -1) return null

  classroomData[classroomIndex].isAvailable = isAvailable
  return classroomData[classroomIndex]
}

// Function to check if classroom is available at a specific time
export function isClassroomAvailableAt(
  classroomId: string,
  dayId: string,
  timeSlotId: string,
  timetableData: any,
): boolean {
  const classroom = getClassroomById(classroomId)
  if (!classroom || !classroom.isAvailable) return false

  // Check if classroom is already assigned at this time
  for (const entry of timetableData) {
    if (entry.dayId === dayId && entry.timeSlotId === timeSlotId && entry.classroomId === classroomId) {
      return false
    }
  }

  return true
}

