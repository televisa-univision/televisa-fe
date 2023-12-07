# Next AWS Lambda Wrapper

Compat layer between next.js serverless page and AWS Lambda.
Based on [next-aws-lambda](https://github.com/serverless-nextjs/serverless-next.js/tree/master/packages/compat-layers/apigw-lambda-compat)

## Sampe Usage

For more details check `.serverless_plugins/serverless-nextjs-plugin-uvn/lib/getFactoryHandlerCode.js`

```js
const compat = require("wrapper");
const page = require(".next/serverless/pages/somePage.js");

// using callback

module.exports.render = (event, context, callback) => {
  compat(page)(event, context, callback);
};

// using async promise

module.exports.render = async (event, context, callback) => {
  const responsePromise = compat(page)(event, context); // don't pass the callback parameter
  return responsePromise;
};
```
