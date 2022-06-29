let crsBlockArr = [
    crsBlock1,
    crsBlock2,
    crsBlock3,
] = document.querySelectorAll('.crs__block')

const container = document.querySelector('.container')
const crs = document.getElementById('carousel')

const crsWidth = crs.offsetWidth
const picWidth = document.querySelector('.crs__pic').offsetWidth

const idx1 = document.querySelector('#idx1'),
    idx2 = document.querySelector('#idx2'),
    idx3 = document.querySelector('#idx3')

const toggleArrowLeft = document.querySelector('#toggle__arrow__left')
const toggleArrowRight = document.querySelector('#toggle__arrow__right')

const carousel = {
    _curIdx: 2,
    _allIdx: [1, 2, 3],
    _computeTransDstc(idxNum) {
        let computeNum = idxNum - 1
        let transVal = `translate(${-picWidth * computeNum}px)`

        return transVal
    },
    _loopToggle(direction) {
        if (direction === 'right') {
            crsBlock3.after(
                crsBlock1.cloneNode(true),
                crsBlock2.cloneNode(true),
                crsBlock3.cloneNode(true)
            )

            crs.style.transform = this._computeTransDstc(4)

            setTimeout(() => {
                crsBlockArr.forEach(item => item.remove)

                crs.style.transition = 'none'
                crs.style.transform = this._computeTransDstc(1);

                this._curIdx = 1
            }, 200);

            setTimeout(() => {
                crsBlockArr = [
                    crsBlock1,
                    crsBlock2,
                    crsBlock3,
                ] = document.querySelectorAll('.crs__block')

                crs.style.transition = 'transform .2s linear'
            }, 220);
        } else if (direction === 'left') {
            crs.style.transition = 'none'

            crsBlock1.before(
                crsBlock1.cloneNode(true),
                crsBlock2.cloneNode(true),
                crsBlock3.cloneNode(true)
            )

            crs.style.transform = this._computeTransDstc(4);

            setTimeout(() => {
                crs.style.transition = 'transform .2s linear'
                crs.style.transform = this._computeTransDstc(3);
            }, 0)

            setTimeout(() => {
                crsBlockArr.forEach(item => item.remove)

                crs.style.transition = 'none'
                crs.style.transform = this._computeTransDstc(3);

                this._curIdx = 3
            }, 200);

            setTimeout(() => {
                crsBlockArr = [
                    crsBlock1,
                    crsBlock2,
                    crsBlock3,
                ] = document.querySelectorAll('.crs__block')

                crs.style.transition = 'transform .2s linear'
            }, 200);
        } else console.log('Wrong Parameter')
    },
    _activateIdx(idx) {
        if (this._allIdx.includes(idx)) {
            const idxBtnArr = [idx1, idx2, idx3]

            for (item of idxBtnArr) {
                item.className = 'idx__btn'
            }

            idxBtnArr[idx - 1].className = 'idx__btn--active'
        }
    },
    set idx(newIdx) {
        if (this._curIdx === 1 && newIdx === 0) {
            this._loopToggle('left')
            this._activateIdx(3)
            return
        } else if (this._curIdx === 3 && newIdx === 4) {
            this._loopToggle('right')
            this._activateIdx(1)
            return
        }

        if (!this._allIdx.includes(newIdx)) {
            console.log('Wrong Parameter', newIdx)
            return
        }
        
        crs.style.transform = this._computeTransDstc(newIdx);
        this._curIdx = newIdx
        this._activateIdx(newIdx)

    },
    get idx() {
        return this._curIdx
    }
}

carousel.idx = 1

idx1.addEventListener('click', () => carousel.idx = 1)
idx2.addEventListener('click', () => carousel.idx = 2)
idx3.addEventListener('click', () => carousel.idx = 3)

toggleArrowLeft.addEventListener('click', throttle(300, () => carousel.idx--))
toggleArrowRight.addEventListener('click', throttle(300, () => carousel.idx++))

let timer = setInterval(() => carousel.idx++, 1000);

container.addEventListener('pointerenter', () => clearInterval(timer))
container.addEventListener('pointerleave', () => {
    clearInterval(timer)
    timer = setInterval(() => carousel.idx++, 1000)
})

function throttle(interval, fn, ...rest) {
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