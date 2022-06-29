export { debounce, throttle }

const addBtn = document.getElementById('add')
const minusBtn = document.getElementById('minus')
const numBlock = document.getElementById('num')

const debounce = function(delay, fn, ...rest) {
    let timer

    return function() {
        let _this = this
        let arg = rest

        if (timer) clearTimeout(timer)

        timer = setTimeout(function() {
            fn.apply(_this, arg)
        }, delay)
    }
}

const throttle = function(interval, fn, ...rest) {
    let timer

    return function() {
        let _this = this
        let arg = rest

        if (timer) return

        timer = setTimeout(function() {
            timer = null
        }, interval)

        fn.apply(_this, arg)
    }
}

const changeNum = function(node, operition) {
    let num = +node.textContent
    if (operition) node.textContent = ++num
    else node.textContent = --num
}

addBtn.addEventListener('click', debounce(300, changeNum, numBlock, 1))
minusBtn.addEventListener('click', throttle(700, changeNum, numBlock, 0))
