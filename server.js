const http = process.env.HTTPMODULE = require('http')
const math = process.env.MATHMODULE = require('./math.js')
const PORT = process.env.PORT = 3003

const server = http.createServer(function (req, res) {
    const {url, method} = req
    if (method == 'POST' && url == '/api/calc') {
        const chunks = []
        req.on('data', chunk =>  chunks.push(chunk))
        req.on('end', () => {
            const expressionToCalc = Buffer.concat(chunks).toString()
            const result = math(expressionToCalc)
            res.end(result.toString())
        })
    } else if (url.startsWith('/api/calc?expr=')) {
        const expressionToCalc = url.slice(url.indexOf('=')+1)
        const result = math(expressionToCalc)
        res.end(result.toString())
    } else {
        res.statusCode = 404
        res.end('Не верный запрос')
    }



})
server.listen(PORT, () => {console.log(`Server started on ${PORT}`)})