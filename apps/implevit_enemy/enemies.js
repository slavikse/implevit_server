const enemies = [
  {
    id: 1,

    position: {
      top: {
        default: -120,
        value: -120,
        step: 1.1,
      },
      left: {
        default: 10,
        value: 10,
        step: 0,
      },
    },

    scale: {
      // max - увеличение | min - уменьшение.
      type: 'max',
      value: 0.9,
      step: 0.01,
      min: 0.6,
      max: 1.5,
    },
  },
  {
    id: 2,

    position: {
      top: {
        default: -150,
        value: -150,
        step: 0.2,
      },
      left: {
        default: 250,
        value: 250,
        step: 0,
      },
    },

    scale: {
      type: 'max',
      value: 0.7,
      step: 0.03,
      min: 0.8,
      max: 1.1,
    },
  },
  {
    id: 3,

    position: {
      top: {
        default: -200,
        value: -200,
        step: 0.7,
      },
      left: {
        default: 100,
        value: 100,
        step: 0,
      },
    },

    scale: {
      type: 'min',
      value: 0.8,
      step: 0.01,
      min: 0.7,
      max: 1.8,
    },
  },
  {
    id: 4,

    position: {
      top: {
        default: -200,
        value: -200,
        step: 0.3,
      },
      left: {
        default: 30,
        value: 30,
        step: 0,
      },
    },

    scale: {
      type: 'min',
      value: 0.7,
      step: 0.08,
      min: 0.9,
      max: 1.4,
    },
  },
  {
    id: 5,

    position: {
      top: {
        default: -120,
        value: -120,
        step: 0.6,
      },
      left: {
        default: 350,
        value: 350,
        step: 0,
      },
    },

    scale: {
      type: 'min',
      value: 0.8,
      step: 0.04,
      min: 0.3,
      max: 2.4,
    },
  },
  {
    id: 6,

    position: {
      top: {
        default: -300,
        value: -300,
        step: 0.9,
      },
      left: {
        default: 80,
        value: 80,
        step: 0,
      },
    },

    scale: {
      type: 'min',
      value: 0.7,
      step: 0.03,
      min: 0.4,
      max: 1.9,
    },
  },
];

module.exports = enemies;
