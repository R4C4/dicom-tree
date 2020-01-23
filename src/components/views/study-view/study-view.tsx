import { Component, Host, h, Prop, Listen, EventEmitter, Event } from '@stencil/core';

import { Study } from '../../../model/Study';

@Component({
  tag: 'study-view',
  styleUrl: 'study-view.css',
  shadow: true
})
export class StudyView {
  @Prop() study: Study;
  @Event({
    eventName: 'studySelected',
    bubbles: true
  }) studySelected: EventEmitter;

  connectedCallback() {

  }


  @Listen('seriesSelected')
  seriesSelectedHandler(event: CustomEvent) {
    event.stopPropagation();
    let processedEvent = event.detail;
    processedEvent["studyUid"] = this.study.id;
    this.studySelected.emit(processedEvent);
  }

  render() {
    return (
      <Host>
        <li>Id: {this.study.id}</li>
        <tree-node>
          <b slot="title">Series</b>
          <div slot="content">
            {this.study.series.map(seriesItem => (
              <series-view series={seriesItem}></series-view>
            ))}
          </div>
        </tree-node>
      </Host>
    );
  }

}
