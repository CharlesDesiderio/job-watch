import { useContext, useState } from 'react';
import AppContext from '../Context';
import Note from './Note';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faSquarePlus,
  faArrowUpRightFromSquare,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';

const Opportunity = ({
  contactName,
  contactUrl,
  link,
  name,
  pathIndex,
  jobIndex,
  notes,
}) => {
  const { path, setPath } = useContext(AppContext);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [addDetail, setAddDetail] = useState(false);
  const [inputData, setInputData] = useState({
    date: new Date(Date.now()),
    note: '',
  });

  const toggleShowAllNotes = () => {
    console.log('show');
    setShowAllNotes(!showAllNotes);
  };

  const toggleDetail = () => {
    setAddDetail(!addDetail);
    setInputData({
      date: new Date(Date.now()),
      note: '',
    });
  };

  const handleChange = (event) => {
    let newInputData = inputData;
    newInputData[event.target.id] = event.target.value;
    setInputData({ ...newInputData });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPathData = path;
    if (!newPathData[pathIndex].opportunities[jobIndex].notes) {
      newPathData[pathIndex].opportunities[jobIndex].notes = [];
    }
    let newNote = {
      date: inputData.date,
      note: inputData.note,
    };
    console.log(newPathData[pathIndex].opportunities[jobIndex]);
    newPathData[pathIndex].opportunities[jobIndex].notes.unshift(newNote);
    setPath([...newPathData]);
    localStorage.setItem('job-watch-path', JSON.stringify(newPathData));
    setAddDetail(!addDetail);
  };

  return (
    <div className="relative bg-white text-sm border-2 border-gray-400 m-1 p-1">
      <div>
      <span className="block">
        {name}{' '}
        <a href={link}>
          <FontAwesomeIcon
            className="mx-auto text-blue-500"
            icon={faArrowUpRightFromSquare}
          />
        </a>
      </span>
      <span className="block">
        {contactName}{' '}
        <a href={contactUrl}>
          <FontAwesomeIcon
            className="mx-auto text-blue-500"
            icon={faArrowUpRightFromSquare}
          />
        </a>
      </span>
      <span className="text-xs text-gray-400"><hr />{notes ? notes.length : 'No'} { ` Note${!notes || notes && notes.length !== 1 ? 's' : '' }` }</span>
      </div>
      {notes ? (
        <div>
          {showAllNotes ? (
            notes.map((note) => {
              console.log('map', note);
              return (
                <Note
                  key={note.date}
                  date={Date.parse(note.date)}
                  note={note.note}
                />
              );
            })
          ) : (
            <Note date={Date.parse(notes[0].date)} note={notes[0].note} />
          )}
          <div className="mx-auto text-center" onClick={toggleShowAllNotes}>
            {showAllNotes ? (
              <FontAwesomeIcon className="mx-auto" icon={faChevronUp} />
            ) : (
              notes.length > 1 ? <FontAwesomeIcon className="mx-auto" icon={faChevronDown} /> : null
            )}
          </div>
        </div>
      ) : null}
      {addDetail ? (
        <div className="relative bg-blue-100 text-sm">
          <div className="absolute top-0 right-1" onClick={toggleDetail}>
          <FontAwesomeIcon className="mx-auto" icon={faCircleXmark} />
          </div>
          <form
            className="flex flex-col p-1 m-1 bg-blue-100 text-xs"
            onSubmit={handleSubmit}
          >
            <label htmlFor="date">Date: </label>
            <input
              className="m-1 mt-0 border-2 rounded border-blue-400"
              id="date"
              onChange={handleChange}
              value={inputData.date}
            />
            <label htmlFor="note">Note: </label>
            <input
              className="m-1 mt-0 border-2 rounded border-blue-400"
              id="note"
              onChange={handleChange}
              value={inputData.note}
            />
            <input type="submit" className="m-2 p-2 bg-blue-500 text-white rounded" value="Add Note" />
          </form>
        </div>
      ) : (
        <div onClick={toggleDetail} className="absolute bottom-0 right-0">
          <FontAwesomeIcon
            className="mx-auto text-gray-400 mx-1"
            icon={faSquarePlus}
          />
        </div>
      )}
    </div>
  );
};

export default Opportunity;
