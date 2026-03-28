import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ReportGenerator({ userData, courseData }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text("EDU//PLATFORM LEARNING REPORT", 14, 22);
    
    // User Info
    doc.setFontSize(12);
    doc.text(`Student: ${userData.name}`, 14, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 42);

    // Table Data
    const tableColumn = ["Course Name", "Status", "Grade"];
    const tableRows = courseData.map(course => [
      course.title, 
      course.status, 
      course.grade
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 50 });
    doc.save(`Report_${userData.name}.pdf`);
  };

  return (
    <button 
      onClick={generatePDF}
      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-6 rounded-lg transition-colors"
    >
      Download Progress Report (PDF)
    </button>
  );
}