"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data
type Faculty = {
  id: string
  name: string
  department: string
  specialization: string
  email: string
  phone: string
  maxHours: number
  currentHours: number
}

const data: Faculty[] = [
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
]

export function FacultyTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Faculty>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => <div>{row.getValue("department")}</div>,
    },
    {
      accessorKey: "specialization",
      header: "Specialization",
      cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("specialization")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "currentHours",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Current Hours
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const currentHours = row.getValue("currentHours") as number
        const maxHours = row.original.maxHours
        const percentage = (currentHours / maxHours) * 100

        return (
          <div className="flex items-center gap-2">
            <div className="text-right font-medium">
              {currentHours}/{maxHours}
            </div>
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${percentage > 90 ? "bg-red-500" : percentage > 75 ? "bg-amber-500" : "bg-green-500"}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const faculty = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(faculty.id)}>
                Copy faculty ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit faculty
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PencilIcon className="mr-2 h-4 w-4" />
                View schedule
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete faculty
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter faculty..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Department <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("")}>
                All Departments
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("Computer Science")}>
                Computer Science
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("Mathematics")}>
                Mathematics
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("Physics")}>
                Physics
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("Chemistry")}>
                Chemistry
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("Electrical Engineering")}>
                Electrical Engineering
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("Mechanical Engineering")}>
                Mechanical Engineering
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

