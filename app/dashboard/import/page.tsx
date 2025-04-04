"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { importData } from "@/lib/import-utils"

export default function ImportPage() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importType, setImportType] = useState<string>("faculty")
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadResult, setUploadResult] = useState<{
    success: boolean
    message: string
    details?: string
    count?: number
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    setUploadResult(null)
  }

  const handleImport = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)
    setUploadResult(null)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 5
      })
    }, 100)

    try {
      // Read the file
      const reader = new FileReader()

      reader.onload = async (e) => {
        try {
          const result = await importData(e.target?.result as string, importType)

          clearInterval(progressInterval)
          setUploadProgress(100)

          setTimeout(() => {
            setUploadResult({
              success: true,
              message: `Successfully imported ${result.count} ${importType} records`,
              count: result.count,
            })
            setIsUploading(false)
          }, 500)
        } catch (error) {
          clearInterval(progressInterval)
          setUploadProgress(100)

          setTimeout(() => {
            setUploadResult({
              success: false,
              message: "Import failed",
              details: error instanceof Error ? error.message : "Unknown error occurred",
            })
            setIsUploading(false)
          }, 500)
        }
      }

      reader.readAsArrayBuffer(selectedFile)
    } catch (error) {
      clearInterval(progressInterval)
      setUploadResult({
        success: false,
        message: "Import failed",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      })
      setIsUploading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader
        heading="Import Data"
        text="Import faculty, subjects, classrooms, and other data from Excel files"
      />

      <Tabs defaultValue="import" className="space-y-4">
        <TabsList>
          <TabsTrigger value="import">Import Data</TabsTrigger>
          <TabsTrigger value="templates">Download Templates</TabsTrigger>
          <TabsTrigger value="history">Import History</TabsTrigger>
        </TabsList>

        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Import Data from Excel</CardTitle>
              <CardDescription>
                Upload Excel files to import data into the system. Make sure your data follows the required format.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Import Type</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={importType}
                    onChange={(e) => setImportType(e.target.value)}
                  >
                    <option value="faculty">Faculty</option>
                    <option value="subjects">Subjects</option>
                    <option value="classrooms">Classrooms</option>
                    <option value="departments">Departments</option>
                    <option value="students">Students</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Select File</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {selectedFile ? selectedFile.name : "Choose file..."}
                    </label>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {selectedFile && (
                <div className="rounded-md border p-4">
                  <div className="flex items-start gap-4">
                    <FileSpreadsheet className="mt-0.5 h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{selectedFile.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(2)} KB • Excel Spreadsheet
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uploading and processing...</span>
                    <span className="text-sm font-medium">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {uploadResult && (
                <Alert variant={uploadResult.success ? "default" : "destructive"}>
                  {uploadResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{uploadResult.message}</AlertTitle>
                  <AlertDescription>
                    {uploadResult.details ||
                      (uploadResult.success && `${uploadResult.count} records were successfully imported.`)}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button onClick={handleImport} disabled={!selectedFile || isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Import Data
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Download Templates</CardTitle>
              <CardDescription>Download Excel templates for importing different types of data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Faculty Template</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Template for importing faculty data including name, department, specialization, and contact
                      details.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      <FileSpreadsheet className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Subjects Template</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Template for importing subject data including name, code, department, credits, and hours.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      <FileSpreadsheet className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Classrooms Template</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Template for importing classroom data including room number, capacity, type, and facilities.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      <FileSpreadsheet className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Import History</CardTitle>
              <CardDescription>View history of previous data imports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Records
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        2024-03-14 09:45
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Faculty</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">faculty_data.xlsx</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Success
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        2024-03-13 14:22
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Subjects</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">subjects_spring2024.xlsx</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Success
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        2024-03-12 11:05
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Classrooms</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">classrooms_update.xlsx</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Failed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

