# patient-view



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default     |
| --------- | --------- | ----------- | --------- | ----------- |
| `patient` | --        |             | `Patient` | `undefined` |


## Dependencies

### Used by

 - [dicom-app](../../app)

### Depends on

- [tree-node](../../tree-view)
- [study-view](../study-view)

### Graph
```mermaid
graph TD;
  patient-view --> tree-node
  patient-view --> study-view
  study-view --> tree-node
  study-view --> series-view
  series-view --> tree-node
  series-view --> image-view
  dicom-app --> patient-view
  style patient-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
