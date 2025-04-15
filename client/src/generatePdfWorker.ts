
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

self.onmessage = async (e) => {
  const { pagesData } = e.data;

  const pdf = new jsPDF("p", "mm", "a4");

  for (const page of pagesData) {
    const chunkedCanvas = await renderInChunks(page);
    const imgData = chunkedCanvas.toDataURL("image/png");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.addPage();
  }


  const pdfBlob = pdf.output("blob");
  postMessage({ pdfBlob });
};

async function renderInChunks(element: HTMLElement) {
  const canvasWidth = 1000;
  const scale = window.devicePixelRatio || 1;
  const totalHeight = element.scrollHeight;

  const chunks = Math.ceil(totalHeight / canvasWidth);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas context is not available.");
  }

  canvas.width = canvasWidth * scale;
  canvas.height = canvasWidth * scale;

  let currentY = 0;

  for (let i = 0; i < chunks; i++) {
    const chunkHeight = Math.min(canvasWidth, totalHeight - currentY);
    canvas.height = chunkHeight * scale;

    const canvasData = await html2canvas(element, {
      x: 0,
      y: currentY,
      width: canvasWidth,
      height: chunkHeight,
      scale: scale,
    });

    context.drawImage(canvasData, 0, 0);

    currentY += chunkHeight;
  }

  return canvas;
}
