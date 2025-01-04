// Set theme based on system preference initially
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const rootElement = document.documentElement;

// Set the initial theme
rootElement.setAttribute("data-theme", systemPrefersDark ? "dark" : "light");

// Add click event listeners to all buttons with a "data-theme" attribute
document.querySelectorAll("button[data-theme-id]").forEach((button) => {
  button.addEventListener("click", () => {
    const newTheme = button.getAttribute("data-theme-id");
    rootElement.setAttribute("data-theme", newTheme);
  });
});

const numGrays = 9; // Number of swatches excluding black/white

/** Adjust the lightness */

const slider = document.getElementById("k-slider");
const kValueSpan = document.getElementById("k-value");
const powerSeriesPre = document.getElementById("power-series");
const scaledLightnessPre = document.getElementById("scaled-lightness");
const colorBar = document.getElementById("color-bar");
const rampContainer = document.getElementById("grayscale-ramp");

function computeRamp(numGrays, k) {
  const rawSeries = Array.from({ length: numGrays }, (_, i) =>
    Math.pow(i + 1, k)
  );

  const max = Math.max(...rawSeries);
  const scaledSeries = rawSeries.map((v) => Math.round((v / max) * 100));

  return [0, ...scaledSeries, 100];
}

function updateRamp() {
  const k = parseFloat(slider.value);
  kValueSpan.textContent = k.toFixed(2);

  const ramp = computeRamp(numGrays, k);

  const rootStyle = rootElement.style;
  ramp.forEach((lightness, index) => {
    rootStyle.setProperty(`--lightness-${index * 100}`, `${lightness}%`);
  });
}

slider.addEventListener("input", updateRamp);

/** Saturation */
const saturationSlider = document.getElementById("saturation-k-slider");
const saturationKValueSpan = document.getElementById("saturation-k-value");
const saturationValueSpan = document.getElementById("saturation-value");

function computeSaturationRamp(numGrays, kSat) {
  /**
   * Compute a ramp of perceptual saturation adjustments.
   *
   * @param {number} numGrays - Number of gray levels to compute.
   * @param {number} kSat - Exponent for perceptual scaling.
   * @returns {number[]} - Array of adjusted saturation values.
   */
  const c = 5; // Scaling constant to fit [0, 100]
  const ramp = [];

  for (let i = 0; i < numGrays; i++) {
    const x = i / (numGrays - 1); // Normalize position to [0, 1]
    ramp.push(Math.round(c * Math.pow(x, kSat)));
  }

  return ramp;
}

function updateSaturationRamp() {
  /**
   * Updates the saturation ramp dynamically based on the saturation exponent slider.
   */

  const kSat = parseFloat(saturationSlider.value); // Saturation slider value
  saturationKValueSpan.textContent = kSat.toFixed(2);

  const saturationRamp = computeSaturationRamp(numGrays, kSat);

  // Update CSS variables for saturation
  const rootStyle = rootElement.style;
  saturationRamp.forEach((saturation, index) => {
    rootStyle.setProperty(`--saturation-${index * 100}`, `${saturation}%`);
  });

  // Update the UI (optional, for debugging or visualization)
  console.log("Saturation Ramp:", saturationRamp);
}

// Initialize
saturationSlider.addEventListener("input", updateSaturationRamp);
updateSaturationRamp();

/** Hue */
const hueSlider = document.getElementById("hue-slider");
const hueValueSpan = document.getElementById("hue-value");

function updateHue() {
  /**
   * Updates the hue dynamically based on the slider value.
   */
  const hue = parseInt(hueSlider.value, 10); // Get the slider value
  hueValueSpan.textContent = hue; // Update the displayed value

  // Update CSS variable for hue
  const rootStyle = rootElement.style;
  rootStyle.setProperty("--hue", hue);
}

// Initialize the hue slider
hueSlider.addEventListener("input", updateHue);
updateHue(); // Set the initial value
