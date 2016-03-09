define(function (require) {

  var module = require('ui/modules').get('kibana/traffic_light_vis', ['kibana']);

  module.controller('TrafficLightVisController', function ($scope, Private) {
    var tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));

    var metrics = $scope.metrics = [];

    $scope.processTableGroups = function (tableGroups) {
      tableGroups.tables.forEach(function (table) {
        table.columns.forEach(function (column, i) {
            let metricValue = table.rows[0][i];
            let params = $scope.vis.params;
          metrics.push({
            label: column.title,
            value: metricValue,
            isRedLightOn: (!params.invertScale && metricValue <= params.redThreshold) || (params.invertScale && metricValue.value >= params.redThreshold),
            isYellowOn: (!params.invertScale && metricValue > params.redThreshold && metricValue < params.greenThreshold) || (params.invertScale && metricValue < params.redThreshold && metricValue > params.greenThreshold),
            isGreenOn: (params.redAndGreenOnly && ((!params.invertScale && metricValue > params.redThreshold) || (params.invertScale && metricValue < params.redThreshold))) || 
                 (!params.redAndGreenOnly && ((!params.invertScale && metricValue >= params.greenThreshold) || (params.invertScale && metricValue <= params.greenThreshold)))
          });
        });
      });
    };

    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        metrics.length = 0;
        $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
      }
    });
  });
});
