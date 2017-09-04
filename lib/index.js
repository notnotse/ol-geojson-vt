'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = require('openlayers');

var _openlayers2 = _interopRequireDefault(_openlayers);

var _geojsonVt = require('geojson-vt');

var _geojsonVt2 = _interopRequireDefault(_geojsonVt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeoJSONVectorTileSource = function GeoJSONVectorTileSource(options) {
  var vtFeatureToGeoJsonFeature = function vtFeatureToGeoJsonFeature(vtFeature) {
    var types = { 1: 'MultiPoint', 2: 'MultiLineString', 3: 'MultiPolygon' };

    return {
      id: vtFeature.id,
      type: 'Feature',
      geometry: {
        'type': types[vtFeature.type],
        'coordinates': vtFeature.type === 3 ? [vtFeature.geometry] : vtFeature.geometry
      },
      'properties': vtFeature.tags
    };
  };

  var tilePixels = new _openlayers2.default.proj.Projection({
    code: 'TILE_PIXELS',
    units: 'tile-pixels'
  });

  var state = {
    tileIndex: (0, _geojsonVt2.default)(options.data, { extent: 4096 })
  };

  return new _openlayers2.default.source.VectorTile(Object.assign({}, options, {
    format: new _openlayers2.default.format.GeoJSON(),
    tileUrlFunction: function tileUrlFunction() {
      return 'data';
    },
    tileLoadFunction: function tileLoadFunction(tile, url) {
      var tileCoord = tile.getTileCoord();
      var vectorTiles = state.tileIndex.getTile(tileCoord[0], tileCoord[1], -tileCoord[2] - 1);
      var features = tile.getFormat().readFeatures({
        type: 'FeatureCollection',
        features: vectorTiles ? vectorTiles.features.map(vtFeatureToGeoJsonFeature) : []
      });
      tile.setLoader(function () {
        tile.setFeatures(features);
        tile.setProjection(tilePixels);
      });
    }
  }));
};

exports.default = GeoJSONVectorTileSource;