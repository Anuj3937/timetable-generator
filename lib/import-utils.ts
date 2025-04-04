import * as XLSX from "xlsx"

// Define the expected column headers for each import type
const EXPECTED_HEADERS = {
  faculty: ["name", "department", "specialization", "email", "phone", "maxHours"],
  subjects: ["name", "code", "department", "year", "semester", "credits", "theoryHours", "labHours", "type"],
  classrooms: ["roomNumber", "floor", "capacity", "type", "hasProjector", "hasComputers", "isAvailable"],
  departments: ["name", "code", "faculty", "building"],
  students: ["name", "id", "department", "year", "semester", "email"],
}

// Define validation rules for each field
const VALIDATION_RULES = {
  faculty: {
    name: (value: string) => value && value.length > 0,
    department: (value: string) => value && value.length > 0,
    email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    maxHours: (value: number) => !isNaN(value) && value > 0 && value <= 40,
  },
  subjects: {
    name: (value: string) => value && value.length > 0,
    code: (value: string) => value && value.length > 0,
    credits: (value: number) => !isNaN(value) && value > 0,
    theoryHours: (value: number) => !isNaN(value) && value >= 0,
    labHours: (value: number) => !isNaN(value) && value >= 0,
  },
  classrooms: {
    roomNumber: (value: string) => value && /^\d{3}$|^\d{3,4}$/.test(value),
    floor: (value: number) => !isNaN(value) && value >= 0,
    capacity: (value: number) => !isNaN(value) && value > 0,
    type: (value: string) => ["Theory", "Lab"].includes(value),
  },
}

// Function to validate a row based on import type
function validateRow(row: any, type: string, rowIndex: number): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const rules = VALIDATION_RULES[type as keyof typeof VALIDATION_RULES]

  if (!rules) {
    return { valid: true, errors: [] }
  }

  // Check each field with its validation rule
  Object.entries(rules).forEach(([field, rule]) => {
    if (!rule(row[field])) {
      errors.push(`Row ${rowIndex}: Invalid value for ${field}: ${row[field]}`)
    }
  })

  // Additional validation for specific types
  if (type === "classrooms") {
    // Validate room number format based on floor
    const roomNumber = row.roomNumber
    const floor = Number.parseInt(row.floor)

    if (roomNumber && floor !== undefined) {
      const expectedPrefix = floor === 0 ? "" : floor.toString()
      const expectedPattern = new RegExp(`^${expectedPrefix}\\d{2,3}$`)

      if (!expectedPattern.test(roomNumber)) {
        errors.push(`Row ${rowIndex}: Room number ${roomNumber} doesn't match floor ${floor}`)
      }

      // Check if lab rooms are correctly designated
      if (row.type === "Lab") {
        const roomNum = Number.parseInt(roomNumber.slice(-3))
        if (![8, 13, 18, 19, 20].includes(roomNum % 100) && ![8, 10].includes(roomNum % 100)) {
          errors.push(
            `Row ${rowIndex}: Room ${roomNumber} is designated as Lab but doesn't follow lab room numbering convention`,
          )
        }
      }
    }
  }

  return { valid: errors.length === 0, errors }
}

// Main import function
export async function importData(fileData: string | ArrayBuffer, type: string): Promise<{ count: number }> {
  return new Promise((resolve, reject) => {
    try {
      // Parse the Excel file
      const workbook = XLSX.read(fileData, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]

      // Convert to JSON
      const data = XLSX.utils.sheet_to_json(worksheet)

      if (data.length === 0) {
        throw new Error("The uploaded file contains no data")
      }

      // Check headers
      const expectedHeaders = EXPECTED_HEADERS[type as keyof typeof EXPECTED_HEADERS]
      if (!expectedHeaders) {
        throw new Error(`Unknown import type: ${type}`)
      }

      const firstRow = data[0]
      const missingHeaders = expectedHeaders.filter((header) => !(header in firstRow))

      if (missingHeaders.length > 0) {
        throw new Error(`Missing required columns: ${missingHeaders.join(", ")}`)
      }

      // Validate each row
      const validationResults = data.map((row, index) => validateRow(row, type, index + 1))
      const errors = validationResults.flatMap((result) => result.errors)

      if (errors.length > 0) {
        throw new Error(`Validation errors:\n${errors.join("\n")}`)
      }

      // In a real application, you would save the data to your database here
      // For now, we'll just simulate success

      // Simulate processing delay
      setTimeout(() => {
        resolve({ count: data.length })
      }, 1000)
    } catch (error) {
      reject(error)
    }
  })
}

