import jsPDF from "jspdf";

/**
 * Menambahkan signature supervisor & footer pada PDF.
 * Jika posisi finalY terlalu rendah, otomatis tambah halaman baru.
 *
 * @param doc - Instance jsPDF
 * @param options - finalY: posisi akhir konten sebelumnya
 * @param generatedBy - Nama pembuat laporan (di footer)
 */export const renderPdfFooter = (
  doc: jsPDF,
  options: {
    finalY: number;
    generatedBy: string;
  }
) => {
  const { finalY, generatedBy } = options;

  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginBottom = 3;

   const marginRight = 2; // ⏪ Biar tidak mepet kanan
  const textWidth = 5.5; // Estimasi panjang teks tanda tangan

  const signatureX = pageWidth - textWidth - marginRight;

  // Jika ruang cukup, jangan addPage
  const shouldAddPage = finalY + marginBottom > pageHeight - 5;

  if (shouldAddPage) {
    doc.addPage();
  }

  // Posisi Y untuk tanda tangan
  const signatureY = shouldAddPage ? pageHeight - 4 : finalY + 2;

  doc.setFont("MazdaType-Regular");
  doc.setFontSize(12);

  // ✍️ Signature block
  doc.text("Supervisor,",  signatureX , signatureY);
  doc.text("_________________________",  signatureX, signatureY + 2);

  // 📎 Footer tetap di bawah halaman
  doc.text(
    `Generated from Mazda Tracking System - ${generatedBy}`,
    1,
    pageHeight - 0.5
  );
};
