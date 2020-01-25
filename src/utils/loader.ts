import dicomParser from 'dicom-parser';

import { Series } from '../model/Series';

import seriesAttributes from '../model/DICOMDefinitions/SeriesAttributes.json';
import studyAttributes from '../model/DICOMDefinitions/StudyAttributes.json';

export class DICOMParser {
  private dataSet: any[];
  constructor(buffer: ArrayBuffer[]) {
    this.dataSet = [];
    for (let i = 0; i < buffer.length; i++) {
      let byteArray = new Uint8Array(buffer[i]);
      this.dataSet.push(dicomParser.parseDicom(byteArray));
    }
  }

  getParsedData() {
    return this.dataSet;
  }

  getSeriesData(data:any[], series:Series, studyuid:string ):Uint8Array[] {

    let relevantStudies =data.filter((dcmFile) => { studyuid == dcmFile.string(studyAttributes.UId)});

    let uidAvailable = series.uid != null && series.uid != '';
    let seriesIdent =  uidAvailable ? series.uid : series.number;
    let relevantSeries = relevantStudies.filter((dcmFile) => { 
      return seriesIdent == (uidAvailable? dcmFile.string(seriesAttributes.InstanceUId): dcmFile.string(seriesAttributes.SeriesNumber)
    )});

    return relevantSeries.map((dcmFile) => dcmFile.byteArray);
  }

  filterFilesWithModality(modalities:String[]):any[]{
    let list = this.dataSet;
    modalities.forEach( (modality) =>{
      list = list.filter((dcmFile) => { modality == dcmFile.string(seriesAttributes.Modality)});
    });
    return list;  
  }

}