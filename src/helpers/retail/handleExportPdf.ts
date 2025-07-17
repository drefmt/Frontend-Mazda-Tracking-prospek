import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { RetailReport } from "@/interface/retail.interface";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { renderPdfHeader } from "../pdf/renderPdfHeader";
import { renderPdfFooter } from "../pdf/RenderPdfFooter";

export const handleExportPDF = (report: RetailReport) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "cm",
    format: "a4",
  });

  const { data, period, generatedBy, count } = report;
  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), "dd MMMM yyyy", { locale: id });

  const gray900: [number, number, number] = [17, 24, 39];
  const gray600: [number, number, number] = [75, 85, 99];

  // Header
  const startY = renderPdfHeader(doc, {
    title: "Retail Report",
    period,
    count,
    generatedBy,
  });

  

  // Table
  autoTable(doc, {
    // Header
    startY,
    head: [
      [
        "Sales Name",
        "SPK Name",
        "Date Retail",
        "Car Type",       
      ],
    ],

    body: data.map((row, index) => [
      index + 1,
      row.spkId?.prospekId.name ?? "-",
      formatDate(row.dateRetail),
      row.carType,

    ]),

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

  const finalY = doc.lastAutoTable?.finalY || 6
//   Footer
  renderPdfFooter(doc, {
    finalY,
    generatedBy,
  });


  const pdfUrl = doc.output('bloburi');
  window.open(pdfUrl)
};
