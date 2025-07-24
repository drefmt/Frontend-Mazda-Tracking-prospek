import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FollowUp } from "@/interface/followUp.interface"
import { Lightbulb } from "lucide-react";

const FollowUpTable = ({ followUps }: { followUps: FollowUp[] }) => {
  const navigate = useNavigate();

  const handleEdit = (id:string) => {
    navigate(`follow-up/${id}`)
  }
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Follow-Up History</h2>
      <Table>
        <TableCaption>Riwayat Follow-Up SPK</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Customer Response </TableHead>
            <TableHead>Interaction</TableHead>            
            <TableHead>Proces Sales </TableHead>            
            <TableHead>Note</TableHead>            
            <TableHead>Recommendation</TableHead>
            <TableHead>Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {followUps.length > 0 ? (
            followUps.map((followUp) => (
              <TableRow key={followUp._id}>
                <TableCell className="font-medium">
                  {format(new Date(followUp.followUpDate), "dd-MM-yyyy") || ""}
                </TableCell>
                <TableCell>{followUp.salesProces || ""}</TableCell>
                <TableCell>{followUp.interaction || ""}</TableCell>
                <TableCell>{followUp.note || ""}</TableCell>
                <TableCell>{followUp.customerResponse || ""}</TableCell>
                <TableCell>{followUp.recommendation || ""}</TableCell>
                <TableCell onClick={() => handleEdit(followUp._id)} className="text-cyan-600 cursor-pointer">
                 <Lightbulb className="w-4 h-4 text-yellow-500" />
                </TableCell>
                
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                <p className="text-center pt-2">
                **Tidak ada data follow-up**
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FollowUpTable;
