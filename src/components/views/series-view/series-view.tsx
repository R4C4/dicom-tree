import { Component, Host, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';

import { Series } from '../../../model/Series';

@Component({
  tag: 'series-view',
  styleUrl: 'series-view.scss',
  shadow: true
})
export class SeriesView {
  @Prop() series: Series;
  @Prop({ reflect: true }) checked: boolean;
  @Event({
    eventName: 'seriesSelected',
    bubbles: true
  }) seriesSelected: EventEmitter;

  input?: HTMLInputElement;

  connectedCallback() {
  }

  compoentWillLoad() {
    this.checked = false;
  }

  @Watch('checked')
  checkedPropertyWatchdog(newValue: boolean) {
    if (this.input != null) {
      this.input.checked = newValue;
    }
  }


  private getStyledListItem(key: string, value: any) {
    return <li class="list-group-item">{key} : {value}</li>;
  }


  handleCheckboxEvent() {
    this.checked = this.input.checked;
    this.seriesSelected.emit({ series: this.series, selected: this.input.checked });
  }


  render() {
    return (
      <Host>

        <input type="checkbox" class="form-check-input position-static"
          onChange={() => this.handleCheckboxEvent()}
          ref={(input) => this.input = input as HTMLInputElement}>
        </input>
        <ul class="list-group list-group-flush">
          {this.getStyledListItem('UId', this.series.uid)}
          {this.getStyledListItem('Modality', this.series.modality)}
          {this.getStyledListItem('Number', this.series.number)}
        </ul>
        <tree-node>
          <b slot="title">Images:</b>
          <ul slot="content" class="list-group list-group-flush">
            {this.series.images.map(img => (
              <li class="list-group-item"><image-view image={img}></image-view></li>
            ))}
          </ul>
        </tree-node>
      </Host>
    )
  }

}
