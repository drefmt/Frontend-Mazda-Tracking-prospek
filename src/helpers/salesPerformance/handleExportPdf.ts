import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { SummarySalesPerformance } from "@/interface/salesPerformance.interface";

import { renderPdfHeader } from "../pdf/renderPdfHeader";
import { renderPdfFooter } from "../pdf/RenderPdfFooter";

export const handleExportPDF = (report: SummarySalesPerformance) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "cm",
    format: "a4",
  });

  const { data, period, generatedBy, count } = report;


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
        "Total Prospects",
        "Total Test-Drive",
        "Total SPK",
        "Total Retails",
        "Test Drive Convertion",
        "SPK Convertion",
        "Retail Convertion",      
      ],
    ],

    body: data.map((row, index) => [
      index + 1,
        row.salesName,
        row.totalProspek,
        row.totalTestDrive,
        row.totalSpk,
        row.totalRetail,
        row.konversiTestDrive,
        row.konversiSpk,
        row.konversiRetail,


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
