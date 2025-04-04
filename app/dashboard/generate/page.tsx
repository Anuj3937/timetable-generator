"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { DivisionSelector } from "@/components/division-selector"
import { EnhancedTimetableView } from "@/components/enhanced-timetable-view"

export default function GenerateTimetablePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [selectedYear, setSelectedYear] = useState("1")
  const [selectedDepartment, setSelectedDepartment] = useState("cs")
  const [selectedDivision, setSelectedDivision] = useState("A")

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 2000)
  }

  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader
        heading="Generate Timetable"
        text="Create a new timetable based on faculty and subject availability"
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
                <Label htmlFor="division">Division</Label>
                <DivisionSelector onSelect={setSelectedDivision} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">B.Tech Year</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
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
                <Label htmlFor="department">Department</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="ee">Electrical Engineering</SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                    <SelectItem value="ce">Civil Engineering</SelectItem>
                    <SelectItem value="ec">Electronics & Communication</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <Label>Optimization Preferences</Label>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="senior-faculty" />
                  <label
                    htmlFor="senior-faculty"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Prioritize senior faculty for theory subjects
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="junior-faculty" />
                  <label
                    htmlFor="junior-faculty"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Notify when junior faculty is available
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="balance-load" defaultChecked />
                  <label
                    htmlFor="balance-load"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Balance faculty workload
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="minimize-gaps" defaultChecked />
                  <label
                    htmlFor="minimize-gaps"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Minimize gaps in faculty schedules
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="prevent-conflicts" defaultChecked />
                  <label
                    htmlFor="prevent-conflicts"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Prevent classroom conflicts between divisions
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="optimize-rooms" defaultChecked />
                  <label
                    htmlFor="optimize-rooms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Optimize room allocation
                  </label>
                </div>
              </div>
            </div>
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

        {isGenerated && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Timetable</CardTitle>
              <CardDescription>
                B.Tech{" "}
                {selectedYear === "1"
                  ? "First"
                  : selectedYear === "2"
                    ? "Second"
                    : selectedYear === "3"
                      ? "Third"
                      : "Fourth"}{" "}
                Year -{" "}
                {selectedDepartment === "cs"
                  ? "Computer Science"
                  : selectedDepartment === "ee"
                    ? "Electrical Engineering"
                    : selectedDepartment === "me"
                      ? "Mechanical Engineering"
                      : selectedDepartment === "ce"
                        ? "Civil Engineering"
                        : "Electronics & Communication"}{" "}
                - Division {selectedDivision}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedTimetableView year={selectedYear} department={selectedDepartment} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

