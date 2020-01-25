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
        <property-item descriptor="Id" value={this.patient.id}></property-item>
        <property-item descriptor="Name" value={this.patient.name}></property-item>
        <tree-node>
          <div class="text-muted" slot="title">Studies:</div>
          <div slot="content">
            {this.patient.studies.map(study => (
              <study-view study={study}></study-view>
            ))}
          </div>
        </tree-node>
      </Host>
    );
  }

}
