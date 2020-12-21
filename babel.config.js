const presets = [
  [
    "@babel/preset-env",
    {
      "modules": false,
      useBuiltIns: 'usage',
      "corejs": {
        "version": 3,
        "proposals": true
        // helpers: true
      }
    },
  ],
];
module.exports = {
  presets,
  "plugins": [
    ["lodash"]
  ]
};
