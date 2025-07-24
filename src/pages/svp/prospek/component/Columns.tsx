/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  Activity,
  ArrowUpDown,
  Ban,
  CheckCircle2,
  Clock,
  Eye,
  MoveDown,
  MoveRight,
  MoveUp,
} from "lucide-react";

import { Prospek } from "@/interface/prospek.interface";
import { useNavigate } from "react-router-dom";
import { JSX } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";



export const columns: ColumnDef<Prospek>[] = [
  {
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorFn: (row) => row.salesId?.username ?? "-",
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
        accessorKey: "followUpcount",
        header: "Follow-Ups",
        cell: ({ row }) => {
          const count = row.original.followUpCount;
  
          let Icon = Ban;
          let colorClass = "text-gray-500 border-gray-400";
          let label = "Belum Follow-Up";
  
          if (count >= 5) {
            Icon = CheckCircle2;
            colorClass = "text-green-600 border-green-600";
            label = "Siap Closing";
          } else if (count >= 3) {
            Icon = Activity;
            colorClass = "text-blue-600 border-blue-600";
            label = "Sedang Proses";
          } else if (count >= 1) {
            Icon = Clock;
            colorClass = "text-yellow-600 border-yellow-600";
            label = "Awal Follow-Up";
          }
  
          return (
             <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={`inline-flex items-center gap-2 border px-3 rounded-md text-sm ${colorClass}`}
              >
                <Icon className="w-3 h-3" />
                {label}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{count} Follow-Up</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
          );
        },
      },
  {
      accessorKey: "scoreCategory",
      header: "Scor Category",
      cell: ({ row }) => {
        const category = row.original.scoreCategory;

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
      header: "Predicted Score",
      cell: ({ row }) => {
        const score = row.original.score;
        const category = row.original.scoreCategory;

        if (score === undefined || category === undefined) {
          return <span className="text-gray-400 italic">Belum diisi</span>;
        }

        const categoryColors: Record<string, string> = {
          Low: "bg-red-600",
          Medium: "bg-yellow-500",
          Hot: "bg-blue-600",
        };

        const barColor = categoryColors[category] || "bg-gray-300";

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-start gap-1">
                  <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${barColor}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Score: {score} / 100 ({category})
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Predicted Score: {score}</p>
                <p>Kategori: {category}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
