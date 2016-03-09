export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/traffic_light_vis/traffic_light_vis'
      ]
    }
  });
};
