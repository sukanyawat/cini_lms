// import React, { useState, useEffect } from "react";
// import { Document, Page as ReactPdfPage, pdfjs } from "react-pdf";
// // import FlipPage from "react-flip-page";
// import HTMLFlipBook from 'react-pageflip';
// import "./react-pageflip.css"
// import pdfBook from '../../files/dummy-pdf.pdf';
// import samplePDF from './sample-page4.pdf';

// // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// //   'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
// //   import.meta.url,
// // ).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";



// const FlipBook = ({ pdfFile }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pages, setPages] = useState([]);

//   const onDocumentLoadSuccess = (pdf) => {
//     setNumPages(pdf.numPages);
//     const pageArr = Array.from(new Array(pdf.numPages), (el, index) => index + 1);
//     setPages(pageArr);
//   };

//   const Page = React.forwardRef(({ pageNumber }, ref) => {
//     return (
//       <div ref={ref}>
//         <ReactPdfPage pageNumber={pageNumber} width={800} />
//       </div>
//     );
//   });

//   return (
//     <div className="flipbook-container">
//       {/* <Document file={samplePDF}>
//         <HTMLFlipBook width={300} height={424}>
//           <Page pageNumber={1} />
//           <Page pageNumber={2} />
//           <Page pageNumber={3} />
//         </HTMLFlipBook>
//       </Document> */}

//       <Document
//         file={pdfFile}
//         onLoadSuccess={onDocumentLoadSuccess}
//         loading={<div>Loading PDF...</div>}
//       >
//         {numPages && (
//             <HTMLFlipBook width={800} height={500}>
//               {Array.from(new Array(numPages), (el, index) => (
//                 <div key={`page_${index + 1}`} className="page" style={{ padding: "10px" }}>
//                   <Page pageNumber={index + 1} renderAnnotationLayer={true} />
//                 </div>
//               ))}
//             </HTMLFlipBook>
//           )}
//       </Document>
//     </div>
//   );
// };

// export default FlipBook;
















import React, { useState, useEffect } from "react";
import { Document, Page as ReactPdfPage, pdfjs } from "react-pdf";
import HTMLFlipBook from 'react-pageflip';
import "./react-pageflip.css"
import pdfBook from '../../files/dummy-pdf.pdf';
import samplePDF from './sample-page4.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const FlipBook = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pages, setPages] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = (pdf) => {
    setNumPages(pdf.numPages);
    const pageArr = Array.from(new Array(pdf.numPages), (el, index) => index + 1);
    setPages(pageArr);
  };

  // Calculate responsive dimensions
  const calculateWidth = () => {
    if (windowWidth <= 600) return windowWidth - 40; // Mobile
    if (windowWidth <= 1024) return windowWidth - 80; // Tablet
    return 800; // Desktop
  };

  const calculateHeight = () => {
    const width = calculateWidth();
    return Math.floor(width * 1.414); // Maintain aspect ratio
  };

  const Page = React.forwardRef(({ pageNumber }, ref) => {
    return (
      <div ref={ref} className="pdf-page-container">
        <ReactPdfPage 
          pageNumber={pageNumber} 
          width={calculateWidth()} 
          className="pdf-page"
        />
      </div>
    );
  });

  return (
    <div className="flipbook-container" style={{
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden', // Prevent internal scrolling
      display: 'flex',
      justifyContent: 'center',
      padding: '10px',
      boxSizing: 'border-box'
    }}>
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div>Loading PDF...</div>}
        className="pdf-document"
      >
        {numPages && (
          <HTMLFlipBook 
            width={calculateWidth()} 
            height={calculateHeight()}
            className="responsive-flip-book"
            style={{ overflow: 'auto' }} // Allow only the flipbook to scroll
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div 
                key={`page_${index + 1}`} 
                className="page" 
                style={{ 
                  padding: "10px", 
                  width: '100%', 
                  boxSizing: 'border-box' 
                }}
              >
                <Page pageNumber={index + 1} renderAnnotationLayer={true} />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
    
  );
};

export default FlipBook;