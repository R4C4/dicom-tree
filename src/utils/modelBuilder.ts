import { Patient } from '../model/Patient';
import { Study } from '../model/Study';
import { Series } from '../model/Series';
import { Image } from '../model/Image';

import patientAttributes from '../assets/PatientAttributes.json';
import studyAttributes from '../assets/StudyAttributes.json';
import seriesAttributes from '../assets/SeriesAttributes.json';
import imageAttributes from '../assets/ImageAttributes.json';
import { binaryToString } from './dataTypeParser';

export class ModelBuilder {
  private patients: Patient[];

  constructor() {
    this.patients = [];
  }

  /**
   * Return the Entity Relationship Instances  of a DICOM Directory from the provided Datasets
   * 
   * @param dataSet The dataSet containing DICOM Header Information from dicomParser class
   */
  buildDICOMModel(dataSet: any[]): Patient[] {
    dataSet.forEach((dcmData) => {
      let patientBuilder = this.readAllDefinedAttributes(patientAttributes, dcmData);
      if (!patientBuilder.has('Id') || binaryToString(patientBuilder.get('Id')) == "") {
        //Skip any files that cannot be associated in the Model
        return;
      }
      if (!this.patients.some((patient) => patient.id == binaryToString(patientBuilder.get('Id')))) {
        this.patients.push(new Patient(patientBuilder));
      }
    });

    this.patients.forEach((patient) => {
      let patientSpecificDataSet = dataSet.filter((dcmFile) => {
        let patientBuilder = this.readAllDefinedAttributes(patientAttributes, dcmFile);
        return binaryToString(patientBuilder.get('Id')) == patient.id
      });
      if (patientSpecificDataSet.length < 1) {
        throw new RangeError("Patient Model cannot be build from provided Datasets. A DataSet with no registered Patient was found. Dataset PatientId: " + patient.id);
      } else {
        this.patients[this.patients.indexOf(patient)].studies = this.buildStudyModel(patientSpecificDataSet);
      }
    });
    return this.patients;
  }

  /**
   *  Builds the List of Studies found in the Dataset
   * @param dataSet The List of Datafiles to be parsed into the StudyModel
   */
  private buildStudyModel(dataSet: any[]): Study[] {
    let studies: Study[] = [];
 
    dataSet.forEach((dcmData) => {

      let studyBuilder = this.readAllDefinedAttributes(studyAttributes, dcmData);
      if (!studyBuilder.has('UId') || binaryToString(studyBuilder.get('UId')) == "") {
        //Skip any files that cannot be associated in the Study Model
        return;
      }

      if (!studies.some((study) => study.uid == binaryToString(studyBuilder.get('UId')))) {
        let currentStudy = new Study(studyBuilder);
        studies.push(currentStudy);
      }
    });

    studies.forEach((study) => {
      let studySpecificDataSet = dataSet.filter((dcmFile) =>{ 
        let studyBuilder = this.readAllDefinedAttributes(studyAttributes, dcmFile);
        return binaryToString(studyBuilder.get('UId')) == study.uid
      });
      if (studySpecificDataSet.length < 1) {
        throw new RangeError("Study Model cannot be build from provided Datasets. A DataSet with no registered Study was found. Dataset StudyUID: " + study.uid);
      } else {
        study.series = this.buildSeriesModel(studySpecificDataSet);
      }
    });

    return studies;
  }

  /**
   *  Get specific distinct series  from the DICOMData Set from dicomParser
   * @param dataSet  dataSet of a specific study looking for specific series items
   */
  private buildSeriesModel(dataSet: any[]): Series[] {
    let series: Series[] = [];
    dataSet.forEach((dcmData) => {
      let seriesBuilder = this.readAllDefinedAttributes(seriesAttributes, dcmData);
      //Primary match with seriesID, secondary match with seriesNumber
      let matchCritireon: String = "";
      if (!seriesBuilder.has('InstanceUId') || binaryToString(seriesBuilder.get('InstanceUId')) == "") {
        if (!seriesBuilder.has('SeriesNumber') || binaryToString(seriesBuilder.get('SeriesNumber')) == "") {

          return;
        }
        else {
          matchCritireon = binaryToString(seriesBuilder.get('SeriesNumber'));
        }
      } else {
        matchCritireon = binaryToString(seriesBuilder.get('InstanceUId'));
      }
      if (!series.some((element) => (element.uid == matchCritireon) && !series.some((element) => { element.number == matchCritireon }))) {
        series.push(new Series(seriesBuilder));
      }
    });

    series.forEach((seriesItem) => {
      let seriesSpecificDataSet = dataSet.filter((dcmFile) => dcmFile.string(seriesAttributes.InstanceUId) == seriesItem.uid);
      if (seriesSpecificDataSet.length < 1) {
        seriesSpecificDataSet = dataSet.filter((dcmFile => dcmFile.string(seriesAttributes.SeriesNumber) == seriesItem.number));
        if (seriesSpecificDataSet.length < 1) {
          throw new RangeError("Series Model cannot be build from provided Datasets. A DataSet with no registered Study was found. Dataset SeriesNumber: " + seriesItem.number);
        }
      } else {
        seriesItem.images = this.buildImagesModel(seriesSpecificDataSet);
      }
    });

    return series;
  }


  private buildImagesModel(dataSet: any[]): Image[] {
    let images: Image[] = [];

    dataSet.forEach((dcmData) => {
      let imageBuilder = this.readAllDefinedAttributes(imageAttributes, dcmData);
      images.push(new Image(imageBuilder));
    });
    return images;
  }

  /**
   * Read all defined attributes from DataSet and build Model Initialization Object 
   * @param attrDescriptionModel Model description of Dicom IOD containing desired Tag Locations
   * @param dataSet Parsed DICOM DataSet from single DICOM Object
   */
  private readAllDefinedAttributes(attrDescriptionModel, dataSet) {
    let _registeredProperties = new Map<string, Uint8Array>();
    for (var element in attrDescriptionModel) {
      if (attrDescriptionModel.hasOwnProperty(element)) {
        let dicomElement = dataSet.elements[attrDescriptionModel[element]];
        if (!dicomElement) {
          continue;
        }
        let text = new Uint8Array(dataSet.byteArray.buffer, dicomElement.dataOffset, dicomElement.length);
        _registeredProperties.set(element, text);
      }
    }
    return _registeredProperties;
  }




}