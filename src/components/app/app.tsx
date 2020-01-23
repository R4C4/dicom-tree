import { Component, Host, h, Listen, State, Prop, Method, Watch } from '@stencil/core';

import { Patient } from '../../model/Patient';
import { Series } from '../../model/Series';
import { ModelBuilder } from '../../utils/modelBuilder';
import { DICOMParser } from '../../utils/loader';
import { base64ToBuffer } from '../../utils/dataTypeParser';

@Component({
  tag: 'dicom-app',
  styleUrl: 'app.css',
  shadow: true
})
export class App {
  @State() ready: boolean;
  @Prop() files?: string;

  @State() parsedFiles:ArrayBuffer[];

  private dicomParser: DICOMParser;
  private patients: Patient[];

  private wantedItems: Map<Series, string>;


  constructor() {
    console.log('i actually managed to get here');
  }

  componentWillLoad(){
    this.parseFilesToArrayBuffer(this.files);
  }

  @Watch('files')
  parseFilesToArrayBuffer(newValue:string){
    if(newValue){
      let separatedFiles = JSON.parse(newValue);
      let parsedFiles:ArrayBuffer[] = [];
      separatedFiles.array.forEach(element => {
        base64ToBuffer(element).then(data => parsedFiles.push(data));
      });
      this.parsedFiles = parsedFiles;
    }
    this.ready = true;
  }




  connectedCallback() {
    this.ready = false;
    this.wantedItems = new Map();
    this.dicomParser = new DICOMParser(this.parsedFiles);
    let modelBuilder = new ModelBuilder();
    this.patients = modelBuilder.buildDICOMModel(this.dicomParser.getParsedData());

  }

  @Listen('studySelected')
  studySelectedHandler(event: CustomEvent) {
    if (event.detail.selected) {
      if (!this.wantedItems.has(event.detail.series)) {
        this.wantedItems.set(event.detail.series, event.detail.studyUid);
      }
    } else {
      if (this.wantedItems.has(event.detail.series)) {
        this.wantedItems.delete(event.detail.series);
      }
    }
  }


  @Method()
  async getSelectedFiles(): Promise<Uint8Array[][]> {
    let fileGroups: Uint8Array[][] = [[]];
    this.wantedItems.forEach((v, k) => {
      fileGroups.push(this.dicomParser.getSeriesData(k, v));
    })
    return Promise.resolve(fileGroups);
  }

  render() {
    if (this.ready) {
      return (
        <Host>
          <h1>Dicom Directory</h1>

          <tree-caret>
            <h2 slot="title">Patients</h2>
            <div slot="content">
              {this.patients.map(patient => (
                <patient-view patient={patient}></patient-view>
              ))}
            </div>
          </tree-caret>
        </Host>
      );
    } else {
      return <Host>
      </Host>
    }
  }
}
