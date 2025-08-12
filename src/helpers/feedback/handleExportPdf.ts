import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { SummaryFeedbackReport } from "@/interface/feedback.interface";
import { renderPdfHeader } from "../pdf/renderPdfHeader";
import { renderPdfFooter } from "../pdf/RenderPdfFooter";
import { formatDate } from "@/utils/formatDate";

export const handleExportPDF = (report: SummaryFeedbackReport) => {
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
    title: "Feedback",
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
        "Customer Name",
        "Car Type",
        "Expired",
        "Status",
        "Rating",
        "Message",
      ],
    ],

    body: data.map((row, index) => [
      index + 1,
      row.retailId.salesId.username ?? "-",
      row.retailId?.spkId.prospekId.name ?? "-",
      row.retailId?.carType ?? "-",
      formatDate(row.expiredAt),
      row.used ? "Used" : "Un Used",
      row.feedbackId?.rating ?? "-",
      row.feedbackId?.message ?? "-",
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

  const finalY = doc.lastAutoTable?.finalY || 6;
  //   Footer
  renderPdfFooter(doc, {
    finalY,
    generatedBy,
  });

  const pdfUrl = doc.output("bloburi");
  window.open(pdfUrl);
};
