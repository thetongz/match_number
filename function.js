var fs = require('fs')

module.exports = {
    writeError: function(res, msg) {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end('<html><body><h1>Error 404: ' + msg + '</h1></body></html>')
    },
    readJSON: function(filepath) {
        var data = fs.readFileSync(filepath, 'utf8')
        return data
    }
}