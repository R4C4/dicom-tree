import { Component, Host, h, Prop, Element, getAssetPath } from '@stencil/core';

@Component({
  tag: 'tree-node',
  styleUrl: 'tree-node.scss',

})
export class NodeCaretView {
  @Prop() down: boolean;
  @Element() self: HTMLElement;
  private chevronRight: string;
  private chevronDown: string;

  handleClick(event: UIEvent) {
    event.stopPropagation();
    this.down = !this.down;
    this.render();
  }

  componentWillLoad() {
    this.chevronRight = getAssetPath('../../assets/chevron.svg');
    this.chevronDown = getAssetPath('../../assets/chevron-down.svg');

  }


  render() {
    return (
      <Host>
        <div class="container">
          <div class="row">
            <div class="column"  onClick={(e: UIEvent) => this.handleClick(e)}> 
              {
                this.down ?
                  <img class="align-middle" src={this.chevronDown}></img> :
                  <img class="align-middle"src={this.chevronRight}></img>
              }
            </div>
            <div class="column"  onClick={(e: UIEvent) => this.handleClick(e)}>
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
