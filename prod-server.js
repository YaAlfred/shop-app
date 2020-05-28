const https = require('http'),
      fs = require('fs'),
      path = require('path'),
      port = process.env.PORT || 3000,
      publicFolder = __dirname + "/public";
      INDEX = path.resolve(publicFolder + "/index.html");

const server = https.createServer({}, (req, res) => {

    //console.log('request');
    const curr_path = publicFolder + req.url,
        lstat = fs.lstatSync(curr_path);

    if(lstat.isDirectory()) {
        //console.log('request a dir');
        fs.readFile(INDEX, (err, data) => {
            if (err) throw err;
            res.writeHead(200);
            res.end(data);
        });
    } else if (lstat.isFile()) {
        //console.log('request a file');
        //console.log(curr_path);
        fs.readFile(curr_path, function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    }    
});

server.on('clientError', (err, socket) => {
    console.log('error');
    console.error(err);
});

server.listen(port, () => console.log(`Listening https on ${port}`));