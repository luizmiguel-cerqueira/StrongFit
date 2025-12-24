const keys = require('./keys.json')
const { MongoClient, ReturnDocument } = require('mongodb');
const bcrypt  = require("bcrypt");
const session = require("express-session");
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(session({
  secret:"ninguem vai descobrir isso",
  resave:false,
  saveUninitialized: false,
  cookie:{
    httpOnly: true,
    maxAge: 1000 * 60 * 24
  }
}));

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials:true
}));

app.post('/api/login', async (req, res) => {
  
  const igual = await verificalLogin(req.body);

  if(!igual){
    return res.status(404).json({
      ok:false,
      message:"usuário ou senha incorretos"
    });
  }else{
    req.session.userId = igual.id
      return res.status(200).json({
      ok:true
    })
  }

})
async function verificalLogin(dados) {
  const URL = keys.mongo;
  const client = new MongoClient(URL)
  try{
    const database = client.db('StrongFit');
    const col = database.collection('Users');
    const query = { user : dados.username}
    
    const users = await col.findOne(query);
    if(!users) return null

    const ok = await bcrypt.compare(dados.password, users.pass);
    if(!ok) return null

    return users  
  }catch(err){
    console.log(err)
  }finally{
    await client.close()
  }
}
async function GetSeq() {
  const URL = keys.mongo;
  const client = new MongoClient(URL);
  
  try{
    const database= client.db("StrongFit");
    const col = database.collection("counters");
    
    const result = await col.findOneAndUpdate(
      { id:"_users" },
      { $inc: {seq : 1} },
      { ReturnDocument: "after", upsert: true}
    );

    return result.seq;

  }catch(err){
    console.error(err)
  }finally{
    await client.close()
  }
}
app.get('/api/userArea', auth, (req, res) =>{
  res.json({ok:true})
})
app.get('/api/prefer', auth, (req, res) =>{
  res.json({ok:true})
})
app.get('/api/training', auth, (req, res) =>{
  res.json({ok:true})
})
async function auth(req, res, next) {
   req 
  if(!req.session.userId){
    return res.status(401).json({ok:false, msg:'acesso negado'})
  }
  next();
}
app.get('/api/logout', async(req,res) =>{
  req.session.destroy()
  return res.status(200).json({
    ok:true
  });
})
app.post('/api/saveDB', async (req,res) =>{

  let jaexiste = await encontrarUsuario(req.body)//true = tem igual | false = ainda não existe
  
  if(jaexiste){
    return res.status(401).json({
      ok:false,
      message: "usuario ja existente"
    });
  }else{
    inserirUsuario(req.body)
    return res.status(200).json({
      ok:true
    })
  }
});


async function encontrarUsuario(dados) {
  const URL = keys.mongo;
  const client = new MongoClient(URL)
  try{
    const database = client.db('StrongFit');
    const col = database.collection('Users');
    const query = { user : dados.user}
    const users = await col.findOne(query);

    if(users){
   
      return true;
    }else{
  
      return false
    }
    
    
  }catch(err){
    console.log(err)
  }finally{
    await client.close()
  }
}
async function inserirUsuario(dados) {
  
  let hash = await bcrypt.hash(dados.pass,10)
  dados.pass = hash
  dados.id = await GetSeq()
  // const obj  = JSON.parse(dados)
  // obj._id = GetSeq()
  // const novojson = JSON.stringify(obj)
  
  const URL = keys.mongo;
  const client = new MongoClient(URL)

  try {
    const database = client.db('StrongFit')
    const col = database.collection('Users')

    const result =  await col.insertOne(dados)

  } catch (error) {
    console.error(err)
  }finally{
    await client.close()
  }
  return null;
}
app.post('/api/savePrefers', async (req, res) =>{
  a('entrou post')
  const response = await GuardarPreferencia(req)
  if(!response) return res.status(500).json({
    ok: false  
  })
  return res.status(200).json({
    ok:true
  })
})
async function GuardarPreferencia(req){
  a('entrou func')
  const URL = keys.mongo;
  const client = new MongoClient(URL)
  
  try{
    const database = client.db('StrongFit');
    const col = database.collection('prefers');

    const result = await col.findOneAndUpdate
  (
    { id:req.session.userId },
    { 
      $set: 
      {
        id: req.session.userId,
        objetivo : req.body.objetivo,
        experiencia : req.body.experiencia,
        local : req.body.local,
        limitacao : req.body.limitacao,
        descricao : req.body.descricao
      }
    },
    { ReturnDocument: "after", upsert: true }
  );
  a(result)
    return result

  }catch(err){
    a(err)
  }finally{
    await client.close()
  }
}

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

async function a(log) {
  console.log(log)
}