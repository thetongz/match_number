var http = require('http')
var fs = require('fs')
var path = require('path')
var fc = require('./function.js')

var validFileExtension = ['.html', '.css', '.jpg', '.png', '.json'];
var contentTypes = ['text/html', 'text/css', 'image/jpeg', 'image/png', 'application/json'];


http.createServer(function(req, res) {
    if (req.method == 'GET') {
        var fileurl
        req.url == '/' ? fileurl = "/index.html" : fileurl = req.url
        var filePath
        if (path.extname(fileurl).toLowerCase() != ".json") {
            filePath = path.resolve('./views' + fileurl)
        } else {
            filePath = path.resolve('./data' + fileurl)
        }
        var fileExt = path.extname(fileurl).toLowerCase()
        if (validFileExtension.indexOf(fileExt) >= 0) {
            fs.exists(filePath, function(exists) {
                if (!exists) {
                    fc.writeError(res, fileurl + 'not found')
                    return
                }
                res.writeHead(200, {
                    'Content-Type': contentTypes[validFileExtension.indexOf(fileExt)]
                })
                if (validFileExtension.indexOf(fileExt) < 4) {
                    fs.createReadStream(filePath).pipe(res)
                } else {
                    res.end(JSON.stringify(fc.readJSON(filePath)))
                }
            })
        }
    }
}).listen(8000)

console.log("Running at port 8000")