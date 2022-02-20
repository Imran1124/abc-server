const PDFDocument = require('pdfkit');
const doc = new PDFDocument({
    size: [243, 153]
});
const fs = require('fs');

doc.pipe(fs.createWriteStream('../uploads/generated.pdf')); // write to PDF
///////////////////////// Changing orientation ////////////////////////////////
// doc.page.dictionary.data.Rotate = 270;
// // where 0 is the current page number.
// doc._root.data.Pages.data.Kids[0] = doc.page.dictionary;
//////////////////////////////////////////////////////////////////////////////
doc.fontSize(10).text('Hello');

// and some justified text wrapped into columns

// end and display the document in the iframe to the right
doc.end();
// stream.on('finish', function () {
//     iframe.src = stream.toBlobURL('application/pdf');
// });