import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import type { CVData } from './types';
import { INITIAL_CV_DATA } from './constants';
import Wizard from './components/Wizard';
import CVPreview from './components/CVPreview';
import { DownloadIcon, BackIcon } from './components/ui/Icons';

declare global {
    interface Window {
        html2canvas: typeof html2canvas;
        jspdf: { jsPDF: typeof jsPDF };
    }
}


export default function App() {
    const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);

    const handleDownloadPdf = async () => {
        setIsDownloading(true);
        const cvElement = document.getElementById('cv-preview');
        if (!cvElement) {
            console.error('CV preview element not found');
            setIsDownloading(false);
            return;
        }

        try {
            const canvas = await window.html2canvas(cvElement, {
                scale: 2, 
                useCORS: true, 
                logging: false
            });
            const imgData = canvas.toDataURL('image/png');
            
            // A4 dimensions in points: 595.28 x 841.89
            const pdf = new window.jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            // Adjust canvas dimensions to fit PDF page
            const canvasAspectRatio = canvas.width / canvas.height;
            let imgWidth = pdfWidth;
            let imgHeight = imgWidth / canvasAspectRatio;

            // If the height exceeds the page, scale down
            if (imgHeight > pdfHeight) {
                imgHeight = pdfHeight;
                imgWidth = imgHeight * canvasAspectRatio;
            }

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
            pdf.save(`${cvData.contact.name.replace(' ', '_')}_CV.pdf`);

        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <main className="flex flex-col lg:flex-row h-screen bg-gray-50 text-gray-800 font-sans">
            <div className={`w-full lg:w-[60%] xl:w-1/2 p-6 md:p-8 overflow-y-auto ${showPreviewOnMobile ? 'hidden' : ''} lg:block`}>
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">ProFolio AI</h1>
                    <p className="text-gray-600">Your AI-Powered CV and Headshot Generator</p>
                </header>
                <Wizard cvData={cvData} setCvData={setCvData} setShowPreviewOnMobile={setShowPreviewOnMobile} />
            </div>
            
            <div className={`w-full lg:w-[40%] xl:w-1/2 bg-gray-800 p-6 md:p-8 ${showPreviewOnMobile ? 'flex' : 'hidden'} lg:flex flex-col items-center justify-center overflow-y-auto shadow-2xl-inner`}>
                <div className="w-full max-w-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                         <button
                            onClick={() => setShowPreviewOnMobile(false)}
                            className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-semibold"
                        >
                            <BackIcon />
                            Back to Edit
                        </button>
                        <button
                            onClick={handleDownloadPdf}
                            disabled={isDownloading}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed font-semibold"
                        >
                            <DownloadIcon />
                            {isDownloading ? 'Downloading...' : 'Download PDF'}
                        </button>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-lg aspect-[1/1.414] w-full">
                        <CVPreview cvData={cvData} />
                    </div>
                </div>
            </div>
        </main>
    );
}