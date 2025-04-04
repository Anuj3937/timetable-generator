// Subject data and types

export type SubjectType = "Theory" | "Lab" | "Both"

export type Subject = {
  id: string
  code: string
  name: string
  departmentId: string
  semesterId: string
  credits: number
  theoryHours: number
  practicalHours: number
  type: SubjectType
  isElective: boolean
}

// Sample subject data
export const subjectData: Subject[] = [
  // First Year - Semester 1 (Common for all engineering branches)
  {
    id: "subject-1",
    code: "MA101",
    name: "Engineering Mathematics I",
    departmentId: "dept-cs", // Common subject
    semesterId: "sem-1",
    credits: 4,
    theoryHours: 3,
    practicalHours: 0,
    type: "Theory",
    isElective: false,
  },
  {
    id: "subject-2",
    code: "PH101",
    name: "Engineering Physics",
    departmentId: "dept-cs", // Common subject
    semesterId: "sem-1",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-3",
    code: "CH101",
    name: "Engineering Chemistry",
    departmentId: "dept-cs", // Common subject
    semesterId: "sem-1",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-4",
    code: "CS101",
    name: "Programming Fundamentals",
    departmentId: "dept-cs",
    semesterId: "sem-1",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },

  // First Year - Semester 2 (Common for all engineering branches)
  {
    id: "subject-5",
    code: "MA102",
    name: "Engineering Mathematics II",
    departmentId: "dept-cs", // Common subject
    semesterId: "sem-2",
    credits: 4,
    theoryHours: 3,
    practicalHours: 0,
    type: "Theory",
    isElective: false,
  },
  {
    id: "subject-6",
    code: "EE101",
    name: "Basic Electrical Engineering",
    departmentId: "dept-cs", // Common subject
    semesterId: "sem-2",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-7",
    code: "ME101",
    name: "Engineering Mechanics",
    departmentId: "dept-cs", // Common subject
    semesterId: "sem-2",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-8",
    code: "CS102",
    name: "Data Structures",
    departmentId: "dept-cs",
    semesterId: "sem-2",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },

  // Second Year - Semester 3 (CSE)
  {
    id: "subject-9",
    code: "CS201",
    name: "Object Oriented Programming",
    departmentId: "dept-cs",
    semesterId: "sem-3",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-10",
    code: "CS202",
    name: "Digital Logic Design",
    departmentId: "dept-cs",
    semesterId: "sem-3",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-11",
    code: "CS203",
    name: "Discrete Mathematics",
    departmentId: "dept-cs",
    semesterId: "sem-3",
    credits: 4,
    theoryHours: 3,
    practicalHours: 0,
    type: "Theory",
    isElective: false,
  },
  {
    id: "subject-12",
    code: "CS204",
    name: "Computer Organization",
    departmentId: "dept-cs",
    semesterId: "sem-3",
    credits: 4,
    theoryHours: 3,
    practicalHours: 0,
    type: "Theory",
    isElective: false,
  },

  // Second Year - Semester 4 (CSE)
  {
    id: "subject-13",
    code: "CS205",
    name: "Design and Analysis of Algorithms",
    departmentId: "dept-cs",
    semesterId: "sem-4",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-14",
    code: "CS206",
    name: "Database Management Systems",
    departmentId: "dept-cs",
    semesterId: "sem-4",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-15",
    code: "CS207",
    name: "Operating Systems",
    departmentId: "dept-cs",
    semesterId: "sem-4",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-16",
    code: "CS208",
    name: "Theory of Computation",
    departmentId: "dept-cs",
    semesterId: "sem-4",
    credits: 4,
    theoryHours: 3,
    practicalHours: 0,
    type: "Theory",
    isElective: false,
  },

  // Third Year - Semester 5 (CSE)
  {
    id: "subject-17",
    code: "CS301",
    name: "Computer Networks",
    departmentId: "dept-cs",
    semesterId: "sem-5",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-18",
    code: "CS302",
    name: "Software Engineering",
    departmentId: "dept-cs",
    semesterId: "sem-5",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-19",
    code: "CS303",
    name: "Web Technologies",
    departmentId: "dept-cs",
    semesterId: "sem-5",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-20",
    code: "CS304",
    name: "Artificial Intelligence",
    departmentId: "dept-cs",
    semesterId: "sem-5",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },

  // Third Year - Semester 6 (CSE)
  {
    id: "subject-21",
    code: "CS305",
    name: "Compiler Design",
    departmentId: "dept-cs",
    semesterId: "sem-6",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-22",
    code: "CS306",
    name: "Machine Learning",
    departmentId: "dept-cs",
    semesterId: "sem-6",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-23",
    code: "CS307",
    name: "Computer Graphics",
    departmentId: "dept-cs",
    semesterId: "sem-6",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-24",
    code: "CS308",
    name: "Mobile Application Development",
    departmentId: "dept-cs",
    semesterId: "sem-6",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: true,
  },

  // Fourth Year - Semester 7 (CSE)
  {
    id: "subject-25",
    code: "CS401",
    name: "Cloud Computing",
    departmentId: "dept-cs",
    semesterId: "sem-7",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-26",
    code: "CS402",
    name: "Big Data Analytics",
    departmentId: "dept-cs",
    semesterId: "sem-7",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: true,
  },
  {
    id: "subject-27",
    code: "CS403",
    name: "Information Security",
    departmentId: "dept-cs",
    semesterId: "sem-7",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: false,
  },
  {
    id: "subject-28",
    code: "CS404",
    name: "Internet of Things",
    departmentId: "dept-cs",
    semesterId: "sem-7",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: true,
  },

  // Fourth Year - Semester 8 (CSE)
  {
    id: "subject-29",
    code: "CS405",
    name: "Deep Learning",
    departmentId: "dept-cs",
    semesterId: "sem-8",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: true,
  },
  {
    id: "subject-30",
    code: "CS406",
    name: "Blockchain Technology",
    departmentId: "dept-cs",
    semesterId: "sem-8",
    credits: 4,
    theoryHours: 3,
    practicalHours: 2,
    type: "Both",
    isElective: true,
  },
]

// Helper functions
export function getAllSubjects(): Subject[] {
  return subjectData
}

export function getSubjectById(id: string): Subject | undefined {
  return subjectData.find((subject) => subject.id === id)
}

export function getSubjectsByDepartment(departmentId: string): Subject[] {
  return subjectData.filter((subject) => subject.departmentId === departmentId)
}

export function getSubjectsBySemester(semesterId: string): Subject[] {
  return subjectData.filter((subject) => subject.semesterId === semesterId)
}

export function getSubjectsByDepartmentAndSemester(departmentId: string, semesterId: string): Subject[] {
  return subjectData.filter((subject) => subject.departmentId === departmentId && subject.semesterId === semesterId)
}

export function getElectiveSubjects(): Subject[] {
  return subjectData.filter((subject) => subject.isElective)
}

export function getTheorySubjects(): Subject[] {
  return subjectData.filter((subject) => subject.type === "Theory" || subject.type === "Both")
}

export function getLabSubjects(): Subject[] {
  return subjectData.filter((subject) => subject.type === "Lab" || subject.type === "Both")
}

