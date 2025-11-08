import jsPDF from 'jspdf';
import { getProtocolData, getAllDaysData } from './storage';
import { frustrationProtocol, skillsProtocol } from '@/data/protocols';

export const generateProtocolPDF = async () => {
  const protocol = getProtocolData();
  if (!protocol) return;

  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  const protocolData = protocol.protocolType === "frustration" 
    ? frustrationProtocol 
    : skillsProtocol;
  
  const protocolTitle = protocol.protocolType === "frustration"
    ? "Quebrando a Roda da Frustração"
    : "Descobrindo e Monetizando Suas Habilidades";

  // Helper function to add text with auto page break
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    if (isBold) {
      pdf.setFont("helvetica", "bold");
    } else {
      pdf.setFont("helvetica", "normal");
    }

    const lines = pdf.splitTextToSize(text, maxWidth);
    
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += fontSize * 0.5;
    });
    
    yPosition += 5; // Extra space after paragraph
  };

  const addSpace = (space: number = 10) => {
    yPosition += space;
    if (yPosition > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  // Cover Page
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text("VALOR CONTIDO", pageWidth / 2, 60, { align: "center" });
  
  pdf.setFontSize(18);
  pdf.text(protocolTitle, pageWidth / 2, 80, { align: "center" });
  
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  const startDate = new Date(protocol.startDate).toLocaleDateString('pt-BR');
  pdf.text(`Iniciado em: ${startDate}`, pageWidth / 2, 100, { align: "center" });
  
  pdf.addPage();
  yPosition = margin;

  // Process each day
  const allDays = getAllDaysData();
  
  for (let dayNum = 1; dayNum <= 7; dayNum++) {
    const dayContent = protocolData[dayNum - 1];
    const dayProgress = allDays[dayNum];

    if (!dayProgress) continue;

    // Day Header
    addText(`${dayContent.emoji} DIA ${dayNum}: ${dayContent.title}`, 16, true);
    addText(dayContent.subtitle, 12, false);
    addSpace(10);

    // Journey
    addText("JORNADA DO DIA", 12, true);
    addText(`De onde você está vindo: ${dayContent.journey.from}`, 10, false);
    addText(`Onde você está: ${dayContent.journey.where}`, 10, false);
    addText(`Para onde está indo: ${dayContent.journey.to}`, 10, false);
    addSpace(10);

    // Questions and Answers
    if (dayContent.questions.length > 0) {
      addText("PERGUNTAS REFLEXIVAS", 12, true);
      
      dayContent.questions.forEach((question: string, index: number) => {
        addText(`${index + 1}. ${question}`, 10, true);
        const response = dayProgress.responses[`q${index + 1}`] || "(Não respondida)";
        addText(response, 10, false);
        addSpace(5);
      });
    }

    // PDA
    if (dayProgress.pda) {
      addSpace(10);
      addText("PDA DO DIA", 12, true);
      
      if (dayProgress.pda.perception) {
        addText("PERCEPÇÃO:", 11, true);
        addText(dayProgress.pda.perception, 10, false);
      }
      
      if (dayProgress.pda.decision) {
        addText("DECISÃO:", 11, true);
        addText(dayProgress.pda.decision, 10, false);
      }
      
      if (dayProgress.pda.action) {
        addText("AÇÃO:", 11, true);
        addText(dayProgress.pda.action, 10, false);
      }
    }

    // Add page break between days
    if (dayNum < 7) {
      pdf.addPage();
      yPosition = margin;
    }
  }

  // Mandala info if available
  if (protocol.mandala?.start || protocol.mandala?.end) {
    pdf.addPage();
    yPosition = margin;
    addText("MINHA JORNADA NA RODA", 16, true);
    
    if (protocol.mandala.start) {
      addText(`Início: ${protocol.mandala.start}`, 12, false);
    }
    if (protocol.mandala.end) {
      addText(`Final: ${protocol.mandala.end}`, 12, false);
    }
  }

  // Footer
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "italic");
  const totalPages = (pdf as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.text(
      `Página ${i} de ${totalPages} | © 2025 Valor Contido`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  }

  // Save
  const fileName = `valor-contido-${protocolTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  pdf.save(fileName);
};

export const generateDayPDF = async (dayNumber: number) => {
  const protocol = getProtocolData();
  if (!protocol) return;

  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  const protocolData = protocol.protocolType === "frustration" 
    ? frustrationProtocol 
    : skillsProtocol;
  
  const dayContent = protocolData[dayNumber - 1];
  const dayProgress = getAllDaysData()[dayNumber];

  if (!dayProgress) {
    console.error("No progress data for this day");
    return;
  }

  // Similar structure but for single day
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    if (isBold) {
      pdf.setFont("helvetica", "bold");
    } else {
      pdf.setFont("helvetica", "normal");
    }

    const lines = pdf.splitTextToSize(text, maxWidth);
    lines.forEach((line: string) => {
      pdf.text(line, margin, yPosition);
      yPosition += fontSize * 0.5;
    });
    yPosition += 5;
  };

  // Header
  addText(`${dayContent.emoji} DIA ${dayNumber}: ${dayContent.title}`, 16, true);
  addText(dayContent.subtitle, 12, false);
  yPosition += 10;

  // Questions and answers
  if (dayContent.questions.length > 0) {
    dayContent.questions.forEach((question: string, index: number) => {
      addText(`${index + 1}. ${question}`, 10, true);
      const response = dayProgress.responses[`q${index + 1}`] || "(Não respondida)";
      addText(response, 10, false);
      yPosition += 5;
    });
  }

  // PDA
  if (dayProgress.pda) {
    yPosition += 10;
    addText("PDA DO DIA", 12, true);
    
    if (dayProgress.pda.perception) {
      addText("PERCEPÇÃO:", 11, true);
      addText(dayProgress.pda.perception, 10, false);
    }
    
    if (dayProgress.pda.decision) {
      addText("DECISÃO:", 11, true);
      addText(dayProgress.pda.decision, 10, false);
    }
    
    if (dayProgress.pda.action) {
      addText("AÇÃO:", 11, true);
      addText(dayProgress.pda.action, 10, false);
    }
  }

  pdf.save(`valor-contido-dia-${dayNumber}.pdf`);
};
