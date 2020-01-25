import { Component, Host, h, Prop, Element, getAssetPath } from '@stencil/core';

@Component({
  tag: 'tree-node',
  styleUrl: 'tree-node.scss',

})
export class NodeCaretView {
  @Prop() down: boolean;
  @Element() self: HTMLElement;
  private imagePath:string;

  handleClick(event: UIEvent) {
    event.stopPropagation();
    this.down = !this.down;
    this.render();
  }

  componentWillLoad() {
    this.imagePath = getAssetPath('./assets/chevron.svg');
  }


  render() {
    return (
      <Host>
        <div class="container" onClick={(e: UIEvent) => this.handleClick(e)} >
          <div class="row">
            <div class="column">
              <img src={this.imagePath} class={{
                'caret': true,
                'caret-down': this.down
              }}></img>
            </div>
            <div class="column">
              <slot name="title"></slot>
            </div>
          </div>
        </div>
        <div hidden={!this.down}>
          <slot name="content"></slot>
        </div>
      </Host>
    );
  }

}
