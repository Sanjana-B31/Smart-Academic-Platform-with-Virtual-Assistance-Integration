import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateReport = (userName, courses) => {
  const doc = new jsPDF();
  doc.setFillColor(2, 6, 23); 
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(16, 185, 129);
  doc.setFontSize(22);
  doc.text("EDU//PLATFORM ACADEMIC REPORT", 14, 25);
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text(`STUDENT: ${userName.toUpperCase()}`, 14, 50);
  
  const tableData = courses.map(c => [c.title, `${c.progress || 0}%`, c.grade || "N/A"]);
  doc.autoTable({
    startY: 60,
    head: [['COURSE', 'PROGRESS', 'GRADE']],
    body: tableData,
    headStyles: { fillColor: [16, 185, 129] },
  });
  doc.save(`${userName}_Report.pdf`);
};