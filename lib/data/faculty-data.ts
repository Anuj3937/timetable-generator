// Faculty data and types

export type Faculty = {
  id: string
  name: string
  designation: string
  departmentId: string
  email: string
  phone: string
  specialization: string[]
  maxHoursPerWeek: number
  currentHoursPerWeek: number
  isAvailable: boolean
}

// Sample faculty data
export const facultyData: Faculty[] = [
  {
    id: "faculty-1",
    name: "Dr. Rajesh Kumar",
    designation: "Professor",
    departmentId: "dept-cs",
    email: "rajesh.kumar@college.edu",
    phone: "9876543210",
    specialization: ["Database Systems", "Data Mining", "Big Data Analytics"],
    maxHoursPerWeek: 16,
    currentHoursPerWeek: 12,
    isAvailable: true,
  },
  {
    id: "faculty-2",
    name: "Dr. Priya Sharma",
    designation: "Associate Professor",
    departmentId: "dept-cs",
    email: "priya.sharma@college.edu",
    phone: "9876543211",
    specialization: ["Computer Networks", "Network Security", "IoT"],
    maxHoursPerWeek: 18,
    currentHoursPerWeek: 14,
    isAvailable: true,
  },
  {
    id: "faculty-3",
    name: "Prof. Amit Singh",
    designation: "Assistant Professor",
    departmentId: "dept-cs",
    email: "amit.singh@college.edu",
    phone: "9876543212",
    specialization: ["Operating Systems", "Distributed Systems", "Cloud Computing"],
    maxHoursPerWeek: 20,
    currentHoursPerWeek: 16,
    isAvailable: true,
  },
  {
    id: "faculty-4",
    name: "Dr. Neha Gupta",
    designation: "Professor",
    departmentId: "dept-cs",
    email: "neha.gupta@college.edu",
    phone: "9876543213",
    specialization: ["Artificial Intelligence", "Machine Learning", "Deep Learning"],
    maxHoursPerWeek: 16,
    currentHoursPerWeek: 10,
    isAvailable: true,
  },
  {
    id: "faculty-5",
    name: "Prof. Sanjay Verma",
    designation: "Assistant Professor",
    departmentId: "dept-cs",
    email: "sanjay.verma@college.edu",
    phone: "9876543214",
    specialization: ["Web Technologies", "Mobile Computing", "Software Engineering"],
    maxHoursPerWeek: 20,
    currentHoursPerWeek: 18,
    isAvailable: true,
  },
  {
    id: "faculty-6",
    name: "Dr. Ananya Patel",
    designation: "Associate Professor",
    departmentId: "dept-cs",
    email: "ananya.patel@college.edu",
    phone: "9876543215",
    specialization: ["Data Structures", "Algorithms", "Competitive Programming"],
    maxHoursPerWeek: 18,
    currentHoursPerWeek: 12,
    isAvailable: true,
  },
  {
    id: "faculty-7",
    name: "Prof. Rahul Joshi",
    designation: "Assistant Professor",
    departmentId: "dept-cs",
    email: "rahul.joshi@college.edu",
    phone: "9876543216",
    specialization: ["Computer Graphics", "Image Processing", "Multimedia Systems"],
    maxHoursPerWeek: 20,
    currentHoursPerWeek: 15,
    isAvailable: true,
  },
  {
    id: "faculty-8",
    name: "Dr. Meera Desai",
    designation: "Professor",
    departmentId: "dept-cs",
    email: "meera.desai@college.edu",
    phone: "9876543217",
    specialization: ["Theory of Computation", "Compiler Design", "Formal Languages"],
    maxHoursPerWeek: 16,
    currentHoursPerWeek: 14,
    isAvailable: true,
  },
  {
    id: "faculty-9",
    name: "Dr. Suresh Mehta",
    designation: "Professor",
    departmentId: "dept-ee",
    email: "suresh.mehta@college.edu",
    phone: "9876543218",
    specialization: ["Power Systems", "Electrical Machines", "Control Systems"],
    maxHoursPerWeek: 16,
    currentHoursPerWeek: 12,
    isAvailable: true,
  },
  {
    id: "faculty-10",
    name: "Prof. Kavita Reddy",
    designation: "Assistant Professor",
    departmentId: "dept-ee",
    email: "kavita.reddy@college.edu",
    phone: "9876543219",
    specialization: ["Digital Electronics", "Microprocessors", "Embedded Systems"],
    maxHoursPerWeek: 20,
    currentHoursPerWeek: 16,
    isAvailable: true,
  },
  {
    id: "faculty-11",
    name: "Dr. Vikram Malhotra",
    designation: "Associate Professor",
    departmentId: "dept-me",
    email: "vikram.malhotra@college.edu",
    phone: "9876543220",
    specialization: ["Thermodynamics", "Fluid Mechanics", "Heat Transfer"],
    maxHoursPerWeek: 18,
    currentHoursPerWeek: 14,
    isAvailable: true,
  },
  {
    id: "faculty-12",
    name: "Prof. Deepak Sharma",
    designation: "Assistant Professor",
    departmentId: "dept-me",
    email: "deepak.sharma@college.edu",
    phone: "9876543221",
    specialization: ["Machine Design", "Manufacturing Processes", "CAD/CAM"],
    maxHoursPerWeek: 20,
    currentHoursPerWeek: 18,
    isAvailable: true,
  },
]

// Helper functions
export function getAllFaculty(): Faculty[] {
  return facultyData
}

export function getFacultyById(id: string): Faculty | undefined {
  return facultyData.find((faculty) => faculty.id === id)
}

export function getFacultyByDepartment(departmentId: string): Faculty[] {
  return facultyData.filter((faculty) => faculty.departmentId === departmentId)
}

export function getFacultyBySpecialization(specialization: string): Faculty[] {
  return facultyData.filter((faculty) =>
    faculty.specialization.some((spec) => spec.toLowerCase().includes(specialization.toLowerCase())),
  )
}

export function getAvailableFaculty(): Faculty[] {
  return facultyData.filter((faculty) => faculty.isAvailable)
}

// Function to update faculty workload
export function updateFacultyWorkload(id: string, hours: number): Faculty | null {
  const facultyIndex = facultyData.findIndex((f) => f.id === id)
  if (facultyIndex === -1) return null

  facultyData[facultyIndex].currentHoursPerWeek = hours
  return facultyData[facultyIndex]
}

// Function to check if faculty is available at a specific time
export function isFacultyAvailableAt(
  facultyId: string,
  dayId: string,
  timeSlotId: string,
  timetableData: any,
): boolean {
  const faculty = getFacultyById(facultyId)
  if (!faculty || !faculty.isAvailable) return false

  // Check if faculty is already assigned at this time
  for (const entry of timetableData) {
    if (entry.dayId === dayId && entry.timeSlotId === timeSlotId && entry.facultyId === facultyId) {
      return false
    }
  }

  return true
}

