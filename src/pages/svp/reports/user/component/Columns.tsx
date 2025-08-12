import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/interface/user.interface";

export const columns: ColumnDef<User>[] = [
  {
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    header: "Username",
    cell: ({ row }) => row.original.username,
  },
  {
    header: "Email",
    cell: ({ row }) => row.original.email,
  },
  {
    header: "Role",
    cell: ({ row }) => row.original.level,
  },
];
