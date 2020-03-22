import { configure } from "@storybook/vue";

import Vue from "vue";

function loadStories() {
  require("../src/stories/index.js");
}

configure(loadStories, module);