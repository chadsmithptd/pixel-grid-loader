export default {
  editor: {
    label: {
      en: "Pixel Grid Loader",
    },
    icon: "loader",
  },
  options: {
    displayAllowedValues: ["flex", "inline-flex"],
  },
  inherit: {
    type: "ww-layout",
  },
  properties: {
    label: {
      label: {
        en: "Label",
      },
      type: "Text",
      bindable: true,
      section: "settings",
      defaultValue: "",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Text shown next to the animated grid. Leave empty to use the variant's default label.",
      },
      propertyHelp: {
        tooltip: "Shimmering status label, e.g. 'Loading' or 'Churning'.",
      },
      /* wwEditor:end */
    },
    variant: {
      label: {
        en: "Variant",
      },
      type: "TextSelect",
      bindable: true,
      section: "settings",
      defaultValue: "Drive",
      options: {
        options: [
          { value: "Drive", label: "Drive" },
          { value: "Dots", label: "Dots" },
          { value: "Orbit", label: "Orbit" },
          { value: "Surfer", label: "Surfer" },
        ],
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "One of: Drive, Dots, Orbit, Surfer.",
      },
      propertyHelp: {
        tooltip: "Drive: square chevron wavefront. Dots: same wavefront, round cells. Orbit: comet lapping the grid. Surfer: Drive loader with a video card below.",
      },
      /* wwEditor:end */
    },
    videoSrc: {
      label: {
        en: "Video",
      },
      type: "Video",
      bindable: true,
      section: "settings",
      defaultValue: "",
      hidden: content => content?.variant !== "Surfer",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "URL of the video to loop under the label in the Surfer variant.",
      },
      propertyHelp: {
        tooltip: "Only used by the Surfer variant. Falls back to a mini loader with 'Video unavailable' if it fails to load.",
      },
      /* wwEditor:end */
    },
    showDots: {
      label: {
        en: "Show dots",
      },
      type: "OnOff",
      bindable: true,
      section: "settings",
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "true to show the animated grid, false to hide it.",
      },
      propertyHelp: {
        tooltip: "Hide the animated grid while keeping the label and elapsed timer visible.",
      },
      /* wwEditor:end */
    },
    dotColor: {
      label: {
        en: "Dot color",
      },
      type: "Color",
      bindable: true,
      section: "style",
      defaultValue: "#18181b",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "A CSS color for the grid dots and the label's dark shimmer stop.",
      },
      propertyHelp: {
        tooltip: "Primary color: the grid dots and the darkest point of the label shimmer.",
      },
      /* wwEditor:end */
    },
    mutedColor: {
      label: {
        en: "Muted color",
      },
      type: "Color",
      bindable: true,
      section: "style",
      defaultValue: "#a1a1aa",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "A CSS color for the elapsed timer text and the label's light shimmer stops.",
      },
      propertyHelp: {
        tooltip: "Secondary color: the elapsed timer text and the lightest points of the label shimmer.",
      },
      /* wwEditor:end */
    },
    autoStart: {
      label: {
        en: "Auto start",
      },
      type: "OnOff",
      bindable: true,
      section: "settings",
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "true to start the elapsed timer automatically on mount, false to wait for the Start action.",
      },
      propertyHelp: {
        tooltip: "Turn off to control the timer yourself with the Start / Stop / Reset actions from a workflow.",
      },
      /* wwEditor:end */
    },
  },
  actions: [
    {
      label: { en: "Start timer" },
      action: "startTimer",
    },
    {
      label: { en: "Stop timer" },
      action: "stopTimer",
    },
    {
      label: { en: "Reset timer" },
      action: "resetTimer",
    },
  ],
};
