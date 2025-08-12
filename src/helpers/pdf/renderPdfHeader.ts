import { format } from "date-fns";
import { id } from "date-fns/locale";
import mazdaLogo from "@/assets/Logo.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Render header PDF standar Mazda Banjarbaru
 * @param doc - instance jsPDF
 * @param options - detail laporan (judul, periode, jumlah data, dll)
 * @returns y position terakhir setelah metadata (untuk lanjut ke isi)
 */

export const renderPdfHeader = (
  doc: jsPDF,
  options: {
    title: string;
    period?: string;
    count: number;
    generatedBy: string;
  },
): number => {
  const { title, period, count } = options;

  const gray900: [number, number, number] = [17, 24, 39];
  const gray600: [number, number, number] = [75, 85, 99];

  const now = format(new Date(), "dd MMMM yyyy - HH:mm", { locale: id });
  const pageWidth = doc.internal.pageSize.getWidth(); // 🧠 Dinamis width
  const logoWidth = 4;
  const logoHeight = 1;
  const logoX = pageWidth - logoWidth - 1; // 1cm margin kanan

  doc.setTextColor(...gray900);
  doc.setDrawColor(...gray600);
  doc.setFont("MazdaType-Regular");
  doc.setFontSize(16);

  // 🖼 Logo
  doc.addImage(mazdaLogo, "PNG", logoX, 1, logoWidth, logoHeight);

  // 🏢 Judul dan alamat
  doc.setFontSize(23);
  doc.text("Mazda Banjarbaru", 1, 1.3);

  doc.setFontSize(12);
  doc.text(
    "Jl. A. Yani KM 21,7 No. 22, Landasan Ulin Barat, Liang Anggang, Banjarbaru",
    1,
    2.3,
  );

  const metadataRows = [
    ["Report", ":", title],
    ...(period ? [["Period", ":", period]] : []),
    ["Total Data", ":", count.toString()],
    ["Generated At", ":", now],
  ];

  autoTable(doc, {
    startY: 3.6,
    head: [],
    body: metadataRows,
    theme: "plain",
    styles: {
      font: "MazdaType-Regular",
      fontSize: 11,
      textColor: [17, 24, 39],
    },
    columnStyles: {
      0: { cellWidth: 4 },
      1: { cellWidth: 0.5 },
      2: { cellWidth: "auto" },
    },
    tableLineWidth: 0,
  });

  doc.setLineWidth(0.05);
  doc.line(1, 3.3, 28, 3.3);

  // ⏫ Kembalikan posisi akhir untuk autoTable selanjutnya
  return doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 1 : 6;
};
