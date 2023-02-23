import React from 'react'
import { Position } from '../Container/Container'
import './Cell.css'

const Cell = (props: ICellProps) => {
  return (
    <div 
        className='cell'
        onMouseEnter={() => props.onHoverCell(props.pos)}
        style={{backgroundColor:`rgba(255,0,0,${props.colorIntensity})`}}
    ></div>
  )
}

export default React.memo(Cell)

interface ICellProps {
    pos: Position,
    colorIntensity: number,
    onHoverCell: (pos: Position) => void
}