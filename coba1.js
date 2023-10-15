const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 1000;

const server = http.createServer((req, res) => {
    const url = req.url;

    switch (url) {
        case "/":
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello world');
            break;

        case "/home":
            fs.readFile('./company profile.html', function (err, html) {
                if (err) {
                    throw err;
                }

                res.writeHeader(200, { "Content-Type": "text/html" });
                res.write(html);
                res.end();
            });
            break;

        case "/buat-file":
            const fileContent = "Hello World";
            fs.writeFile('newfile.txt', fileContent, (err) => {
                if (err) throw err;
                console.log('File created successfully!');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('File created successfully!');
            });
            break;

        case "/get-data":
            const data = [
                { name: 'John Doe', age: 30 },
                { name: 'Jane Smith', age: 25 },
                { name: 'Bob Johnson', age: 40 }
            ];
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            break;

        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('error tidak dapat diakses');
    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
