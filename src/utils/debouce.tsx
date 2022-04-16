export default function debounce(this: any, fn: any, delay: number) {
  let timer: any;
  const thisContext = this;
  const args: any = arguments;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(thisContext, args), delay);
  };
}
