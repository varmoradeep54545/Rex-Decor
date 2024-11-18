import React, { useState } from 'react';
import jsPDF from 'jspdf';
import logo from '../assets/logo.png';

const InvoiceComponent = () => {
  const [customerData, setCustomerData] = useState({
    name: 'Sampath Singh',
    address: '04, KK Buildings, Ajmer Gate, Jodhpur',
    items: [
      { name: 'Apple', qty: 5, price: 100, tax: 5 },
      { name: 'Orange', qty: 10, price: 40, tax: 2 },
      { name: 'Banana', qty: 5, price: 40, tax: 2 },
    ],
    date: '11 August 2023',
    invoiceNumber: 'S01',
    totalAmount: 1155,
    taxAmount: 55,
    payableAmount: 1055,
    dueAmount: 555
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add Rex Decor logo
    doc.addImage(logo, 'PNG', 15, 10, 30, 10); // Adjust size and positioning
    
    // Add Invoice title
    doc.setFontSize(22);
    doc.text('TAX INVOICE', 150, 20);

    // Add Rex-Decor Shop Details
    doc.setFontSize(10);
    doc.text('Rex-Decor Shop', 15, 30);
    doc.text('Ajmer Road, Jaipur, Rajasthan', 15, 35);
    doc.text('Phone: +91 9981278197', 15, 40);
    doc.text('GSTIN: 08ALCR2857A1ZD', 15, 45);

    // Add customer details
    doc.text(`Bill To: ${customerData.name}`, 15, 60);
    doc.text(`Address: ${customerData.address}`, 15, 65);
    doc.text(`Invoice No: ${customerData.invoiceNumber}`, 150, 60);
    doc.text(`Date: ${customerData.date}`, 150, 65);

    // Add table headers
    doc.text('Items', 15, 80);
    doc.text('Qty', 60, 80);
    doc.text('Price per Unit', 90, 80);
    doc.text('Tax', 130, 80);
    doc.text('Amount', 160, 80);

    // Add each item
    let yPosition = 85;
    customerData.items.forEach(item => {
      doc.text(item.name, 15, yPosition);
      doc.text(`${item.qty}`, 60, yPosition);
      doc.text(`Rs. ${item.price}`, 90, yPosition);
      doc.text(`Rs. ${item.tax}`, 130, yPosition);
      const total = item.qty * item.price;
      doc.text(`Rs. ${total}`, 160, yPosition);
      yPosition += 5;
    });

    // Add total amount
    doc.text(`Sub Total: Rs. ${customerData.totalAmount}`, 15, yPosition + 10);
    doc.text(`Tax: Rs. ${customerData.taxAmount}`, 15, yPosition + 15);
    doc.text(`Total Amount: Rs. ${customerData.payableAmount}`, 15, yPosition + 20);
    doc.text(`Due Amount: Rs. ${customerData.dueAmount}`, 15, yPosition + 25);

    // Download the PDF
    doc.save(`Invoice_${customerData.invoiceNumber}.pdf`);
  };

  return (
    <div>
      <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2">
        Download Invoice
      </button>
    </div>
  );
};

export default InvoiceComponent;
