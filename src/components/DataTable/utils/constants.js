export const assetModel = {
  type: {
    label: "Type",
    type: null,
    required: true,
    trim: true,
    maxLength: 30,
    validateField(value) {
      return !!value && value.length <= this.maxLength;
    },
    get helperText() {
      return `${this.label} field is required`;
    },
  },
  serial: {
    label: "Serial",
    type: "string",
    required: true,
    validateField(value) {
      return typeof value === this.type;
    },
    get helperText() {
      return `${this.label} field is required`;
    },
  },
  color: {
    label: "Color",
    type: "string",
    trim: true,
    enum: ["black", "white", "red", "green"],
    default: "Black",
    validateField(value) {
      return (
        typeof value === this.type && this.enum.includes(value.toLowerCase())
      );
    },
    get helperText() {
      return `${this.default} is the default`;
    },
  },
  meta: {
    label: "Meta",
    type: "string",
    validateField(value) {
      return typeof value === this.type;
    },
  },
};

export const assetStaticProps = {
  createAsset: {
    title: "Add new asset",
    textContent:
      "To add a new asset, please fill in all the required fields below.",
  },
  editAsset: {
    title: "Edit asset data",
    textContent: "To edit this asset, change the values in the inputs below.",
  },
};
