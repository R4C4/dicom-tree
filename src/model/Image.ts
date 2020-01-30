import { binaryToString, binaryToNumber } from "../utils/dataTypeParser";

export class Image {
  number:Number;
  rows:Number;
  column:Number;
  imageOrientation:String;
  position:String;
  fileName:String;

  public constructor(imageBuilder:Map<string,Uint8Array>){
    this.number = imageBuilder.has('InstanceNumber') ? parseInt(binaryToString(imageBuilder.get('InstanceNumber')) as string): 0;
    this.rows = imageBuilder.has('Rows') ? binaryToNumber(imageBuilder.get('Rows')) : 0; 
    this.column = imageBuilder.has('Columns') ? binaryToNumber(imageBuilder.get('Columns'))  : 0; 
    this.imageOrientation = imageBuilder.has('ImageOrientation') ? binaryToString(imageBuilder.get('ImageOrientation')) : '';
    this.position = imageBuilder.has('ImagePosition') ? binaryToString(imageBuilder.get('ImagePosition')): '';
    this.fileName = "";
  }
}