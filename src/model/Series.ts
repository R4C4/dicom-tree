import {Image} from './Image';
import { binaryToString } from '../utils/dataTypeParser';

export class Series{
  uid:String;
  number:String;
  modality:String;
  position:String;
  orientation:String;
  images:Image[];

  public constructor(seriesBuilder:Map<string,Uint8Array>){
    this.uid = seriesBuilder.has('InstanceUId') ? binaryToString(seriesBuilder.get('InstanceUId')) : '';
    this.number = seriesBuilder.has('SeriesNumber') ? binaryToString(seriesBuilder.get('SeriesNumber')) : '0';
    this.modality = seriesBuilder.has('Modality') ? binaryToString(seriesBuilder.get('Modality')):  '';
    this.position = seriesBuilder.has('ImagePositionPatient') ? binaryToString(seriesBuilder.get('ImagePositionPatient')): '';
    this.orientation = seriesBuilder.has('ImageOrientationPatient') ? binaryToString(seriesBuilder.get('ImageOrientationPatient')): '';
    this.images = [];
  }
}