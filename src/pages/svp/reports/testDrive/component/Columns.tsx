import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, } from "lucide-react"



import { TestDrive } from "@/interface/testDrive.interface"
export const columns :  ColumnDef<TestDrive>[] = [
  
  {    
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>
  },
  {
    accessorKey: "salesId.username",        
    header: "Sales Name",
  },
  {    
    header: "Prospek Id",
    cell: ({ row }) => row.original.prospekId.name
  },
  {
    accessorKey: "dateTestDrive",
    cell: ({ row }) => {
      const formattedDate = new Date(row.original.dateTestDrive).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Test Drive
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    
  },
  {
    accessorKey: "carType",
    header: "Car Type",
  },
]


