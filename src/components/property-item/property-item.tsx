import { Prop, h, Component, Host } from "@stencil/core";

@Component({
  tag: 'property-item',
  styleUrl: 'property-item.scss',
  shadow: true
})
export class PropertyList {
  @Prop() descriptor:String;
  @Prop() value:String;



  render() {
    return (
      <Host>
          <div class="py-0 list-group-item">
            <p class="list-group-item-text text-wrap">
              {this.descriptor} : {this.value}
            </p>
          </div>
      </Host>);
  }
}