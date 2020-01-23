# dicom-app



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type            | Default     |
| -------- | --------- | ----------- | --------------- | ----------- |
| `files`  | --        |             | `ArrayBuffer[]` | `undefined` |


## Methods

### `getSelectedFiles() => Promise<Uint8Array[][]>`



#### Returns

Type: `Promise<Uint8Array[][]>`




## Dependencies

### Depends on

- [folder-select](../folder-select)
- [patient-view](../views/patient-view)

### Graph
```mermaid
graph TD;
  dicom-app --> folder-select
  dicom-app --> patient-view
  patient-view --> tree-node
  patient-view --> study-view
  study-view --> tree-node
  study-view --> series-view
  series-view --> tree-node
  series-view --> image-view
  style dicom-app fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
