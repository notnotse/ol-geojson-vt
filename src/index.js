import ol from 'openlayers'
import geojsonvt from 'geojson-vt'

const GeoJSONVectorTileSource = function (options) {
  const vtFeatureToGeoJsonFeature = (vtFeature) => {
    const types = {1: 'MultiPoint', 2: 'MultiLineString', 3: 'MultiPolygon'}

    return {
      id: vtFeature.id,
      type: 'Feature',
      geometry: {
        'type': types[vtFeature.type],
        'coordinates': vtFeature.type === 3 ? [vtFeature.geometry] : vtFeature.geometry
      },
      'properties': vtFeature.tags
    }
  }

  const tilePixels = new ol.proj.Projection({
    code: 'TILE_PIXELS',
    units: 'tile-pixels'
  })

  const state = {
    tileIndex: geojsonvt(options.data, {extent: 4096})
  }

  return new ol.source.VectorTile(Object.assign({}, options, {
    format: new ol.format.GeoJSON(),
    tileUrlFunction: () => 'data',
    tileLoadFunction: (tile, url) => {
      const tileCoord = tile.getTileCoord()
      const vectorTiles = state.tileIndex.getTile(tileCoord[0], tileCoord[1], -tileCoord[2] - 1)
      const features = tile.getFormat().readFeatures({
        type: 'FeatureCollection',
        features: vectorTiles ? vectorTiles.features.map(vtFeatureToGeoJsonFeature) : []
      })
      tile.setLoader(() => {
        tile.setFeatures(features)
        tile.setProjection(tilePixels)
      })
    }
  }))
}

export default GeoJSONVectorTileSource
