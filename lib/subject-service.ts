// Mock subject data service
// In a real application, this would fetch data from a database

interface Subject {
  id: string
  name: string
  code: string
  department: string
  year: "1" | "2" | "3" | "4"
  semester: "Fall" | "Spring" | "Summer"
  credits: number
  theoryHours: number
  labHours: number
  type: "Theory" | "Lab" | "Both"
}

// Sample subject data
const subjectData: Subject[] = [
  {
    id: "s1",
    name: "Database Systems",
    code: "CS301",
    department: "Computer Science",
    year: "3",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
  {
    id: "s2",
    name: "Computer Networks",
    code: "CS302",
    department: "Computer Science",
    year: "3",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
  {
    id: "s3",
    name: "Operating Systems",
    code: "CS303",
    department: "Computer Science",
    year: "3",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
  {
    id: "s4",
    name: "Calculus I",
    code: "MATH101",
    department: "Mathematics",
    year: "1",
    semester: "Fall",
    credits: 3,
    theoryHours: 3,
    labHours: 0,
    type: "Theory",
  },
  {
    id: "s5",
    name: "Physics I",
    code: "PHY101",
    department: "Physics",
    year: "1",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
  {
    id: "s6",
    name: "Digital Electronics",
    code: "EE201",
    department: "Electrical Engineering",
    year: "2",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
  {
    id: "s7",
    name: "Thermodynamics",
    code: "ME301",
    department: "Mechanical Engineering",
    year: "3",
    semester: "Fall",
    credits: 3,
    theoryHours: 3,
    labHours: 0,
    type: "Theory",
  },
  {
    id: "s8",
    name: "Data Structures",
    code: "CS201",
    department: "Computer Science",
    year: "2",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
  {
    id: "s9",
    name: "Algorithms",
    code: "CS202",
    department: "Computer Science",
    year: "2",
    semester: "Fall",
    credits: 3,
    theoryHours: 3,
    labHours: 0,
    type: "Theory",
  },
  {
    id: "s10",
    name: "Programming Fundamentals",
    code: "CS101",
    department: "Computer Science",
    year: "1",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
]

// Function to get subjects by department, year, and semester
export async function getSubjects(department?: string, year?: string, semester?: string): Promise<Subject[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredSubjects = [...subjectData]

  // Convert department code to full name for filtering
  if (department) {
    const departmentMap: Record<string, string> = {
      cs: "Computer Science",
      ee: "Electrical Engineering",
      me: "Mechanical Engineering",
      ce: "Civil Engineering",
      ec: "Electronics Engineering",
    }

    const departmentName = departmentMap[department] || department
    filteredSubjects = filteredSubjects.filter((subject) => subject.department === departmentName)
  }

  if (year) {
    filteredSubjects = filteredSubjects.filter((subject) => subject.year === year)
  }

  if (semester) {
    const semesterMap: Record<string, string> = {
      fall: "Fall",
      spring: "Spring",
      summer: "Summer",
    }

    const semesterName = semesterMap[semester] || semester
    filteredSubjects = filteredSubjects.filter((subject) => subject.semester === semesterName)
  }

  return filteredSubjects
}

// Function to get a single subject by ID
export async function getSubjectById(id: string): Promise<Subject | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const subject = subjectData.find((s) => s.id === id)
  return subject || null
}

