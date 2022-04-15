export default function debounce(fn, delay) {
  let timer;
  const thisContext = this;
  const args = arguments;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return fn.apply(thisContext, args);
    }, delay);
  };
}