import { Component, h, Event, EventEmitter, Host } from '@stencil/core';

@Component({
    tag: 'folder-select',
    styleUrl: 'folder-select.scss'
})
/**
 * Folder Selector Component using webkitdirectory with multiple attribute fallback
 */
export class FolderSelect {

    @Event({
        eventName: 'filesLoaded',
        bubbles: true
    })
    /**
     * Event 'filesLoaded' emmited when files have been submitted and its contents read into buffers
     *  */ 
    filesLoaded: EventEmitter;
    fileBuffer: ArrayBuffer[];

    private filesProcessed:number;

    private input?: HTMLInputElement;

    constructor() {
    }

    connectedCallback() { 
        this.fileBuffer = [];
        this.filesProcessed = 0;
    }

    componentDidLoad() {

        this.input.setAttribute('webkitdirectory', '');
        this.input.setAttribute('mozdirectory', '');
    }

    private onInputChange(files: FileList) {
        this.fileBuffer = [];
        let filteredFiles = Array.from(files).filter((file) => file.name.split('.').pop() == 'dcm');
        for (var i = 0; i < filteredFiles.length; i++) {
            this.uploadFile(filteredFiles[i], filteredFiles.length);
        }
    }

    private uploadFile(file: File, maxFiles: number) {
        // create a new instance of HTML5 FileReader api to handle uploading
        const reader = new FileReader();
        reader.onloadstart = () => {
        }

        reader.onload = (e) => {
            if (e.target.result instanceof String) {
                return;
            }
            this.fileBuffer.push(e.target.result as ArrayBuffer);
            this.filesProcessed++;

            if (this.filesProcessed == maxFiles ) {
                this.filesLoaded.emit(this.fileBuffer);
            }
            return;
        };

        reader.onerror = (err) => {
            console.error('something went wrong while trying to read the file ' + file.name, err);
        };

        reader.readAsArrayBuffer(file);

    }

    handleClickEvent() {
        this.input.click();
    }

    render() {
        return (
            <Host onClick={() => this.handleClickEvent()}  >
                <slot name="buttonStyle">
                    Select Files
                    <input id="DICOMFiles" type="file" multiple accept=".dcm"
                        onChange={($event: any) => this.onInputChange($event.target.files)}
                        ref={(input) => this.input = input as HTMLInputElement}></input>
                </slot>
            </Host>
        );
    }
}
