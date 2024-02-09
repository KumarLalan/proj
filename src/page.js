import React, { useState, useEffect } from 'react';
import './App.css';
import 'https://rawgit.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js'; // Make sure to use the correct URL for html2pdf.bundle.js

const ReportComponent = () => {
  const [pageNumber, setPageNumber] = useState(localStorage.getItem('pageNumber') || '123367');

  useEffect(() => {
    document.getElementById('pageNumber').innerHTML = pageNumber;
  }, [pageNumber]);

  const limitTextArea = (textarea) => {
    textarea.addEventListener('input', () => {
      checkTextAreaFullness();
    });

    textarea.addEventListener('scroll', () => {
      checkTextAreaFullness();
    });

    const checkTextAreaFullness = () => {
      const container = textarea.parentElement;
      const maxHeight = container.clientHeight;

      setTimeout(() => {
        if (textarea.scrollHeight > maxHeight) {
          textarea.value = textarea.value.slice(0, -50);
          textarea.blur();
        }
      }, 0);
    };
  };

  const generatePDF = () => {
    const container = document.querySelector('.container');
    const clonedContainer = container.cloneNode(true);

    // Replace textarea elements with div elements
    const textareas = clonedContainer.querySelectorAll('textarea');
    textareas.forEach((textarea) => {
      const replacementDiv = document.createElement('div');
      replacementDiv.textContent = textarea.value;
      replacementDiv.style.whiteSpace = 'pre-wrap';
      replacementDiv.style.fontFamily = 'hindi';
      replacementDiv.style.fontSize = '20px';
      textarea.parentNode.replaceChild(replacementDiv, textarea);
    });

    // Remove borders and adjust styles for better rendering in PDF
    clonedContainer.style.width = '100%';
    clonedContainer.style.height = '100%';
    clonedContainer.style.border = 'none';
    clonedContainer.style.overflow = 'visible';
    clonedContainer.style.position = 'relative';
    clonedContainer.style.margin = '0';

    // Remove additional pages if any
    const additionalPages = clonedContainer.querySelectorAll('.page');
    additionalPages.forEach((page) => {
      if (page !== container) {
        page.remove();
      }
    });

    // Generate PDF from the cloned container
    html2pdf(clonedContainer);

    // Optional: If you want to reload the page after generating PDF
    setPageNumber((prevNumber) => {
      const newNumber = parseInt(prevNumber) + 1;
      localStorage.setItem('pageNumber', newNumber.toString());
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return newNumber.toString();
    });
  };

  return (
    <div className="container">
      <div className="top">
        <div className="box">अनुसुची 47, प्रपत्र संo 120 अ <br /> आoहo प्रपत्र संo 30 अ </div>
        <div className="box case">
          <div className="bb">केस दैनिक संo <br /> ( नियम-164 )</div>
          <div className="ib"><input type="text" placeholder="" style={{ width: '100px' }} /></div>
        </div>
        <div className="box" id="pageNumber">{pageNumber}</div>
      </div>
      <div className="top">
        <div className="box3"></div>
        <div className="box3"><input type="text" placeholder="" style={{ width: '100px', fontFamily: 'hindi' }} />बनाम<input type="text" placeholder="" style={{ width: '100px', fontFamily: 'hindi' }} />
          <br /> विशेष रिपोर्ट केस संo<input type="text" placeholder="" style={{ width: '100px' }} />
        </div>
      </div>

      <p>थाना <input type="text" placeholder="" style={{ width: '100px', fontFamily: 'hindi' }} />जिला<input type="text" placeholder="" style={{ width: '100px', fontFamily: 'hindi' }} />प्रथम इतिला रिपोर्ट संo<input type="text" placeholder="" style={{ width: '100px', fontFamily: 'hindi' }} />तिथि<input type="text" placeholder="" style={{ width: '100px' }} /></p>
      <p>घटना की तिथि और स्थान <input type="text" placeholder="" style={{ width: '300px', fontFamily: 'hindi' }} /> धारा<input type="text" placeholder="" style={{ width: '200px', fontFamily: 'hindi' }} /></p>
      <div className="header">
        <div className="box1">किस तिथि को (समय सहित) करवाई की गई और किन-किन स्थानों को जाकर देखा गया</div>
        <div className="box2">अन्वेषण का अभिलेख</div>
      </div>

      <div className="main">
        <div className="side">
          <input type="date" style={{ width: '90%', border: 'none', fontSize: '20px', appearance: 'none' }} />
          <div className="reg">
            <textarea id="myarea" style={{ width: '90%', fontFamily: 'hindi', fontSize: '20px', border: 'none', outline: 'none', resize: 'none' }}></textarea>
          </div>
        </div>
        <div className="cont">
          <textarea id="myTextarea" onInput={() => limitTextArea(document.getElementById('myTextarea'))} maxLength="10000"></textarea>
        </div>
      </div>

      <button className="print-button" onClick={generatePDF}>
        Generate PDF
      </button>
    </div>
  );
};

export default ReportComponent;