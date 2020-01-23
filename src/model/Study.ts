import { Series } from './Series';
import { binaryToString } from '../utils/dataTypeParser';


export class Study{
  id:String;
  uid:String;
  date:String;
  series:Series[];

  public constructor(studyBuilder:Map<string,Uint8Array>){
    this.id = studyBuilder.has('Id') ? binaryToString(studyBuilder.get('Id')): '00000000';
    this.uid = studyBuilder.has('UId') ? binaryToString(studyBuilder.get('UId')): '00000000';
    this.date = studyBuilder.has('Date') ? binaryToString(studyBuilder.get('Date')): ''; 
    this.series = [];
  }
}