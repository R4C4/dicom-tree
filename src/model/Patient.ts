import { Study } from './Study';
import { binaryToString } from '../utils/dataTypeParser';

export class Patient {
  id: String;
  name:String;
  comments: String;
  studies:Study[];

  public constructor(initializationObject:Map<string, Uint8Array>)
  {
    this.id = initializationObject.has('Id') ? binaryToString(initializationObject.get('Id')): '00000000';
    this.name = initializationObject.has('Name') ? binaryToString(initializationObject.get('Name')): 'Anonymous';
    this.comments = initializationObject.has('Comments') ? binaryToString(initializationObject.get('Comments')): '-';
    this.studies = [];
  }

}