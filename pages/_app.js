import { useEffect, useState } from 'react'
import AppContext from '../src/Context'
import '../styles/globals.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Head from 'next/head'
config.autoAddCss = false

const MyApp = ({ Component, pageProps }) => {

  const placeholderOpportunities = [
  ]

  // const initialPath = [
  //   {
  //     name: 'Interested',
  //     opportunities: [{
  //       name: 'Job 1',
  //       link: 'https://www.google.com',
  //       contactName: 'Joe Smith',
  //       contactUrl: 'contacturl'
  //     },
  //     {
  //       name: 'Job 2',
  //       link: 'url',
  //       contactName: 'Joe ',
  //       contactUrl: 'contacturl'
  //     },
  //     {
  //       name: 'Job 3',
  //       link: 'url',
  //       contactName: 'Smith',
  //       contactUrl: 'contacturl'
  //     },]
  //   },
  //   {
  //     name: 'Applied',
  //     opportunities: [      {
  //       name: 'Job 10',
  //       link: 'url',
  //       contactName: 'Tom Anderson',
  //       contactUrl: 'contacturl'
  //     },
  //     {
  //       name: 'Job 11',
  //       link: 'url',
  //       contactName: 'Out of Names',
  //       contactUrl: 'contacturl'
  //     }]
  //   },
  //   {
  //     name: 'HR Screen',
  //     opportunities: [{
  //       name: 'Job 4',
  //       link: 'url',
  //       contactName: 'Bob Carpenter',
  //       contactUrl: 'contacturl'
  //     },
  //     {
  //       name: 'Job 5',
  //       link: 'url',
  //       contactName: 'Tom Dick',
  //       contactUrl: 'contacturl'
  //     }]
  //   },
  //   {
  //     name: 'Interviewing',
  //     opportunities: [{
  //       name: 'Job 6',
  //       link: 'url',
  //       contactName: 'Harry Dick',
  //       contactUrl: 'contacturl'
  //     }]
  //   },
  //   {
  //     name: 'Decision',
  //     opportunities: [{
  //       name: 'Job 7',
  //       link: 'url',
  //       contactName: 'Richard',
  //       contactUrl: 'contacturl'
  //     },
  //     {
  //       name: 'Job 8',
  //       link: 'url',
  //       contactName: 'Thomas The Test Engine',
  //       contactUrl: 'contacturl'
  //     },
  //     {
  //       name: 'Job 9',
  //       link: 'url',
  //       contactName: 'Agent Smith',
  //       contactUrl: 'contacturl'
  //     }]
  //   }
  // ]


  const initialPath = [
    {
      name: 'Interested',
      opportunities: [{
              name: 'Example Job',
              link: 'https://www.linkedin.com',
              contactName: 'Example Contact Person',
              contactUrl: 'https://www.linkedin.com/',
              notes: [{
                date: '2022-10-25T14:02:19.072Z',
                note: 'This is a sample note'
              }]
            }]
    },
    {
      name: 'Applied',
      opportunities: []
    },
    {
      name: 'HR Screen',
      opportunities: []
    },
    {
      name: 'Interviewing',
      opportunities: []
    },
    {
      name: 'Decision',
      opportunities: []
    }
  ]


useEffect(() => {
  
  if (localStorage.getItem('job-watch-path')) {
    console.log(localStorage.getItem('job-watch-path'))
    setPath(JSON.parse(localStorage.getItem('job-watch-path')))
  }

}, [])

const [path, setPath] = useState(initialPath)
const [opportunities, setOpportunities] = useState(placeholderOpportunities)

  return (
    <AppContext.Provider
    value={{path, setPath}}>
      <Head>
        <title>Job Watch</title>
      </Head>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </AppContext.Provider>)
}

export default MyApp
