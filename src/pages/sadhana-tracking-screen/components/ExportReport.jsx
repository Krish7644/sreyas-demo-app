import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { format } from 'date-fns';

const ExportReport = ({ onExport, dateRange, sadhanaData }) => {
  const [isLoading, setIsLoading] = useState({});
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const handlePrintReport = async () => {
    setIsLoading(prev => ({ ...prev, print: true }));
    
    try {
      // Create printable content
      const printWindow = window.open('', '_blank');
      const printContent = generatePrintContent();
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Sadhana Report - SREYAS</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 20px; 
                line-height: 1.6;
                color: #333;
              }
              .header { 
                text-align: center; 
                margin-bottom: 30px;
                border-bottom: 2px solid #f39c12;
                padding-bottom: 20px;
              }
              .logo { 
                color: #f39c12;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .mantra {
                color: #e67e22;
                font-weight: bold;
                margin: 10px 0;
              }
              .report-info {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .section { 
                margin-bottom: 25px;
                page-break-inside: avoid;
              }
              .section-title { 
                font-size: 18px;
                font-weight: bold;
                color: #2c3e50;
                border-bottom: 1px solid #ecf0f1;
                padding-bottom: 8px;
                margin-bottom: 15px;
              }
              .score-item {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px dotted #bdc3c7;
              }
              .score-value {
                font-weight: bold;
                color: #27ae60;
              }
              .total-score {
                font-size: 20px;
                font-weight: bold;
                color: #e74c3c;
                text-align: center;
                background: #fef9e7;
                padding: 15px;
                border-radius: 8px;
                margin-top: 20px;
              }
              .footer {
                margin-top: 40px;
                text-align: center;
                color: #7f8c8d;
                font-size: 12px;
                border-top: 1px solid #ecf0f1;
                padding-top: 20px;
              }
              @media print {
                body { margin: 0; font-size: 12px; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Trigger print dialog
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
      
    } catch (error) {
      console.error('Print failed:', error);
      alert('Failed to generate print report. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, print: false }));
    }
  };

  const handlePDFExport = async () => {
    setIsLoading(prev => ({ ...prev, pdf: true }));
    
    try {
      // Dynamic import to avoid including jsPDF in main bundle
      const { jsPDF } = await import('jspdf');
      
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(243, 156, 18);
      doc.text('SREYAS - Sadhana Report', 20, 20);
      
      // Maha Mantra
      doc.setFontSize(12);
      doc.setTextColor(230, 126, 34);
      doc.text('Hare Krishna Hare Krishna Krishna Krishna Hare Hare', 20, 35);
      doc.text('Hare Rama Hare Rama Rama Rama Hare Hare', 20, 45);
      
      // Report info
      doc.setFontSize(10);
      doc.setTextColor(127, 140, 141);
      const currentUser = 'Devotee Name'; // Replace with actual user name
      const reportDate = format(new Date(), 'MMMM do, yyyy');
      const dateRangeText = dateRange ? 
        `${format(dateRange.start, 'MMM dd')} - ${format(dateRange.end, 'MMM dd, yyyy')}` :
        format(new Date(), 'MMMM do, yyyy');
      
      doc.text(`Name: ${currentUser}`, 20, 60);
      doc.text(`Date Range: ${dateRangeText}`, 20, 70);
      doc.text(`Generated: ${reportDate}`, 20, 80);
      
      // Sample sadhana data - replace with actual data
      const sampleData = {
        japa: { completed: 16, target: 16, score: 100 },
        reading: { minutes: 30, target: 30, score: 100 },
        seva: { hours: 2, target: 3, score: 67 },
        hearing: { minutes: 45, target: 60, score: 75 }
      };
      
      let yPosition = 100;
      
      // Sadhana sections
      doc.setFontSize(14);
      doc.setTextColor(44, 62, 80);
      doc.text('Daily Sadhana Breakdown', 20, yPosition);
      yPosition += 15;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      
      // Japa
      doc.text('Japa Meditation:', 20, yPosition);
      doc.text(`${sampleData.japa.completed}/${sampleData.japa.target} rounds`, 120, yPosition);
      doc.text(`${sampleData.japa.score}%`, 180, yPosition);
      yPosition += 10;
      
      // Reading
      doc.text('Scripture Reading:', 20, yPosition);
      doc.text(`${sampleData.reading.minutes}/${sampleData.reading.target} minutes`, 120, yPosition);
      doc.text(`${sampleData.reading.score}%`, 180, yPosition);
      yPosition += 10;
      
      // Seva
      doc.text('Devotional Service:', 20, yPosition);
      doc.text(`${sampleData.seva.hours}/${sampleData.seva.target} hours`, 120, yPosition);
      doc.text(`${sampleData.seva.score}%`, 180, yPosition);
      yPosition += 10;
      
      // Hearing
      doc.text('Spiritual Hearing:', 20, yPosition);
      doc.text(`${sampleData.hearing.minutes} minutes`, 120, yPosition);
      doc.text(`${sampleData.hearing.score}%`, 180, yPosition);
      yPosition += 20;
      
      // Total Score
      const totalScore = Math.round((sampleData.japa.score + sampleData.reading.score + sampleData.seva.score + sampleData.hearing.score) / 4);
      doc.setFontSize(16);
      doc.setTextColor(231, 76, 60);
      doc.text(`Overall Sadhana Score: ${totalScore}%`, 20, yPosition);
      
      // Footer
      yPosition += 30;
      doc.setFontSize(8);
      doc.setTextColor(127, 140, 141);
      doc.text('Generated by SREYAS - ISKCON Spiritual Community Platform', 20, yPosition);
      doc.text('Founder Acharya of ISKCON - Srila Prabhupada', 20, yPosition + 10);
      
      // Save the PDF
      const fileName = `sadhana-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to generate PDF report. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, pdf: false }));
    }
  };

  const generatePrintContent = () => {
    const currentUser = 'Devotee Name'; // Replace with actual user name
    const reportDate = format(new Date(), 'MMMM do, yyyy');
    const dateRangeText = dateRange ? 
      `${format(dateRange.start, 'MMM dd')} - ${format(dateRange.end, 'MMM dd, yyyy')}` :
      format(new Date(), 'MMMM do, yyyy');
    
    // Sample data - replace with actual sadhana data
    const sampleData = {
      japa: { completed: 16, target: 16, score: 100 },
      reading: { minutes: 30, target: 30, score: 100 },
      seva: { hours: 2, target: 3, score: 67 },
      hearing: { minutes: 45, target: 60, score: 75 }
    };
    
    const totalScore = Math.round((sampleData.japa.score + sampleData.reading.score + sampleData.seva.score + sampleData.hearing.score) / 4);
    
    return `
      <div class="header">
        <div class="logo">🕉️ SREYAS</div>
        <h2>Sadhana Progress Report</h2>
        <div class="mantra">
          <div>Hare Krishna Hare Krishna Krishna Krishna Hare Hare</div>
          <div>Hare Rama Hare Rama Rama Rama Hare Hare</div>
        </div>
      </div>
      
      <div class="report-info">
        <div><strong>Name:</strong> ${currentUser}</div>
        <div><strong>Date Range:</strong> ${dateRangeText}</div>
        <div><strong>Report Generated:</strong> ${reportDate}</div>
      </div>
      
      <div class="section">
        <div class="section-title">Daily Sadhana Breakdown</div>
        
        <div class="score-item">
          <span>Japa Meditation (Rounds)</span>
          <span class="score-value">${sampleData.japa.completed}/${sampleData.japa.target} (${sampleData.japa.score}%)</span>
        </div>
        
        <div class="score-item">
          <span>Scripture Reading (Minutes)</span>
          <span class="score-value">${sampleData.reading.minutes}/${sampleData.reading.target} (${sampleData.reading.score}%)</span>
        </div>
        
        <div class="score-item">
          <span>Devotional Service (Hours)</span>
          <span class="score-value">${sampleData.seva.hours}/${sampleData.seva.target} (${sampleData.seva.score}%)</span>
        </div>
        
        <div class="score-item">
          <span>Spiritual Hearing (Minutes)</span>
          <span class="score-value">${sampleData.hearing.minutes} (${sampleData.hearing.score}%)</span>
        </div>
      </div>
      
      <div class="total-score">
        Overall Sadhana Score: ${totalScore}%
      </div>
      
      <div class="section">
        <div class="section-title">Spiritual Progress Notes</div>
        <p>Continue your devotional practices with dedication and sincerity. Regular sadhana leads to spiritual advancement and inner peace.</p>
        <p><em>"Chanting is the most powerful means of self-realization in this age of Kali."</em> - Srila Prabhupada</p>
      </div>
      
      <div class="footer">
        <p>Generated by SREYAS - ISKCON Spiritual Community Platform</p>
        <p>Founder Acharya of ISKCON - Srila Prabhupada</p>
        <p>🕉️ Hare Krishna 🕉️</p>
      </div>
    `;
  };

  return (
    <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Export Report
            </h2>
            <p className="text-sm text-muted-foreground">
              Print or download your sadhana progress
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Format Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Export Format</label>
          <div className="flex space-x-2">
            <Button
              variant={selectedFormat === 'print' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFormat('print')}
              iconName="Printer"
            >
              Print
            </Button>
            <Button
              variant={selectedFormat === 'pdf' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFormat('pdf')}
              iconName="FileText"
            >
              PDF
            </Button>
          </div>
        </div>

        {/* Report Preview */}
        <div className="bg-muted/30 rounded-lg p-4 border">
          <h4 className="font-medium text-foreground mb-2">Report Contents:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Personal Information & Date Range</li>
            <li>• Japa Meditation Progress</li>
            <li>• Scripture Reading Summary</li>
            <li>• Devotional Service Hours</li>
            <li>• Spiritual Hearing Activities</li>
            <li>• Overall Sadhana Score</li>
          </ul>
        </div>

        {/* Export Actions */}
        <div className="flex space-x-3">
          <Button
            variant="default"
            onClick={selectedFormat === 'print' ? handlePrintReport : handlePDFExport}
            loading={isLoading[selectedFormat]}
            iconName={selectedFormat === 'print' ? 'Printer' : 'Download'}
            className="flex-1"
          >
            {isLoading[selectedFormat] 
              ? (selectedFormat === 'print' ? 'Preparing...' : 'Generating...') 
              : (selectedFormat === 'print' ? 'Print Report' : 'Download PDF')
            }
          </Button>
        </div>

        {/* Info Note */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-accent mt-0.5" />
            <div className="text-sm">
              <p className="text-accent font-medium">Report Information</p>
              <p className="text-muted-foreground mt-1">
                Reports include your sadhana data, progress scores, and spiritual insights. 
                Perfect for sharing with counsellors or personal record keeping.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReport;