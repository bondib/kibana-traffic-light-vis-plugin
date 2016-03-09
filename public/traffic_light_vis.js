define(function (require) {
  // we need to load the css ourselves
  require('plugins/traffic_light_vis/traffic_light_vis.css');

  // we also need to load the controller and used by the template
  require('plugins/traffic_light_vis/traffic_light_vis_controller');

  function TrafficLightVisProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));

    // return the visType object, which kibana will use to display and configure new
    // Vis object of this type.
    return new TemplateVisType({
      name: 'traffic_light',
      title: 'Traffic Light',
      description: 'Great for one-glance status readings, the traffic light visualization expresses in green / yellow / red the position of a single value in relation to low and high thresholds.',
      icon: 'fa-car',
      template: require('plugins/traffic_light_vis/traffic_light_vis.html'),
      params: {
        defaults: {
          width: 50,
          redThreshold: 20,          
          greenThreshold: 80,
          redAndGreenOnly: false,
          invertScale: false,
          rotateHorizontaly: false
        },
        editor: require('plugins/traffic_light_vis/traffic_light_vis_params.html')
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        }
      ])
    });
  }

  require('ui/registry/vis_types').register(TrafficLightVisProvider);

  // export the provider so that the visType can be required with Private()
  return TrafficLightVisProvider;
});
