import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Activity } from "@/interface/activity.interface";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";




export const columns = (handleDelete: (id: string) => void): ColumnDef<Activity>[] => {
  return [
    {
      header: "No",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const formattedDate = new Date(row.original.date).toLocaleDateString(
          "id-ID",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        );
        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "activityType",
      header: "activity Type",
    },
    {
      accessorKey: "description",
      header: "description",
    },
    {
      accessorKey: "location",
      header: "location",
    },
    {
      accessorKey: "notes",
      header: "notes",
    },
   
    {
      accessorKey: "Action",
      cell: ({ row }) => {
        const id = row.original.id;
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => navigate(`edit/${id}`)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
