import { Component, Host, h, Prop } from '@stencil/core';

import { Patient } from '../../../model/Patient';

@Component({
  tag: 'patient-view',
  styleUrl: 'patient-view.scss',
  shadow: true
})
export class PatientView {

  @Prop() patient: Patient;

  connectedCallback() {

  }

  render() {
    return (
      <Host>
        <small class="text-muted">Patient</small>
        <property-item descriptor="Id" value={this.patient.id}></property-item>
        <property-item descriptor="Name" value={this.patient.name}></property-item>
        <tree-node>
          <div class="text-muted" slot="title">Studies:</div>
          <ul class="list-group mb-0" slot="content">
            {this.patient.studies.map(study => (
              <li class="list-group-item"><study-view study={study}></study-view></li>
            ))}
          </ul>
        </tree-node>
      </Host>
    );
  }

}
