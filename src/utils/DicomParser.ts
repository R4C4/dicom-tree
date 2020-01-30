import dicomParser from 'dicom-parser';

import { Series } from '../model/Series';
import { ModelBuilder } from './modelBuilder';
import { binaryToString } from './dataTypeParser';

import seriesAttributes from '../assets/SeriesAttributes.json';
import studyAttributes from '../assets/StudyAttributes.json';

export class DICOMParser {
  private dataSet: any[] = [];
  private parsedToRawMapping = {};

  
  async parseAll(buffer: ArrayBuffer[]) {
    for(var i = 0; i < buffer.length; i++){
      let uint8Array = new Uint8Array(buffer[i]);
      let parsedData = dicomParser.parseDicom(uint8Array);
      let parsedDataHash = await this.generateHash(parsedData);
      this.parsedToRawMapping[parsedDataHash] = buffer[i];
      this.dataSet.push(parsedData);
    }
    console.log("Files parsed");
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

      if (series.uid == "1.3.6.1.4.1.14519.5.2.1.5168.2407.154839094381615149260578924786".normalize()) {
        console.log("PT Series");
      }

      return series.uid.normalize() == identifier;
    });

    if (relevantSeries.length == 0) {
      return [];
    }

    console.log('Series Found ' + relevantSeries.length);

    let originalData:ArrayBuffer[] = [];
    for(var i = 0; i < relevantSeries.length; i++){
      let searchKey = await this.generateHash(relevantSeries[i]);
      let rawData = this.parsedToRawMapping[searchKey];
      originalData.push(rawData);
    }

    console.log('Original Data Entries' + originalData.length);

    return originalData;
  }

  async generateHash(obj) {
    const uint8 = new TextEncoder().encode(obj);
    const buffer = await crypto.subtle.digest('SHA-256', uint8);
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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