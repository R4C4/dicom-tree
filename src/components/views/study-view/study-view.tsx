import { Component, Host, h, Prop, Listen, EventEmitter, Event, Watch, State } from '@stencil/core';

import { Study } from '../../../model/Study';

@Component({
  tag: 'study-view',
  styleUrl: 'study-view.scss',
  shadow: true
})
export class StudyView {
  @Prop() study: Study;
  @Prop({ reflect: true }) checked: boolean;
  @Event({
    eventName: 'studySelected',
    bubbles: true
  }) studySelected: EventEmitter;

  @State() private input?: HTMLInputElement;

  connectedCallback() {
    this.checked = false;
  }

  @Watch('checked')
  checkedPropertyWatchdog(newValue: boolean) {
    if (this.input != null) {
      this.input.checked = newValue;
    }
  }

  @Listen('seriesSelected')
  seriesSelectedHandler(event: CustomEvent) {
    event.stopPropagation();
    let processedEvent = event.detail;
    processedEvent["studyUid"] = this.study.id;
    this.studySelected.emit(processedEvent);
  }

  handleCheckboxEvent() {

    this.checked = this.input.checked;
  }

  render() {
    return (
      <Host>
        <li>Id: {this.study.id}</li>
        <tree-node >
          <input type="checkbox"
            onChange={() => this.handleCheckboxEvent()}
            ref={(input) => this.input = input as HTMLInputElement}></input>
          <b slot="title">Series</b>
          <div slot="content">
            {this.study.series.map(seriesItem => (
              <series-view series={seriesItem} checked={this.checked} ></series-view>
            ))}
          </div>
        </tree-node>
      </Host>
    );
  }

}
