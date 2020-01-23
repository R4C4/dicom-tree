import { Component, Host, h, Listen, State, Prop, Method } from '@stencil/core';

import { Patient } from '../../model/Patient';
import { Series } from '../../model/Series';
import { ModelBuilder } from '../../utils/modelBuilder';
import { DICOMParser } from '../../utils/loader';


@Component({
  tag: 'dicom-app',
  styleUrl: 'app.css',
  shadow: true
})
export class App {
  @State() ready: boolean;
  @Prop() files?: ArrayBuffer[];

  private dicomParser: DICOMParser;
  private patients: Patient[];

  private wantedItems: Map<Series, string>;
  constructor() {
  }

  connectedCallback() {
    this.ready = false;
    this.wantedItems = new Map();
    if (this.files) {
      this.files = null;
    }
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


  @Listen('filesLoaded')
  filesLoadedHandler(event: CustomEvent) {
    this.files = event.detail as ArrayBuffer[]
    this.dicomParser = new DICOMParser(this.files);
    let modelBuilder = new ModelBuilder();
    this.patients = modelBuilder.buildDICOMModel(this.dicomParser.getParsedData());
    this.ready = true;
  }

  render() {
    if (this.ready) {
      return (
        <Host>
          <folder-select></folder-select>
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
        <folder-select></folder-select>
      </Host>
    }
  }

  private

}
