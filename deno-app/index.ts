// Import express and instantiate it
import express,{ Request, Response } from "npm:express@4";
import "https://deno.land/std@0.204.0/dotenv/load.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const app = express();
app.use(express.json())
let client;
try{
client = new Client(Deno.env.get("DB_URL"))
await client.connect();
}catch(e){
  console.log(e) 
}


app.get("/api/getDbResult", async(req:Request, res:Response) => {
  try{
  const result = await client.queryObject("select * from trades");
console.log(result.rows)
res.status(200).send({
  data: result.rows.map(row => ({
    type: row.type,
    user_id: row.user_id,
    symbol: row.symbol,
    shares: row.shares,
    price: row.price,
    timestamp: Number(row.timestamp), // Convert BigInt to number
    id: row.id,
    createdAt: row.createdAt.toISOString(), // Convert date to ISO string
    updatedAt: row.updatedAt.toISOString() // Convert date to ISO string
  }))






});





  }catch(e){
  console.log(e)
  }

})

// Register a route
app.get("/api/:name", async(req:Request, res:Response ) => {
  try{
    const text = await Deno.readTextFile("hello.txt");

  res.status(200).send(`Hello! ${req.params.name} ${text}`);
  }catch(e){
  console.log(e)  
  }
});

app.post("/api/writeText", async(req:Request, res:Response ) => {
  try{
    console.log(req.body)
    await Deno.writeTextFile("hello.txt", req.body.text);

  res.status(200).send(`Success`);
  }catch(e){
  console.log(e)  
  }
});




// Run the server!
const port = Number(Deno.env.get("PORT")) || 3000;

app.listen(port,()=>
console.log(`%cServer runing on ${port}`, "color: green")
);