// @ts-ignore
const fetch = require('node-fetch');
const express=require('express');
const {gql,ApolloServer} = require('apollo-server-express')
const app=express();
const cors=require('cors');

app.use(cors())

//This is the schema for the api
const typeDefs =gql`
type Person{
   name: String
   height: String
   mass: String
   gender: String
   homeworld: String
}

type Query{
    getPerson(page: Int):[Person]
    fetchPerson(search: String):Person
}
`
//This is the resolver where i fetch the api and get the people which includes pagination and searching via name
const resolvers={
    Query:{   
        getPerson: async (route:any,args:any)=>{
            const res=await fetch(`https://swapi.dev/api/people/?page=${args.page}`);
            const data= await res.json();
            console.log(args)     
            return data.results;      
        },
        fetchPerson:async (route:any,args:any)=>{
            const res=await fetch(`https://swapi.dev/api/people/?search=${args.search}`);
            const data= await res.json();
            console.log(data)
            return data.results[0];   
        }
   
    }
    
}

const server= new ApolloServer({typeDefs,resolvers});

server.applyMiddleware({app})

app.listen({port:4000},()=>{
    console.log(`SERVER RUNNING ON PORT 4000`)
})

