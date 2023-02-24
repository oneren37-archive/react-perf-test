const ROWS = 100
const COLS = 50

const cells = []
const colorInt = new Array(10).fill([]).map(() => new Array(10).fill(0))
let currHovered = null
let prevHovered = null

const renderCells = () => {
    const container = document.querySelector('.container')

    for (let i = 0; i < ROWS; i++) {
        const row = document.createElement('div')
        row.classList.add('row')
        const rowArr = []

        for (let j = 0; j < COLS; j++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.addEventListener('mousemove', () => onHover(i, j))
            rowArr.push(cell)
            row.appendChild(cell)
        }

        cells.push(rowArr)
        container.appendChild(row)
    }
}

const onHover = (i, j) => {
    prevHovered = currHovered === null ? null : [...currHovered]
    currHovered = [i, j]

    if (prevHovered) {
        for (let r = Math.max(prevHovered[0]-5, 0); r < Math.min(prevHovered[0]+5, ROWS); r++) {
            for (let c = Math.max(prevHovered[1]-5, 0); c < Math.min(prevHovered[1]+5, COLS); c++) {
                cells[r][c].style['background-color'] = `rgba(255, 0, 0, 0)`
            }
        }
    }

    for (let r = Math.max(i-5, 0); r < Math.min(i+5, ROWS); r++) {
        for (let c = Math.max(j-5, 0); c < Math.min(j+5, COLS); c++) {
            cells[r][c].style['background-color'] = `rgba(255, 0, 0, ${colorInt[-i+r+5][-j+c+5]})`
        }
    }
    
}

const colorIntensity = () => {
    const recalcColorIntensity = (cellPos) => {
        const dist = Math.sqrt(
            Math.pow(5-cellPos[0], 2) +
            Math.pow(5-cellPos[1], 2)
        )

        return 1/(Math.min(dist, 5)+1)-0.2
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            colorInt[i][j] = recalcColorIntensity([i, j])
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    colorIntensity()
    renderCells()
})