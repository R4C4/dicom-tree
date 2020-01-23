import { binaryToString, binaryToNumber } from "../utils/dataTypeParser";

export class Image {
  number:String;
  rows:Number;
  column:Number;
  imageOrientation:String;
  position:String;
  fileName:String;

  public constructor(imageBuilder:Map<string,Uint8Array>){
    this.number = imageBuilder.has('InstanceNumber') ? binaryToString(imageBuilder.get('InstanceNumber')): '0';
    this.rows = imageBuilder.has('Rows') ? binaryToNumber(imageBuilder.get('Rows')) : 0; 
    this.column = imageBuilder.has('Columns') ? binaryToNumber(imageBuilder.get('Columns'))  : 0; 
    this.imageOrientation = imageBuilder.has('ImageOrientationPatient') ? binaryToString(imageBuilder.get('ImageOrientationPatient')) : '';
    this.position = imageBuilder.has('ImagePosition') ? binaryToString(imageBuilder.get('ImagePosition')): '';
    this.fileName = "";
  }
}