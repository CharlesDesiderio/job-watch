import { useContext, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';

import AppContext from '../Context';
import NewOpportunity from './NewOpportunity';
import Opportunity from './Opportunity';

const Path = () => {
  const { path, setPath } = useContext(AppContext);
  const [showAddOpportunity, setShowAddOpportunity] = useState(false);

  const handleOnDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;

    let originStep = parseInt(result.source.droppableId);
    let destinationStep = parseInt(result.destination.droppableId);

    let newPath = path;

    const [reorderedItem] = newPath[originStep].opportunities.splice(
      result.source.index,
      1
    );
    if (result.destination.droppableId !== 'delete') {
      console.log('not delete');
      newPath[destinationStep].opportunities.splice(
        result.destination.index,
        0,
        reorderedItem
      );
    }
    setPath(newPath);
    localStorage.setItem('job-watch-path', JSON.stringify(newPath));
    console.log('setting local');
  };

  const toggleAddNewOpportunity = () => {
    setShowAddOpportunity(!showAddOpportunity);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="my-12 flex flex-row p-2">
          {!showAddOpportunity ? (
            <button
              className="bg-blue-400 rounded-full w-12 h-12 p-2 absolute top-2 right-2"
              onClick={toggleAddNewOpportunity}
            >
              ➕
            </button>
          ) : null}
          {showAddOpportunity ? (
            <div>
              <NewOpportunity className="z-10" toggle={toggleAddNewOpportunity} />
              <div
                onClick={toggleAddNewOpportunity}
                className="absolute top-0 right-0 w-6 h-6 bg-red-600 text-white rounded-full text-center"
              >
                <FontAwesomeIcon className="mx-auto" icon={faCircleXmark} />
              </div>
            </div>
          ) : (
            ''
          )}
          {path.map((step, i) => {
            console.log(step);
            return (
              <Droppable key={step.name} droppableId={i.toString()}>
                {(provided) => {
                  return (
                    <div
                      className="m-4 p-2 rounded w-60 bg-green-300"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <span>{step.name}</span>
                      {step.opportunities.map((job, jobIndex) => {
                        // let jobKeyIndex = Object.keys(opportunities)
                        // console.log(job)
                        return (
                          <Draggable
                            draggableId={job.name}
                            key={job.name}
                            index={jobIndex}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Opportunity
                                    contactName={job.contactName}
                                    contactUrl={job.contactUrl}
                                    link={job.link}
                                    name={job.name}
                                    pathIndex={i}
                                    jobIndex={jobIndex}
                                    notes={job.notes}
                                  />
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                      {/* <Opportunity /> */}
                      {/* <Step name={step.name} opportunities={step.opportunities} /> */}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}

          <Droppable droppableId="delete">
            {(provided) => {
              return (
                <div
                  className="absolute bottom-0 right-2 m-4 p-4 bg-red-100 rounded"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {provided.placeholder}
                  <FontAwesomeIcon className="mx-auto" icon={faTrashCan} />
                </div>
              );
            }}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Path;
