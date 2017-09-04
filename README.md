# ol-geojson-vt

OpenLayers source class for loading GeoJSON as vector tiles. This makes it possible to render large geospatial datasets on the browser side without a server.

This library utilizes the [geojson-vt](https://github.com/mapbox/geojson-vt) library to enable efficient slicing of GeoJSON data into vector tiles on the fly.

Example:

```
import ol from 'openlayers'
import GeoJSONVectorTileSource from 'ol-geojson-vt'

const map = new ol.Map({
  layers: [
    new ol.layer.VectorTile({
      source: new GeoJSONVectorTileSource({
        data: {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [0, 0]
              }
            }
          ]
        }
      })
    })
  ],
  view: new ol.View({
    center: [0, 0],
    zoom: 3
  })
})

```

## Install

`npm install ol-geojson-vt --save`

## Development

1. git clone https://github.com/notnotse/ol-geojson-vt.git
1. cd ol-geojson-vt
1. npm install
1. npm start
1. http://localhost:3000/
