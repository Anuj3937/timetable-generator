// Mock classroom data service
// In a real application, this would fetch data from a database

interface Classroom {
  id: string
  roomNumber: string
  floor: number
  capacity: number
  type: "Theory" | "Lab"
  hasProjector: boolean
  hasComputers: boolean
  isAvailable: boolean
}

interface TimetableCell {
  subject: string
  faculty: string
  room: string
  type: "Theory" | "Lab" | ""
}

interface TimetableData {
  [day: string]: {
    [timeSlot: string]: TimetableCell
  }
}

// Generate classrooms based on requirements
function generateClassrooms(): Classroom[] {
  const classrooms: Classroom[] = []

  // Generate rooms 001 to 020
  for (let i = 1; i <= 20; i++) {
    const roomNumber = i.toString().padStart(3, "0")
    const floor = Math.floor(i / 100)

    // Determine if it's a lab (008, 013, 018-020)
    const isLab = [8, 13, 18, 19, 20].includes(i)

    classrooms.push({
      id: `room-${roomNumber}`,
      roomNumber,
      floor,
      capacity: isLab ? 30 : 60,
      type: isLab ? "Lab" : "Theory",
      hasProjector: true,
      hasComputers: isLab,
      isAvailable: true,
    })
  }

  // Add rooms for other floors (101, 102, etc.)
  for (let floor = 1; floor <= 2; floor++) {
    for (let i = 1; i <= 10; i++) {
      const roomNumber = `${floor}${i.toString().padStart(2, "0")}`
      const isLab = [8, 10].includes(i)

      classrooms.push({
        id: `room-${roomNumber}`,
        roomNumber,
        floor,
        capacity: isLab ? 30 : 60,
        type: isLab ? "Lab" : "Theory",
        hasProjector: true,
        hasComputers: isLab,
        isAvailable: true,
      })
    }
  }

  return classrooms
}

const classroomData = generateClassrooms()

// Function to get all classrooms
export async function getClassrooms(type?: "Theory" | "Lab", floor?: number): Promise<Classroom[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredClassrooms = [...classroomData]

  if (type) {
    filteredClassrooms = filteredClassrooms.filter((classroom) => classroom.type === type)
  }

  if (floor !== undefined) {
    filteredClassrooms = filteredClassrooms.filter((classroom) => classroom.floor === floor)
  }

  return filteredClassrooms
}

// Function to get a single classroom by ID
export async function getClassroomById(id: string): Promise<Classroom | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const classroom = classroomData.find((c) => c.id === id)
  return classroom || null
}

// Function to get a single classroom by room number
export async function getClassroomByRoomNumber(roomNumber: string): Promise<Classroom | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const classroom = classroomData.find((c) => c.roomNumber === roomNumber)
  return classroom || null
}

// Function to update classroom availability
export async function updateClassroomAvailability(id: string, isAvailable: boolean): Promise<Classroom | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const classroomIndex = classroomData.findIndex((c) => c.id === id)
  if (classroomIndex === -1) return null

  classroomData[classroomIndex].isAvailable = isAvailable
  return classroomData[classroomIndex]
}

// Function to get available classrooms for a specific time slot
export async function getAvailableClassrooms(
  day: string,
  timeSlot: string,
  requiredType: "Theory" | "Lab" | "",
  timetableData: TimetableData,
): Promise<Classroom[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Get all classrooms of the required type
  const classrooms = classroomData.filter((c) => c.isAvailable && (requiredType === "" || c.type === requiredType))

  // Filter out classrooms that are already assigned at this time slot
  return classrooms.filter((classroom) => {
    // Check if the classroom is already assigned to another class at this time
    for (const [existingDay, daySchedule] of Object.entries(timetableData)) {
      if (existingDay === day) {
        for (const [existingSlot, cell] of Object.entries(daySchedule)) {
          if (existingSlot === timeSlot && cell.room === classroom.roomNumber) {
            return false
          }
        }
      }
    }

    return true
  })
}

