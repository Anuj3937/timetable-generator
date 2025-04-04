"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { TimetableView } from "@/components/timetable-view"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { generateTimetable } from "@/lib/timetable-generator"

export default function GenerateTimetablePage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("cs")
  const [selectedYear, setSelectedYear] = useState("1")
  const [selectedSemester, setSelectedSemester] = useState("fall")
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStage, setGenerationStage] = useState("")
  const [timetableData, setTimetableData] = useState(null)
  const [conflicts, setConflicts] = useState<string[]>([])
  const [preferences, setPreferences] = useState({
    balanceFacultyLoad: true,
    matchRoomType: true,
    minimizeGaps: true,
    preventConflicts: true,
    includeLunchBreak: true,
    balanceLabTheory: true,
  })

  const handlePreferenceChange = (preference: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationStage("Initializing...")
    setConflicts([])

    try {
      // Start the generation process with progress updates
      const result = await generateTimetable({
        department: selectedDepartment,
        year: selectedYear,
        semester: selectedSemester,
        preferences,
        onProgress: (progress, stage) => {
          setGenerationProgress(progress)
          setGenerationStage(stage)
        },
      })

      setTimetableData(result.timetable)
      setConflicts(result.conflicts)
      setIsGenerated(true)
    } catch (error) {
      setConflicts([error instanceof Error ? error.message : "Unknown error occurred"])
    } finally {
      setIsGenerating(false)
    }
  }

  // Reset conflicts when selection changes
  useEffect(() => {
    if (!isGenerating) {
      setConflicts([])
    }
  }, [selectedDepartment, selectedYear, selectedSemester, isGenerating])

  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader
        heading="Generate Timetable"
        text="Create a new timetable based on faculty, subject, and classroom availability"
      />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Timetable Parameters</CardTitle>
            <CardDescription>Configure the settings for your new timetable</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment} disabled={isGenerating}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="ee">Electrical Engineering</SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                    <SelectItem value="ce">Civil Engineering</SelectItem>
                    <SelectItem value="ec">Electronics Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear} disabled={isGenerating}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">First Year</SelectItem>
                    <SelectItem value="2">Second Year</SelectItem>
                    <SelectItem value="3">Third Year</SelectItem>
                    <SelectItem value="4">Fourth Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester} disabled={isGenerating}>
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fall">Fall</SelectItem>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="summer">Summer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <Label>Optimization Preferences</Label>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="faculty-load"
                    checked={preferences.balanceFacultyLoad}
                    onCheckedChange={() => handlePreferenceChange("balanceFacultyLoad")}
                    disabled={isGenerating}
                  />
                  <label
                    htmlFor="faculty-load"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Balance faculty workload
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="room-type"
                    checked={preferences.matchRoomType}
                    onCheckedChange={() => handlePreferenceChange("matchRoomType")}
                    disabled={isGenerating}
                  />
                  <label
                    htmlFor="room-type"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Match room type to subject requirements
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="minimize-gaps"
                    checked={preferences.minimizeGaps}
                    onCheckedChange={() => handlePreferenceChange("minimizeGaps")}
                    disabled={isGenerating}
                  />
                  <label
                    htmlFor="minimize-gaps"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Minimize gaps in student schedules
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="prevent-conflicts"
                    checked={preferences.preventConflicts}
                    onCheckedChange={() => handlePreferenceChange("preventConflicts")}
                    disabled={isGenerating}
                  />
                  <label
                    htmlFor="prevent-conflicts"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Prevent classroom and faculty conflicts
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lunch-break"
                    checked={preferences.includeLunchBreak}
                    onCheckedChange={() => handlePreferenceChange("includeLunchBreak")}
                    disabled={isGenerating}
                  />
                  <label
                    htmlFor="lunch-break"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include lunch break
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lab-theory-balance"
                    checked={preferences.balanceLabTheory}
                    onCheckedChange={() => handlePreferenceChange("balanceLabTheory")}
                    disabled={isGenerating}
                  />
                  <label
                    htmlFor="lab-theory-balance"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Balance theory and lab sessions
                  </label>
                </div>
              </div>
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{generationStage}</span>
                  <span className="text-sm font-medium">{generationProgress}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
              </div>
            )}

            {conflicts.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Generation Issues</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 text-sm">
                    {conflicts.map((conflict, index) => (
                      <li key={index}>{conflict}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                "Generate Timetable"
              )}
            </Button>
          </CardFooter>
        </Card>

        {isGenerated && timetableData && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Timetable</CardTitle>
              <CardDescription>
                {selectedDepartment === "cs"
                  ? "Computer Science"
                  : selectedDepartment === "ee"
                    ? "Electrical Engineering"
                    : selectedDepartment === "me"
                      ? "Mechanical Engineering"
                      : selectedDepartment === "ce"
                        ? "Civil Engineering"
                        : "Electronics Engineering"}{" "}
                -
                {selectedYear === "1"
                  ? "First Year"
                  : selectedYear === "2"
                    ? "Second Year"
                    : selectedYear === "3"
                      ? "Third Year"
                      : "Fourth Year"}{" "}
                -
                {selectedSemester === "fall"
                  ? "Fall Semester"
                  : selectedSemester === "spring"
                    ? "Spring Semester"
                    : "Summer Semester"}{" "}
                2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TimetableView
                department={
                  selectedDepartment === "cs"
                    ? "Computer Science"
                    : selectedDepartment === "ee"
                      ? "Electrical Engineering"
                      : selectedDepartment === "me"
                        ? "Mechanical Engineering"
                        : selectedDepartment === "ce"
                          ? "Civil Engineering"
                          : "Electronics Engineering"
                }
                timetableData={timetableData}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsGenerated(false)}>
                Modify Parameters
              </Button>
              <Button onClick={() => router.push("/dashboard/timetable")}>Save Timetable</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

