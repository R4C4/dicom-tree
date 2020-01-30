import { Component, Host, h, Listen, State, Method, Prop } from '@stencil/core';

import { Patient } from '../../model/Patient';
import { Series } from '../../model/Series';
import { ModelBuilder } from '../../utils/modelBuilder';
import { DICOMParser } from '../../utils/DicomParser';

@Component({
  tag: 'dicom-app',
  styleUrl: 'dicom-app.scss',
  shadow: true
})
export class DicomApp {
  @State() ready: boolean;
  @Prop() blackList:String[];

  private dicomParser: DICOMParser;
  private patients: Patient[];

  private wantedItems: Map<Series, string>;
  constructor() {
    this.ready = false;
    this.wantedItems = new Map();
    this.blackList = ['RTDOSE', 'RTINTENT', 'RTPLAN', 'RTSEGANN','RTSTRUCT', 'RWV', 'RESP', 'PLAN', 'PR', 'REG', 'VA'];
  }


  @Listen('studySelected')
  studySelectedHandler(event: CustomEvent) {
    this.dicomSelectionHandler(event);
  }

  dicomSelectionHandler(event: CustomEvent){
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
  /**
   * Get files that have been selected by the Tree view. Files not containing any image Data will be filtered out of this result.
   * DICOM Files with the Headers containing a Modality set with the property {@link DicomApp#blackList} will be ignored and not returned
   */
  async getSelectedFiles(): Promise<ArrayBuffer[][]> {

    if(this.dicomParser == null){
      return Promise.reject('No Files loaded. Call loadFiles(...) first');
    }

    let filteredFiles = this.dicomParser.filterFilesWithModality(this.blackList);
    let fileGroups: ArrayBuffer[][] = [];

    for( const [key, value] of this.wantedItems.entries()){
      let series:ArrayBuffer[] = await this.dicomParser.getSeriesData(filteredFiles, key, value);
      if(series.length > 0){
        fileGroups.push(series);
      }
    }
    for(var i = 0; i < fileGroups.length; i++){
      console.log(fileGroups[i]);
    }

    return Promise.resolve(fileGroups);
  }

  @Method()
  /**
   *  Accept a ArrayBuffer[] containing dicomfiles. The files will be then parsed into a model similar
   * to the DICOM Information model found at {@link http://dicom.nema.org/medical/dicom/current/output/chtml/part03/chapter_A.html#sect_A.1.1}
   */
  async loadFiles(fileBuffer:ArrayBuffer[]) {
    let files =   fileBuffer as ArrayBuffer[]
    this.dicomParser = new DICOMParser();
    await this.dicomParser.parseAll(files);
    let modelBuilder = new ModelBuilder();
    this.patients = modelBuilder.buildDICOMModel(this.dicomParser.getParsedData());
    this.ready = true;
    this.render();
  }

  render() {
    if (this.ready) {
      return (
        <Host>
          <tree-caret>
            <h2 slot="title">Patients</h2>
            <ul class="list-group mb-0" slot="content">
              {this.patients.map(patient => (
                <li class="list-group-item"><patient-view patient={patient}></patient-view></li>
              ))}
            </ul>
          </tree-caret>
        </Host>
      );
    } else {
      return <Host>
      </Host>
    }
  }
}
