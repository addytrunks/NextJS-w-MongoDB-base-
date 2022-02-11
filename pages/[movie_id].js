import React from 'react'
import clientPromise from '../lib/mongodb'
import { ObjectId } from 'mongodb'
import Image from 'next/image'


export default function MovieDetail({movie}){
    console.log(movie)

  return (
    <div>
        <h1>{movie.title}({movie.year})</h1>
        <Image src={movie.poster} width={400} height={200}/>
    </div>
  )
}

export async function getServerSideProps(context) {

    const client = await clientPromise
    const db = await client.db('sample_mflix')

    const {movie_id} = context.params

    // Converting the URL parameter to a MongoDB ObjectId
    const data = await db.collection('movies').findOne({'_id':new ObjectId(movie_id)})

    // Serializing the data to JSON
    const movie = JSON.parse(JSON.stringify(data))

    return {
      props: {movie}
    }
}
