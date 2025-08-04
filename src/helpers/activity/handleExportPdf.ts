import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { ActivityReport } from "@/interface/activity.interface";
import { renderPdfHeader } from "../pdf/renderPdfHeader";
import { renderPdfFooter } from "../pdf/RenderPdfFooter";
import { formatDate } from "@/utils/formatDate"


export const handleExportPDF = (report: ActivityReport) => {
  const doc = new jsPDF({
    unit: "cm",
    format: "a4",
    orientation: "landscape",
  });

  const { data, period, generatedBy, count } = report;

  const gray900: [number, number, number] = [17, 24, 39];
  const gray600: [number, number, number] = [75, 85, 99];

  // Header
  const startY = renderPdfHeader(doc, {
    title: "Activity",
    period,
    count,
    generatedBy,
  });


  autoTable(doc, {
    // Header
    startY,
    head: [
      [
        "No",
        "Sales Name",
        "Date",
        "Activity Type",
        "Description",
        "Is Completed",
        "Location",
        "Notes",             
      ],
    ],

    body: data.map((row, index) => [
      index + 1,
      row.salesId?.username ?? "-",      
      formatDate(row.date),
      row.activityType,
      row.description,
      row.isDone,
      row.location,
      row.location,
      row.notes,

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
