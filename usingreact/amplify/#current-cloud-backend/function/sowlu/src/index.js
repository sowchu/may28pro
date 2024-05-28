const AWS = require('aws-sdk');
     const lambda = new AWS.Lambda();

     exports.handler = async (event) => {
         const functionName = event.functionName;
         const params = {
             FunctionName: functionName,
             Handler: 'index.handler',
             Role: '<Your-Lambda-Execution-Role>',
             Runtime: 'nodejs14.x',
             Code: {
                 ZipFile: Buffer.from('exports.handler = function(event, context) { context.succeed("Hello, World!"); }')
             },
             Description: 'Lambda function created via Amplify',
             Timeout: 30,
             MemorySize: 128
         };

         try {
             await lambda.createFunction(params).promise();
             return {
                 statusCode: 200,
                 body: JSON.stringify({ message: 'Lambda function created successfully' })
             };
         } catch (error) {
             return {
                 statusCode: 500,
                 body: JSON.stringify({ message: 'Failed to create Lambda function', error: error.message })
             };
         }
     };
