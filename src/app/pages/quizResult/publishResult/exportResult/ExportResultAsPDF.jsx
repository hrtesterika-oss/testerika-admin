import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DataTable from './DataTable';



const ExportToPdfButton = ({ data }) => {
  const pdfRef = useRef();

  const handleExportPdf = async () => {
    try {
      const pdf = new jsPDF('a4');
      const pdfContent = pdfRef.current;

      const canvas = await html2canvas(pdfContent, {
        scale: 2, // Adjust the scale as needed for better image quality
      });
      pdf.save('Quizophy_Quiz_Result.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  return (
    <div>
<button onClick={handleExportPdf} className="d-flex btn btn-primary mx-auto my-4 text-center">Export Quiz Result As PDF</button>   
          <div style={{display:"none"}}>
             <DataTable ref={pdfRef} data={data} />

            </div>   
    </div>
  );
};

export default ExportToPdfButton;
