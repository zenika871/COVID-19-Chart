import Head from 'next/head'
import Dynamic from 'next/dynamic';

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import fetch from 'node-fetch'

const renderLineChart = ({data}) => {
  return <LineChart
    id="lineChart"
    width={1000}
    height={500}
    data={data}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}

  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" width={500} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="confirmed" stroke="#8884d8" activeDot={{ r: 8 }} />
    <Line type="monotone" dataKey="deaths" stroke="#820000" />
    <Line type="monotone" dataKey="recovered" stroke="#008200" />

  </LineChart>
};

const DynamicChart = Dynamic(() => renderLineChart, {
  loading: () => <p>Loading...</p>,
  ssr: false
})

export default function Home({ data, countries }) {

  const [country, setCountry] = useState('US')

  return (
    <div className="container">
      <Head>
        <title>COVID-19 Chart</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="#">COVID-19-Chart</a>
        </h1>

        <p className="description">
          Written with <code>Next.js</code>
        </p>
        <div className="form-group">
          <select className="form-control" id="countrySelect" value={country} onChange={(e) => { setCountry(e.target.value) }}>
            {countries.map((c) => (<option key={c}>{c}</option>))}
          </select>
        </div>
        <DynamicChart data = {data[country] || []}/>

      </main>

      <footer>
        <a
          href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps(context) {
  let data = {}, countries = []
  try {
    const resp = await fetch('https://pomber.github.io/covid19/timeseries.json')
    data = await resp.json()
    if (typeof data === 'object') {
      countries = Object.keys(data).sort()
    }
  } catch (e) {
    console.error('Failed to fetch data:', e)
  }

  return {
    props: {
      data,
      countries
    }, // will be passed to the page component as props
  }
}