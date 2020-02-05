import dicomParser from 'dicom-parser';

import { Series } from '../model/Series';
import { ModelBuilder } from './modelBuilder';
import { binaryToString } from './dataTypeParser';

import seriesAttributes from '../assets/SeriesAttributes.json';
import studyAttributes from '../assets/StudyAttributes.json';
import imageAttributes from '../assets/ImageAttributes.json';

import {Image } from '../model/Image';

import HashTable from 'jshashtable';

export class DICOMParser {
  private dataSet: any[] = [];
  private mapping = new HashTable();

  async parseAll(buffer: ArrayBuffer[]) {
    this.mapping = new HashTable();
    for (var i = 0; i < buffer.length; i++) {
      let typedBuffer = new Uint8Array(buffer[i]);
      if(!this.validateDicomHeader(typedBuffer)){
        //Skip completely invalid files
        continue;
      }
      let parsedData = dicomParser.parseDicom(typedBuffer);
      this.mapping.put(parsedData, buffer[i]);
      this.dataSet.push(parsedData);
    }
  }

  private validateDicomHeader(buffer:Uint8Array):boolean{

    //@see http://dicom.nema.org/medical/dicom/current/output/chtml/part10/chapter_7.html Section 7.1 File Meta Information
    var prefix = new TextDecoder('utf-8').decode(buffer.slice(128, 132));
    return prefix === 'DICM';
  }

  getParsedData() {
    return this.dataSet;
  }

  async getSeriesData(parsedData: any[], series: Series, studyuid: string): Promise<ArrayBuffer[]> {

    let relevantStudies = parsedData.filter((dcmFile) => {
      let studyBuilder = ModelBuilder.readAllDefinedAttributes(studyAttributes, dcmFile);
      return studyuid == binaryToString(studyBuilder.get('UId'));
    });

    if (relevantStudies.length == 0) {
      return [];
    }

    let relevantSeries = relevantStudies.filter((dcmFile) => {
      let seriesBuilder = ModelBuilder.readAllDefinedAttributes(seriesAttributes, dcmFile);
      let identifier = binaryToString(seriesBuilder.get('UId')).normalize();
      return series.uid.normalize() == identifier;
    });

    relevantSeries.sort( (a, b) =>{
      let imagesBuildera = ModelBuilder.readAllDefinedAttributes(imageAttributes, a);
      let imagesBuilderb = ModelBuilder.readAllDefinedAttributes(imageAttributes, b);

      let imagesa = new Image(imagesBuildera);
      let imagesb = new Image(imagesBuilderb);

      let numbera = imagesa.number as number;
      let numberb = imagesb.number as number;

      return numbera - numberb;
    })

    if (relevantSeries.length == 0) {
      return [];
    }

    console.log('Selected ' + relevantSeries.length );

    let originalData: ArrayBuffer[] = [];
    for (var i = 0; i < relevantSeries.length; i++) {
      let rawData:ArrayBuffer = this.mapping.get(relevantSeries[i]);
      originalData.push(rawData);
    }

    console.log('Original Data ' + originalData.length);
  
    return originalData;
  }

  serialize(buf){
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }


  filterFilesWithModality(modalities: String[]): any[] {
    let list = this.dataSet;
    modalities.forEach((modality) => {
      list = list.filter((dcmFile) => {
        return modality != dcmFile.string(seriesAttributes.Modality)
      });
    });
    return list;
  }

}