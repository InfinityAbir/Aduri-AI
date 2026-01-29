/**
 * Simple Bangla vs English detector
 * Checks Unicode range for Bangla characters
 */
export function detectLanguage(text = "") {
  const banglaRegex = /[\u0980-\u09FF]/;
  return banglaRegex.test(text) ? "bn" : "en";
}
