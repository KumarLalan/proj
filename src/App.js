import React, { useState, useEffect } from 'react';
import './App.css';
import html2pdf from 'html2pdf.js';

const ReportComponent = () => {
  const [fontSize, setFontSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(localStorage.getItem('pageNumber') || '123367');
  const todayDate = new Date().toLocaleDateString('en-GB'); // Ge

  useEffect(() => {
    document.getElementById('pageNumber').innerHTML = pageNumber;
  }, [pageNumber]);

  const limitTextArea = (textarea) => {
    textarea.addEventListener('input', function () {
        checkTextAreaFullness();
    });

    textarea.addEventListener('scroll', function () {
        checkTextAreaFullness();
    });

    function checkTextAreaFullness() {
        var container = textarea.parentElement;
        var maxHeight = container.clientHeight;

        setTimeout(function () {
            if (textarea.scrollHeight > maxHeight-10) {
                textarea.value = textarea.value.slice(0, -50);
                textarea.blur();
            }
        }, 0);
    }
}
const generatePDF = () => {
  const container = document.querySelector('.container');
  const clonedContainer = container.cloneNode(true);

  // Add a class to the main container to include it in the PDF
  clonedContainer.classList.add('pdf-container');

  const textareas = clonedContainer.querySelectorAll('textarea');
  textareas.forEach((textarea) => {
    const replacementDiv = document.createElement('div');
    replacementDiv.textContent = textarea.value;
    replacementDiv.style.whiteSpace = 'pre-wrap';
    replacementDiv.style.fontFamily = 'hindi';
    replacementDiv.style.marginLeft = '10px';
    replacementDiv.style.fontSize = `${fontSize}px`;
    textarea.parentNode.replaceChild(replacementDiv, textarea);
  });

  const allContent = clonedContainer.querySelectorAll('.preserve-font-size');
  allContent.forEach((element) => {
    element.style.fontSize = getComputedStyle(element).fontSize;
  });

  // Adjust the styles of the cloned container for better rendering in PDF
  clonedContainer.style.width = '21cm';
  clonedContainer.style.height = '29.7cm';
  clonedContainer.style.overflow = 'visible';
  clonedContainer.style.position = 'relative';
  clonedContainer.style.margin = '0';

  // Remove unnecessary elements or classes related to the extra page
  const extraPageElements = clonedContainer.querySelectorAll('.extra-page-specific');
  extraPageElements.forEach((element) => {
    element.remove();
  });

  // Remove additional pages if any
  const additionalPages = clonedContainer.querySelectorAll('.page');
  additionalPages.forEach((page) => {
    if (page !== container) {
      page.remove();
    }
  });

  html2pdf(clonedContainer);

  setPageNumber((prevNumber) => {
    const newNumber = parseInt(prevNumber) + 1;
    localStorage.setItem('pageNumber', newNumber.toString());
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    return newNumber.toString();
  });
};

  

  // const addNewPage = () => {
  //   const container = document.querySelector('.container');
  //   const newPage = generateNewPage();
  //   container.appendChild(newPage);
  //   newPage.querySelector('textarea').focus();
  // };

  // const generateNewPage = () => {
  //   const mainPage = document.querySelector('.main');
  //   const newPage = document.createElement('div');
  //   newPage.className = 'page';

  //   const leftMargin = document.createElement('div');
  //   leftMargin.className = 'left-margin';
  //   newPage.appendChild(leftMargin);

  //   const rightContent = document.createElement('div');
  //   rightContent.className = 'cont';

  //   const horizontalLine = document.createElement('div');
  //   horizontalLine.className = 'horizontal-line';
  //   newPage.appendChild(horizontalLine);

  //   const verticalLine = document.createElement('div');
  //   verticalLine.className = 'vertical-line';
  //   rightContent.appendChild(verticalLine);

  //   const newTextarea = document.createElement('textarea');
  //   newTextarea.id = 'myTextarea';
  //   newTextarea.onInput = () => limitTextArea(newTextarea);
  //   newTextarea.maxLength = '9990';
  //   rightContent.appendChild(newTextarea);

  //   rightContent.style.height = '27.7cm';
  //   newPage.appendChild(rightContent);
  //   rightContent.style.marginLeft = '25%';

  //   return newPage;
  // };

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
          <input type="text" placeholder={todayDate} style={{ width: '90%', border: 'none', fontSize: '20px', appearance: 'none' }} />
          <div className="reg">
            <textarea id="myarea" style={{ width: '90%', fontFamily: 'hindi',  fontSize: `${fontSize}px`, border: 'none', outline: 'none', resize: 'none' }}></textarea>
          </div>
          
        </div>
        <div className="cont">
          <textarea
            id="myTextarea"
            onInput={() => limitTextArea(document.getElementById('myTextarea'))}
            maxLength="1000"
            style={{ fontSize: `${fontSize}px` }}
          ></textarea>
        </div>
      </div>
     <div>
     <button className="print-button" onClick={generatePDF}>
        Generate PDF
      </button>
      <input
            type="range"
            id="fontSize"
            className='fontSize'
            name="fontSize"
            min="18"
            max="36"
            step="2"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />
          <label className='fontSize' id='labelhai'htmlFor="fontSize">Font Size: {fontSize}px</label>
     </div>
    </div>
  );
};

export default ReportComponent;
