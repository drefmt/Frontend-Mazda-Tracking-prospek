
import { ColumnDef } from "@tanstack/react-table";
export interface FeedbackLink {
  id: string;
  token: string;
  used: boolean;
  expiredAt: string;
  createdAt: string;
  retailId: {
    carType: string;
    spkId: {
      prospekId: {
        name: string;
      };
    };
    salesId: {
      username: string;
    }
  };
  feedbackId?: {
    rating: number;
    message: string;
    customerName: string;
    submittedAt: string;
  };
}

// interface Feedback extends FeedbackReportItem {
//   token: string;
//   id: string;
// }

export const columns: ColumnDef<FeedbackLink>[] = [
  
    {
      header: "No",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
     {
    header: "Sales Name",
    cell: ({ row }) => row.original.retailId.salesId.username || "-",
  },
   {
    id: "prospectName", // id penting untuk filtering!
    header: "Nama Prospek",
    accessorFn: (row) => row.retailId.spkId.prospekId.name || "-", // ambil nested value
    cell: ({ getValue }) => getValue() ?? "-", // opsional, bisa pakai row.original
    filterFn: "includesString", // default filter string cocok
  },
    // {
    //   accessorKey: "name",
    //   header: "Nama Customer",
    //   cell: ({ row }) => {
    //     const name = row.original.retailId?.spkId?.prospekId?.name || "-";
    //     return <span>{name}</span>;
    //   },
    // },
    {
      accessorKey: "retailId.carType",
      header: "Tipe Mobil",
    },
    {
      accessorKey: "expiredAt",
      header: "Expired",
      cell: ({ row }) => {
        const formattedDate = new Date(row.original.expiredAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "used",
      header: "Status",
      cell: ({ row }) => (
        <span className={row.original.used ? "text-red-500" : "text-green-600"}>
          {row.original.used ? "Sudah Digunakan" : "Belum Digunakan"}
        </span>
      ),
    },
    {
  accessorKey: "feedbackId.rating",
  header: "Rating",
  cell: ({ row }) => {
    const rating = row.original.feedbackId?.rating;
    return rating ? `${rating} ⭐` : "-";
  },
},
{
  accessorKey: "feedbackId.message",
  header: "Pesan",
  cell: ({ row }) => {
    const msg = row.original.feedbackId?.message;
    return msg || "-";
  },
},
]

