import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Prospek } from "@/interface/prospek.interface";

export  const handleExportExcel = (data: Prospek[]) => {
  const wsData = [
    [
      "No", "Sales Name", "Name", "Date", "WhatsApp", "Status",
      "Address", "Source", "Car Type", "Category", "Follow-Ups"
    ],
    ...data.map((row, i) => [
      i + 1,
      row.salesId?.username ?? "-",
      row.name,
      row.date,
      row.whatsappNum,
      row.status,
      row.address,
      row.source,
      row.carType,
      row.category,
      row.followUpCount
    ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(wsData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Prospek");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(blob, "laporan-prospek.xlsx");
};
