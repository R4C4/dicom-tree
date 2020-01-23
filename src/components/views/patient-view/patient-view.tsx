import { Component, Host, h, Prop } from '@stencil/core';

import { Patient } from '../../../model/Patient';

@Component({
  tag: 'patient-view',
  styleUrl: 'patient-view.css',
  shadow: true
})
export class PatientView {

  @Prop() patient: Patient;

  render() {
    return (
      <Host>
        <b>Patient</b>
        <li>Id: {this.patient.id}</li>
        <li >Name: {this.patient.name}</li>
        <tree-node>
          <b slot="title">Studies:</b>
          <div slot="content">
          {this.patient.studies.map(study => (
              <li><study-view study={study}></study-view></li>
            ))}
          </div>
        </tree-node>
      </Host>
    );
  }

}
