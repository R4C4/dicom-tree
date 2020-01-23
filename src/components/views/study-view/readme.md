# study-view



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type    | Default     |
| -------- | --------- | ----------- | ------- | ----------- |
| `study`  | --        |             | `Study` | `undefined` |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `studySelected` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [patient-view](../patient-view)

### Depends on

- [tree-node](../../tree-view)
- [series-view](../series-view)

### Graph
```mermaid
graph TD;
  study-view --> tree-node
  study-view --> series-view
  series-view --> tree-node
  series-view --> image-view
  patient-view --> study-view
  style study-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
