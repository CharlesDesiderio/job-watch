import { useContext, useState } from 'react'
import AppContext from '../Context'

const NewOpportunity = ({ setShowAddOpportunity, toggle }) => {

  const { path, setPath } = useContext(AppContext)

  const [formData, setFormData] = useState({
    jobName: '',
    jobUrl: '',
    contactName: '',
    contactUrl: ''
  })

  const updateForm = (event) => {
    const newFormData = formData
    newFormData[event.target.id] = event.target.value
    setFormData({...newFormData})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submit')
    const newJob = {
      name: formData.jobName,
      link: formData.jobUrl,
      contactName: formData.contactName,
      contactUrl: formData.contactUrl
    }
    const newPath = path
    console.log(path)
    path[0].opportunities.push(newJob)
    setPath([...newPath])
    localStorage.setItem('job-watch-path', JSON.stringify(newPath))
    toggle()
  }

  return (
    <div className="absolute w-80 top-2 right-2 bg-blue-100 rounded p-4">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="text-gray-500 text-xs" htmlFor="jobName">Job Name</label>
        <input className="p-1 border-gray-500 border-2 m-1 mt-0 rounded" id="jobName" value={formData.jobName} onChange={updateForm} type="text" />
        <label className="text-gray-500 text-xs" htmlFor="jobUrl">Job Link</label>
        <input className="p-1 border-gray-500 border-2 m-1 mt-0 rounded" id="jobUrl" value={formData.jobUrl} onChange={updateForm} type="text" />
        <label className="text-gray-500 text-xs" htmlFor="contactName">Contact</label>
        <input className="p-1 border-gray-500 border-2 m-1 mt-0 rounded" id="contactName" value={formData.contactName} onChange={updateForm} type="text" />
        <label className="text-gray-500 text-xs" htmlFor="contactUrl">Contact Link</label>
        <input className="p-1 border-gray-500 border-2 m-1 mt-0 rounded" id="contactUrl" value={formData.contactUrl} onChange={updateForm} type="text" />
        <input className="m-2 bg-blue-500 rounded p-2 text-white" type="submit" value="Add Job" />
      </form>
    </div>
  )
}

export default NewOpportunity