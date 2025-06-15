/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  // MoreHorizontal,
  MoveDown,
  MoveRight,
  MoveUp,
} from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { JSX } from "react";

export type SalesId = {
  id: string;
  username: string;
};

export type Prospek = {
  id: string;
  salesId: SalesId;
  name: string;
  date: string;
  whatsappNum: string;
  status: string;
  category: string;
};

export const columns: ColumnDef<Prospek>[] = [
  {
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorFn: (row) => row.salesId.username ?? "-",
    id: "salesName",
    header: "Sales Name",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
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
    accessorKey: "whatsappNum",
    header: "WhatsApp",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors: Record<string, string> = {
        Prospek: "border-cyan-600 text-cyan-600",
        TestDrive: "border-green-600 text-green-600",
        Retail: "border-yellow-600 text-yellow-600",
      };

      return (
        <span className={`px-1 rounded-sm border ${statusColors[status] || "border-gray-400 text-gray-600"}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      const statusIcon: Record<string, JSX.Element> = {
        Low: <MoveDown size={16} className="mr-2" />,
        Medium: <MoveRight size={16} className="mr-2" />,
        Hot: <MoveUp size={16} className="mr-2" />,
      };
      return (
        <span className="flex items-center">
          {statusIcon[category]}
          {category}
        </span>
      );
    },
  },
  {
    header: "Detail",
    cell: ({ row }) => {
      const prospekId = row.original.id;
      const navigate = useNavigate();

      return (
        <span onClick={() => navigate(`detail/${prospekId}`)}>
          <Eye
            className="text-[5px] text-gray-500 hover:text-black transition-all ease-in-out"
            strokeWidth={2}
            size={20}
          />
        </span>
      );
    },
  },
  // {
  //   accessorKey: "action",
  //   header: "Action",
  //   cell: ({ row }) => {
  //     const prospek = row.original;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(prospek.id)}
  //           >
  //             Copy ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
