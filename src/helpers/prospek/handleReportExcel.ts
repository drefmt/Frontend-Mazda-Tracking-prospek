import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ProspekReport } from "@/interface/prospek.interface";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const handleExportExcel = (report: ProspekReport) => {
  const { data, period, count, generatedBy } = report;

  const now = format(new Date(), "dd MMMM yyyy - HH:mm", { locale: id });

  // Metadata di atas tabel
  const headerSection = [
    ["Mazda Banjarbaru"],
    ["Jl. A. Yani KM 21,7 No. 22, Landasan Ulin Barat, Liang Anggang, Banjarbaru"],
    [""],
    [`Report       : Prospek Summary`],
    [`Period       : ${period}`],
    [`Total Data   : ${count}`],
    [`Generated At : ${now}`],
    [`Generated By : ${generatedBy}`],
    [""]
  ];

  // Data utama (convert jadi objek agar bisa pakai sheet_add_json)
  const tableData = data.map((row, i) => ({
    No: i + 1,
    "Sales Name": row.salesId?.username ?? "-",
    Name: row.name,
    Date: format(new Date(row.date), "dd MMMM yyyy", { locale: id }),
    WhatsApp: row.whatsappNum,
    Status: row.status,
    Address: row.address,
    Source: row.source,
    "Car Type": row.carType,
    Category: row.category,
    "Follow-Ups": row.followUpCount,
  }));

  // Buat worksheet & tambahkan metadata dulu
  const worksheet = XLSX.utils.aoa_to_sheet(headerSection);

  // Tambahkan data prospek sebagai JSON (auto buat header + table)
  XLSX.utils.sheet_add_json(worksheet, tableData, {
    origin: -1, // lanjutkan di bawah metadata
    skipHeader: false
  });

  // Otomatis atur lebar kolom
  const maxWidths = tableData.reduce((acc, row) => {
    Object.values(row).forEach((val, i) => {
      const len = String(val).length;
      acc[i] = Math.max(acc[i] || 10, len + 2);
    });
    return acc;
  }, [] as number[]);

  worksheet["!cols"] = maxWidths.map((w) => ({ wch: w }));

  // Buat workbook dan simpan
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Prospek");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(blob, `laporan-prospek-${period}.xlsx`);
};
