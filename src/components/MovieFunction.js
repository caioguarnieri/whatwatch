export function movieLength(movieRuntime) {
  let hours = Math.floor(movieRuntime / 60);
  let minutes = movieRuntime % 60;
  return hours + " h " + minutes + "min";
}
