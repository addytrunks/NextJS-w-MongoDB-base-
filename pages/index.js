import Head from 'next/head'
import { useRouter } from 'next/router'
import clientPromise from '../lib/mongodb'

export default function Home({movies}) {

  const router = useRouter()

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <main>
      <h1>Next JS with MongoDB</h1>

      <h2>Movies</h2>
      <hr/>

      {movies.map(movie =>(
          <div key={movie._id}>
            <h3 style={{cursor:'pointer'}} onClick={() => router.push(`/${movie._id}`)}>{movie.title}({movie.year})</h3>
            {movie.plot}
          </div>
      ))}

    </main>
    </div>
  )
}

export async function getServerSideProps(context) {
    
    // Connecting to the MongoDB
    const client = await clientPromise

    // Connecting to the database
    const db = await client.db('sample_mflix')

    // DataBase -> Collections -> Documents
    const data = await db.collection('movies').find({'imdb.rating':{$gt:9}}).limit(30).toArray()
    const movies = JSON.parse(JSON.stringify(data))
  
    return {
      props: {movies},
    }
}
