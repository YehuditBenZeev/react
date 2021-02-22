import React from "react";
import firebaseService from 'firebase_services/firebaseService';
import {Component} from 'react';
import Speech from 'react-speech';
import { object } from '@material-ui/core';
import {Document, Page, pdfjs} from 'react-pdf';
//import { PDFJS } from "pdfjs-dist";
// import { PDFJS } from 'pdf.js';
// import { Highlight } from "@material-ui/icons";
// import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = '//cdn.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js'


class GetPdf extends Component {
    state = {
            story_links: [],
            numPages: 1,
            searchText: "try"
        // link_: "https://firebasestorage.googleapis.com/v0/b/react-english-e6bf1.appspot.com/o/b%201.pdf?alt=media&token=85fad328-3fa6-45da-866d-bdf0894c1f7f"
    }


 


    render() {
        let link = "https://firebasestorage.googleapis.com/v0/b/react-english-e6bf1.appspot.com/o/b%201.pdf?alt=media&token=85fad328-3fa6-45da-866d-bdf0894c1f7f"
        // let link_ = "https://firebasestorage.googleapis.com/v0/b/react-english-e6bf1.appspot.com/o/story1.PNG?alt=media&token=e88ed352-8646-425e-a196-e34a3f8be010"
        let numPages = 1
        

        // function getPageText(pageNum, PDFDocumentInstance){
        //     console.log("in getPageText");
        //     // Return a Promise that is solved once the text of the page is retrieven
        //     return new Promise(function (resolve, reject) {
        //         PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
        //             // The main trick to obtain the text of the PDF page, use the getTextContent method
        //             pdfPage.getTextContent().then(function (textContent) {
        //                 var textItems = textContent.items;
        //                 var finalString = "";
        
        //                 // Concatenate the string of the item to the final string
        //                 for (var i = 0; i < textItems.length; i++) {
        //                     var item = textItems[i];
        
        //                     finalString += item.str + " ";
        //                 }
        
        //                 // Solve promise with the text retrieven from the page
        //                 resolve(finalString);
        //             });
        //         });
        //     });
        // }
        
        // function getPDFtext(PDF_URL){
        //     console.log("in getPDFtext");
        //     PDFJS.getDocument(PDF_URL).then(function (PDFDocumentInstance) {
        
        //         var totalPages = PDFDocumentInstance.pdfInfo.numPages;
        //         var pageNumber = 1;
        
        //         // Extract the text
        //         getPageText(pageNumber , PDFDocumentInstance).then(function(textPage){
        //         // Show the text of the page in the console
        //             console.log(textPage);
        //         });
        
        //         }, function (reason) {
        //         // PDF loading error
        //         console.error(reason);
        //     });
        // }



        // let text = window.getPDFtext(link)

        return ( 
                // <embed src={link} width="1000" height="375"  type="application/pdf"/> //</embed>
                //<iframe id="processor" src="http://hubgit.github.com/2011/11/pdftotext/"></iframe>
                //<iframe id="input" src={link}></iframe>

                <body>
                   
                    <div id="output">
                        <embed src={link} width="1000" height="375"  type="application/pdf"/> 
                    </div>
                    <button onclick="activateLasers()">
                        finised to read
                    </button>
                    
                </body>
                
            );
      }
  }


export default GetPdf