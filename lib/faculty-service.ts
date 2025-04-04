// Mock faculty data service
// In a real application, this would fetch data from a database

interface Faculty {
  id: string
  name: string
  department: string
  specialization: string
  email: string
  phone: string
  maxHours: number
  currentHours: number
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

// Sample faculty data
const facultyData: Faculty[] = [
  {
    id: "f1",
    name: "Dr. Johnson",
    department: "Computer Science",
    specialization: "Database Systems, Data Mining",
    email: "johnson@university.edu",
    phone: "555-1234",
    maxHours: 20,
    currentHours: 16,
  },
  {
    id: "f2",
    name: "Dr. Smith",
    department: "Mathematics",
    specialization: "Calculus, Linear Algebra",
    email: "smith@university.edu",
    phone: "555-2345",
    maxHours: 18,
    currentHours: 12,
  },
  {
    id: "f3",
    name: "Prof. Williams",
    department: "Physics",
    specialization: "Quantum Mechanics, Optics",
    email: "williams@university.edu",
    phone: "555-3456",
    maxHours: 16,
    currentHours: 14,
  },
  {
    id: "f4",
    name: "Dr. Brown",
    department: "Chemistry",
    specialization: "Organic Chemistry, Biochemistry",
    email: "brown@university.edu",
    phone: "555-4567",
    maxHours: 20,
    currentHours: 18,
  },
  {
    id: "f5",
    name: "Prof. Davis",
    department: "Electrical Engineering",
    specialization: "Digital Electronics, Micro  Davis",
    department: "Electrical Engineering",
    specialization: "Digital Electronics, Microprocessors",
    email: "davis@university.edu",
    phone: "555-5678",
    maxHours: 18,
    currentHours: 16,
  },
  {
    id: "f6",
    name: "Dr. Miller",
    department: "Computer Science",
    specialization: "Computer Architecture, Operating Systems",
    email: "miller@university.edu",
    phone: "555-6789",
    maxHours: 20,
    currentHours: 10,
  },
  {
    id: "f7",
    name: "Prof. Wilson",
    department: "Mechanical Engineering",
    specialization: "Thermodynamics, Fluid Mechanics",
    email: "wilson@university.edu",
    phone: "555-7890",
    maxHours: 16,
    currentHours: 14,
  },
  {
    id: "f8",
    name: "Dr. Taylor",
    department: "Computer Science",
    specialization: "Data Structures, Algorithms",
    email: "taylor@university.edu",
    phone: "555-8901",
    maxHours: 18,
    currentHours: 8,
  },
  {
    id: "f9",
    name: "Prof. Anderson",
    department: "Computer Science",
    specialization: "Computer Networks, Network Security",
    email: "anderson@university.edu",
    phone: "555-9012",
    maxHours: 20,
    currentHours: 12,
  },
  {
    id: "f10",
    name: "Dr. Thomas",
    department: "Computer Science",
    specialization: "Operating Systems, Distributed Systems",
    email: "thomas@university.edu",
    phone: "555-0123",
    maxHours: 18,
    currentHours: 14,
  },
]

// Function to get faculty by department
export async function getFaculty(department?: string): Promise<Faculty[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!department) {
    return facultyData
  }

  // Convert department code to full name for filtering
  const departmentMap: Record<string, string> = {
    cs: "Computer Science",
    ee: "Electrical Engineering",
    me: "Mechanical Engineering",
    ce: "Civil Engineering",
    ec: "Electronics Engineering",
  }

  const departmentName = departmentMap[department] || department

  return facultyData.filter((faculty) => faculty.department === departmentName)
}

// Function to get a single faculty by ID
export async function getFacultyById(id: string): Promise<Faculty | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const faculty = facultyData.find((f) => f.id === id)
  return faculty || null
}

// Function to update faculty workload
export async function updateFacultyWorkload(id: string, hours: number): Promise<Faculty | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const facultyIndex = facultyData.findIndex((f) => f.id === id)
  if (facultyIndex === -1) return null

  facultyData[facultyIndex].currentHours = hours
  return facultyData[facultyIndex]
}

// Function to get available faculty for a specific time slot
export async function getAvailableFaculty(
  day: string,
  timeSlot: string,
  timetableData: TimetableData,
): Promise<Faculty[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Filter out faculty that are already assigned at this time slot
  return facultyData.filter((faculty) => {
    // Check if the faculty is already assigned to another class at this time
    for (const [existingDay, daySchedule] of Object.entries(timetableData)) {
      if (existingDay === day) {
        for (const [existingSlot, cell] of Object.entries(daySchedule)) {
          if (existingSlot === timeSlot && cell.faculty === faculty.name) {
            return false
          }
        }
      }
    }

    return true
  })
}

