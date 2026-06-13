import http from 'http';

async function doRequest(method, path, body=null){
  return new Promise((resolve, reject)=>{
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Origin': 'http://localhost:5173',
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res)=>{
      let data='';
      res.on('data', chunk=>data+=chunk);
      res.on('end', ()=>resolve({status: res.statusCode, headers: res.headers, body: data}));
    });
    req.on('error', reject);
    if(body) req.write(JSON.stringify(body));
    req.end();
  })
}

(async ()=>{
  console.log('Sending OPTIONS preflight...');
  const opt = await doRequest('OPTIONS','/api/auth/register');
  console.log(opt);

  console.log('\nSending POST register...');
  const post = await doRequest('POST','/api/auth/register', {username:'CorsTest', email:'cors-test@example.com', number:'9876543210', password:'Test1234', role:'candidate'});
  console.log(post);
})();
