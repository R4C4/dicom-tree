/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  Image,
} from './model/Image';
import {
  Patient,
} from './model/Patient';
import {
  Series,
} from './model/Series';
import {
  Study,
} from './model/Study';

export namespace Components {
  interface DicomApp {
    'blackList': String[];
    'getSelectedFiles': () => Promise<Uint8Array[][]>;
    'loadFiles': (fileBuffer: ArrayBuffer[]) => Promise<void>;
  }
  interface FolderSelect {}
  interface ImageView {
    'image': Image;
  }
  interface PatientView {
    'checked': boolean;
    'patient': Patient;
  }
  interface PropertyItem {
    'descriptor': String;
    'value': String;
  }
  interface SeriesView {
    'checked': boolean;
    'series': Series;
  }
  interface StudyView {
    'checked': boolean;
    'study': Study;
  }
  interface TreeNode {
    'down': boolean;
  }
}

declare global {


  interface HTMLDicomAppElement extends Components.DicomApp, HTMLStencilElement {}
  var HTMLDicomAppElement: {
    prototype: HTMLDicomAppElement;
    new (): HTMLDicomAppElement;
  };

  interface HTMLFolderSelectElement extends Components.FolderSelect, HTMLStencilElement {}
  var HTMLFolderSelectElement: {
    prototype: HTMLFolderSelectElement;
    new (): HTMLFolderSelectElement;
  };

  interface HTMLImageViewElement extends Components.ImageView, HTMLStencilElement {}
  var HTMLImageViewElement: {
    prototype: HTMLImageViewElement;
    new (): HTMLImageViewElement;
  };

  interface HTMLPatientViewElement extends Components.PatientView, HTMLStencilElement {}
  var HTMLPatientViewElement: {
    prototype: HTMLPatientViewElement;
    new (): HTMLPatientViewElement;
  };

  interface HTMLPropertyItemElement extends Components.PropertyItem, HTMLStencilElement {}
  var HTMLPropertyItemElement: {
    prototype: HTMLPropertyItemElement;
    new (): HTMLPropertyItemElement;
  };

  interface HTMLSeriesViewElement extends Components.SeriesView, HTMLStencilElement {}
  var HTMLSeriesViewElement: {
    prototype: HTMLSeriesViewElement;
    new (): HTMLSeriesViewElement;
  };

  interface HTMLStudyViewElement extends Components.StudyView, HTMLStencilElement {}
  var HTMLStudyViewElement: {
    prototype: HTMLStudyViewElement;
    new (): HTMLStudyViewElement;
  };

  interface HTMLTreeNodeElement extends Components.TreeNode, HTMLStencilElement {}
  var HTMLTreeNodeElement: {
    prototype: HTMLTreeNodeElement;
    new (): HTMLTreeNodeElement;
  };
  interface HTMLElementTagNameMap {
    'dicom-app': HTMLDicomAppElement;
    'folder-select': HTMLFolderSelectElement;
    'image-view': HTMLImageViewElement;
    'patient-view': HTMLPatientViewElement;
    'property-item': HTMLPropertyItemElement;
    'series-view': HTMLSeriesViewElement;
    'study-view': HTMLStudyViewElement;
    'tree-node': HTMLTreeNodeElement;
  }
}

declare namespace LocalJSX {
  interface DicomApp {
    'blackList'?: String[];
  }
  interface FolderSelect {
    'onFilesLoaded'?: (event: CustomEvent<any>) => void;
  }
  interface ImageView {
    'image'?: Image;
  }
  interface PatientView {
    'checked'?: boolean;
    'onSeriesSelected'?: (event: CustomEvent<any>) => void;
    'patient'?: Patient;
  }
  interface PropertyItem {
    'descriptor'?: String;
    'value'?: String;
  }
  interface SeriesView {
    'checked'?: boolean;
    'onSeriesSelected'?: (event: CustomEvent<any>) => void;
    'series'?: Series;
  }
  interface StudyView {
    'checked'?: boolean;
    'onStudySelected'?: (event: CustomEvent<any>) => void;
    'study'?: Study;
  }
  interface TreeNode {
    'down'?: boolean;
  }

  interface IntrinsicElements {
    'dicom-app': DicomApp;
    'folder-select': FolderSelect;
    'image-view': ImageView;
    'patient-view': PatientView;
    'property-item': PropertyItem;
    'series-view': SeriesView;
    'study-view': StudyView;
    'tree-node': TreeNode;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'dicom-app': LocalJSX.DicomApp & JSXBase.HTMLAttributes<HTMLDicomAppElement>;
      'folder-select': LocalJSX.FolderSelect & JSXBase.HTMLAttributes<HTMLFolderSelectElement>;
      'image-view': LocalJSX.ImageView & JSXBase.HTMLAttributes<HTMLImageViewElement>;
      'patient-view': LocalJSX.PatientView & JSXBase.HTMLAttributes<HTMLPatientViewElement>;
      'property-item': LocalJSX.PropertyItem & JSXBase.HTMLAttributes<HTMLPropertyItemElement>;
      'series-view': LocalJSX.SeriesView & JSXBase.HTMLAttributes<HTMLSeriesViewElement>;
      'study-view': LocalJSX.StudyView & JSXBase.HTMLAttributes<HTMLStudyViewElement>;
      'tree-node': LocalJSX.TreeNode & JSXBase.HTMLAttributes<HTMLTreeNodeElement>;
    }
  }
}


