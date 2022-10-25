import { Draggable } from 'react-beautiful-dnd'

import Opportunity from './Opportunity'

const Step = ({ name, opportunities }) => {
  return (
    <div className="border-black border-2 m-4 p-2 w-60">
      {name}
      {opportunities.map((opportunity, i) => {
        return (
          <Draggable draggableId={opportunity.name} key={i} index={i}>
            {(provided) => {
              return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}><Opportunity opportunityKey={opportunity} /></div>
            }}
          </Draggable>)}
          )}
    </div>
  )
}

export default Step