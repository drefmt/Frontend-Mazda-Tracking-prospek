import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Prospek } from "@/interface/prospek.interface";
import mazdaLogo from "@/assets/Logo.png";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const handleExportPDF = (data: Prospek[]) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "cm",
    format: "a4",
  });

  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), "dd MMMM yyyy", { locale: id });

  // 🖋️ Set default text & line color (Slate-900)
  const gray900: [number, number, number] = [17, 24, 39];
  const gray600: [number, number, number] = [	75, 85, 99];
  doc.setTextColor(...gray900);
  doc.setDrawColor(...gray600);
  doc.setFont("MazdaType-Regular");
  doc.setFontSize(16);

  // 🖼️ Logo Mazda
  doc.addImage(mazdaLogo, "PNG", 23, 1, 4, 1); // width 4cm, height 1cm

  // 📝 Judul & Alamat
  doc.setFontSize(23);
  doc.text("Mazda Banjarbaru", 1, 1.3);
  doc.setFontSize(12);
  doc.text(
    "Jl. A. Yani KM 21,7 No. 22, Landasan Ulin Barat, Liang Anggang, Banjarbaru",
    1,
    2.3
  );

  // ──────────── Garis Pembatas
  doc.setLineWidth(0.05);
  doc.line(1, 3.3, 28, 3.3);

  // 📊 Tabel
  autoTable(doc, {
    startY: 4,
    head: [[
      "No", "Sales Name", "Name", "Date", "WhatsApp", "Status",
      "Address", "Source", "Car Type", "Category", "Follow-Ups"
    ]],
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
      fontSize: 12,
      textColor: gray900,
      lineColor: gray600,
      lineWidth: 0.01,
      cellPadding: 0.3,
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

  // ✍️ Signature
  const h = doc.internal.pageSize.getHeight();
  doc.setFontSize(12);
  doc.text("Supervisor,", 23, h - 4);
  doc.text("_________________________", 20, h - 2);

  // 📎 Footer
  doc.setFontSize(12);
  doc.text("Generated from Mazda Tracking System - Andre", 1, h - 0.5);

  // 📤 Preview di tab baru
  const pdfUrl = doc.output("bloburi");
  window.open(pdfUrl);
};
