import { Component, Host, h, Prop, Event , EventEmitter} from '@stencil/core';

import { Series } from '../../../model/Series';

@Component({
  tag: 'series-view',
  styleUrl: 'series-view.css',
  shadow: true
})
export class SeriesView {
  @Prop() series: Series;
  @Event({
    eventName: 'seriesSelected',
    bubbles: true
  }) seriesSelected: EventEmitter;

  private input?:HTMLInputElement;

  connectedCallback(){
    if(this.input){
      this.input.checked = false;
    }
  }

  handleCheckboxEvent() {
    this.seriesSelected.emit({series: this.series, selected: this.input.checked});
  }


  render() {
    return (
      <Host>
        <div>
        <input type="checkbox" onChange={ () => { this.handleCheckboxEvent() }}   ref={(input)=> this.input = input as HTMLInputElement}   ></input>
        <b>UId: {this.series.uid}</b>
        <li>Series Number: {this.series.number}</li>
        </div>
        <tree-node>
          <b slot="title">Images:</b>
          <div slot="content">
            {this.series.images.map(img => (
              <li><image-view image={img}></image-view></li>
            ))}
          </div>
        </tree-node>
      </Host>
    )
  }

}
