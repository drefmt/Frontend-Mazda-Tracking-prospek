import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


import { ProspekReport } from "@/interface/prospek.interface";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { renderPdfHeader } from "../pdf/renderPdfHeader";
import { renderPdfFooter } from "../pdf/RenderPdfFooter";

export const handleExportPDF = (report: ProspekReport) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "cm",
    format: "a4",
  });

  const { data, period, generatedBy, count } = report;

  const formatDate = (dateStr: string) => format(new Date(dateStr), "dd MMMM yyyy", { locale: id });

  // // Warna default
  const gray900: [number, number, number] = [17, 24, 39];
  const gray600: [number, number, number] = [75, 85, 99];

  // header
  const startY = renderPdfHeader(doc, {
    title: "Prospek Summary",
    period,
    count,
    generatedBy,
  });
  // Tabel
  autoTable(doc, {
    startY,
    head: [
      [
        "No",
        "Sales Name",
        "Name",
        "Date",
        "WhatsApp",
        "Status",
        "Address",
        "Source",
        "Car Type",
        "Category",
        "Follow-Ups",
      ],
    ],
    body: data.map((row, i) => [
      i + 1,
      row.salesId?.username ?? "-",
      row.name,
      formatDate(row.date),
      row.whatsappNum,
      row.status,
      row.address,
      row.source,
      row.carType,
      row.category,
      row.followUpCount,
    ]),
    theme: "plain",
    styles: {
      font: "MazdaType-Regular",
      fontSize: 11,
      textColor: gray900,
      lineColor: gray600,
      lineWidth: 0.01,      
      halign: "left",
      valign: "middle",
    },
    headStyles: {
      fillColor: gray600,
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    tableLineColor: gray900,
  });

  const finalY = doc.lastAutoTable?.finalY || 6;

  // Footer
  renderPdfFooter(doc, {
    finalY,
    generatedBy,
  });


  // Tampilkan PDF
  const pdfUrl = doc.output("bloburi");
  window.open(pdfUrl);
};
