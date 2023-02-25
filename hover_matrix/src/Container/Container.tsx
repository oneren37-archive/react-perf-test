import React, { useState } from 'react'
import Cell from '../Cell/Cell'
import './Container.css'

const Container = () => {
    const ROWS = 100
    const COLS = 50

    const [currHovered, setCurrHovered] = useState<Position|null>(null)
    const [intensity, setIntensity] = useState<number[][]>(new Array(10).fill(new Array(10)))

    const ColorIntensity = () => {
        const colors: number[][] = new Array(5).fill([]).map(() => new Array(5).fill(0))
        const recalcColorIntensity = (cellPos: Position) => {
            const dist = Math.sqrt(
                Math.pow(cellPos[0], 2) +
                Math.pow(cellPos[1], 2)
            )

            return 1/(Math.min(dist, 5)+1)-0.2
        }

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                colors[i][j] = recalcColorIntensity([i, j])
            }
        }

        setIntensity(colors)
    }

    React.useEffect(ColorIntensity, [])
    const onHoverCell = (pos: Position) => setCurrHovered(pos)

    return (
        <div className="container">
            {new Array(ROWS).fill(null).map((item, i) => (
                <div className="row" key={i}>
                    {new Array(COLS).fill(null).map((item, j) => (
                        <Cell
                            key={j} 
                            pos={[i, j]}
                            colorIntensity={currHovered === null ? 0 : 
                                intensity[Math.min(Math.abs(i-currHovered[0]), 4)][Math.min(Math.abs(j-currHovered[1]), 4)]}
                            onHoverCell={onHoverCell}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Container

export type Position = [number, number]