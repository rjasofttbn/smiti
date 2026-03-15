import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import as a function
import * as XLSX from "xlsx";

// 1. Export to Excel (remains the same)
export const exportToExcel = (data, fileName = "Payments_Report") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

// 2. Export to PDF (Updated with the fix)
export const exportToPDF = (data, fileName = "Payments_Report") => {
  const doc = new jsPDF();

  const tableColumn = ["ID", "Shareholder ID", "Amount", "Date", "Status"];

  // Prepare the rows
  const tableRows = data.map((item) => [
    item.id,
    item.shareholderId,
    item.amount,
    item.date,
    item.status,
  ]);

  // FIX: Use autoTable(doc, ...) instead of doc.autoTable(...)
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: 'grid', // Adds a professional grid look
    headStyles: { fillColor: [46, 125, 50] }, // Uses your green theme color
  });

  doc.text("Payments Report", 14, 15);
  doc.save(`${fileName}.pdf`);
};