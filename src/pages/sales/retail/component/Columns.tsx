  /* eslint-disable react-hooks/rules-of-hooks */
  import { Button } from "@/components/ui/button"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  import { ColumnDef } from "@tanstack/react-table"
  import { ArrowUpDown, MoreHorizontal } from "lucide-react"
  import { useNavigate } from "react-router-dom"; 

  interface ProspekId  {
    // id: string;
    name: string;
    whatsappNum: string;
  }

  interface SpkId {
    prospekId: ProspekId
  }

  interface Retail {  
    id: string;  
    spkId?: SpkId;
    dateRetail: string;    
    carType: string;
  }

  export const columns = (handleDelete: (id: string) => void): ColumnDef<Retail>[] => {
    return [
      {
        header: "No",
        cell: ({ row }) => <span>{ row.index + 1 }</span>
      },
    {
      
      header: "Prospek Name", 
      id: "prospekName",
      accessorFn: (row) => row.spkId?.prospekId.name || "No Name"
      
    },
    {
      accessorKey: "dateRetail",
      header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Date Spk
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const formattedDate = new Date(row.original.dateRetail).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          return <span>{formattedDate}</span>;
        },
      
    },   
    {
      accessorKey: "carType",
      header: "Car Type",
    },
    
    {
      accessorKey: "Action",
      id: "actions",
      cell: ({ row }) => {
        const retailId = row.original.id; 
        const navigate = useNavigate();
  
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(retailId)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`edit/${retailId}`)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(retailId)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  }
