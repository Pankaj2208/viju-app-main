﻿import { jsPDF } from 'jspdf';
var font =
var callAddFont = function () {
  this.addFileToVFS('Inter-VariableFont_slnt,wght-normal.ttf', font);
  this.addFont(
    'Inter-VariableFont_slnt,wght-normal.ttf',
    'Inter-VariableFont_slnt,wght',
    'normal'
  );
};
jsPDF.API.events.push(['addFonts', callAddFont]);