import { Component, Host, h, Listen, State, Method } from '@stencil/core';

import { Patient } from '../../model/Patient';
import { Series } from '../../model/Series';
import { ModelBuilder } from '../../utils/modelBuilder';
import { DICOMParser } from '../../utils/loader';

@Component({
  tag: 'dicom-app',
  styleUrl: 'dicom-app.scss',
  shadow: true
})
export class App {
  @State() ready: boolean;

  private dicomParser: DICOMParser;
  private patients: Patient[];

  private wantedItems: Map<Series, string>;
  constructor() {
  }

  connectedCallback() {
    this.ready = false;
    this.wantedItems = new Map();
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

  @Method()
  async loadFiles(fileBuffer) {
    let files =   fileBuffer as ArrayBuffer[]
    this.dicomParser = new DICOMParser(files);
    let modelBuilder = new ModelBuilder();
    this.patients = modelBuilder.buildDICOMModel(this.dicomParser.getParsedData());
    this.ready = true;
    this.render();
  }

  render() {
    if (this.ready) {
      return (
        <Host>
          <h1>Dicom Directory</h1>
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
