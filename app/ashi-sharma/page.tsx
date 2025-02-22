'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Download, FileText, Menu, X } from 'lucide-react';

type Document = {
  name: string;
  verified: boolean;
  selected?: boolean;
};

const AshiSharma: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { name: "Aadhaar Card", verified: false, selected: false },
    { name: "PAN Card", verified: false, selected: false },
    { name: "Passport", verified: false, selected: false }
  ]);
  const [allDocumentsSelected, setAllDocumentsSelected] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDocumentSelection = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].selected = !updatedDocuments[index].selected;
    setDocuments(updatedDocuments);
    setAllDocumentsSelected(updatedDocuments.every((doc) => doc.selected));
  };

  const handleSelectAll = () => {
    const updatedDocuments = documents.map((doc) => ({ ...doc, selected: !allDocumentsSelected }));
    setDocuments(updatedDocuments);
    setAllDocumentsSelected(!allDocumentsSelected);
  };

  const handleDownloadDocuments = () => {
    const selectedDocuments = documents.filter((doc) => doc.selected);
    // Implement logic to download the selected documents
    console.log("Downloading documents:", selectedDocuments);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image 
            src="/logo.jpg" 
            alt="TrueDoc Logo" 
            width={250} 
            height={50} 
            className="h-10 w-auto"
          />
        </div>
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-gray-700 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Home</li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Profile</li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Documents</li>
        </ul>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col text-gray-700">
            <li className="p-4 border-b hover:bg-gray-100 cursor-pointer">Home</li>
            <li className="p-4 border-b hover:bg-gray-100 cursor-pointer">Profile</li>
            <li className="p-4 hover:bg-gray-100 cursor-pointer">Documents</li>
          </ul>
        </div>
      )}

      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 md:p-6 flex flex-col md:flex-row items-center">
            <Image
              src="/assets/ashi.jpg"
              alt="Ashi Sharma"
              width={120}
              height={120}
              className="rounded-full border-4 border-white mb-4 md:mb-0 md:mr-6"
            />
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Ashi Sharma</h1>
              <p className="text-blue-100">Digital Identity Verified</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Name:</span>{' '}
                  Ashi Sharma
                </p>
                <p>
                  <span className="font-medium">Date of Birth:</span>{' '}
                  28-02-2***
                </p>
                <p>
                  <span className="font-medium">Gender:</span>{' '}
                  Female
                </p>
                <p>
                  <span className="font-medium">Contact No.:</span>{' '}
                  *****1451
                </p>
              </div>
            </div>

            {/* Document Verification Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Verification</h3>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-3 rounded-md">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <input
                      type="checkbox"
                      checked={allDocumentsSelected}
                      onChange={handleSelectAll}
                      className="mr-3"
                    />
                    <span className="font-medium text-gray-700">Select All</span>
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center w-full sm:w-auto justify-center transition-colors"
                    onClick={handleDownloadDocuments}
                    disabled={documents.every((doc) => !doc.selected)}
                  >
                    <Download className="mr-1 h-4 w-4" /> Download
                  </button>
                </div>
                {documents.map((doc, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-3 rounded-md"
                  >
                    <div className="flex items-center mb-2 sm:mb-0">
                      <input
                        type="checkbox"
                        checked={doc.selected || false}
                        onChange={() => handleDocumentSelection(index)}
                        className="mr-3"
                      />
                      <FileText className={`mr-3 ${doc.verified ? 'text-green-500' : 'text-gray-400'}`} />
                      <span className={`${doc.verified ? 'text-green-700' : 'text-gray-700'}`}>
                        {doc.name}
                      </span>
                    </div>
                    {doc.verified ? (
                      <CheckCircle2 className="text-green-500" />
                    ) : (
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center w-full sm:w-auto justify-center transition-colors">
                        <Download className="mr-1 h-4 w-4" /> Download
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
          <div className="text-gray-500 mb-2 sm:mb-0 text-center sm:text-left">
            © 2024 TrueDoc. All Rights Reserved.
          </div>
          <Image 
            src="/logo.jpg" 
            alt="TrueDoc Logo" 
            width={80} 
            height={30} 
            className="h-8 w-auto"
          />
        </div>
      </footer>
    </div>
  );
};

export default AshiSharma;