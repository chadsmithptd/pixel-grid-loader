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
  },
};
