import React, { useState } from 'react'
import Cell from '../Cell/Cell'
import './Container.css'

const Container = () => {

    const [currHovered, setCurrHovered] = useState<Position|null>(null)

    const onHoverCell = (pos: Position) => {
        const [x, y] = pos
        setCurrHovered([x, y])
    }

    const getColorIntensity = (cellPos: Position) => {
        if (currHovered === null) return 0
        if (currHovered[0]-cellPos[0] >= 10) return 0
        if (currHovered[1]-cellPos[1] >= 10) return 0

        const dist = Math.sqrt(
            Math.pow(currHovered[0]-cellPos[0], 2) +
            Math.pow(currHovered[1]-cellPos[1], 2)
        )

        return 1/(Math.min(dist, 10)+1) - 0.1
    }

    return (
        <div className="container">
            {new Array(100).fill(null).map((item, i) => (
                <div className="row" key={i}>
                    {new Array(50).fill(null).map((item, j) => (
                        <Cell 
                            key={j} 
                            pos={[i, j]}
                            colorIntensity={getColorIntensity([i, j])}
                            onHoverCell={onHoverCell}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default React.memo(Container)

export type Position = [number, number]