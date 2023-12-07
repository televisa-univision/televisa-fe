const reqResMapper = require("./lib/compatLayer");
const errorHtml = require("./lib/errorHtml");

const errorHandler = (e, res) => {
  if (e && e.message && res.setHeader) {
    res.setHeader('X-Error-Message', e.message);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
  }
  res.statusCode = 500;
  res.end(errorHtml);
};

const handlerFactory = page => (event, _context, callback) => {
  const { req, res, responsePromise } = reqResMapper(event, callback);
  if (page.render instanceof Function) {
    // Is a React component
    page.render(req, res).catch((e) => errorHandler(e,res));
  } else {
    // Is an API
    page.default(req, res).catch((e) => errorHandler(e,res));
  }

  if (responsePromise) {
    return responsePromise;
  }
};

module.exports = handlerFactory;
