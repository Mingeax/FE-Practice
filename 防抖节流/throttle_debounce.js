const addBtn = document.getElementById("add");
const minusBtn = document.getElementById("minus");
const numBlock = document.getElementById("num");

const debounce = function (delay, fn) {
  let timer;

  return function (...args) {
    let _this = this;

    if (timer) clearTimeout(timer);

    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
};

const throttle = function (interval, fn) {
  let timer;

  return function (...args) {
    let _this = this;

    if (timer) return;

    // 节流有多种类型,可以在一个时段内的不同时间执行回调函数, 下面的例子是在第一次调用函数时执行
    timer = setTimeout(function () {
      timer = null;
    }, interval);

    // 如要在时段结束时执行回调,可以把这一行移到定时器内部
    fn.apply(_this, args);
  };
};

const changeNum = function (node, operition) {
  if (operition) node.textContent++;
  else node.textContent--;
};

const debouncedAdd = debounce(300, changeNum);
const throttledMinus = throttle(700, changeNum);

addBtn.addEventListener("click", () => debouncedAdd(numBlock, 1));
minusBtn.addEventListener("click", () => throttledMinus(numBlock, 0));
