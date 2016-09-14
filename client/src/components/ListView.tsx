import * as React from 'react'
import {render} from 'react-dom'

export interface Item {
  id: number
  name: string
}

interface Props {
  activeId?: number
  items: Item[]
  onClick<T>(id: number): T
}

interface State { }

export default class ListView extends React.Component<Props, State> {
  render() {
    return <ul className="ListView">
      {this.props.items.map(({id, name}) =>
        <li key={id}><a
          className={id === this.props.activeId ? '--isActive' : ''}
          href="#"
          onClick={() => this.props.onClick(id)}
        >{name}</a></li>
      )}
    </ul>
  }
}