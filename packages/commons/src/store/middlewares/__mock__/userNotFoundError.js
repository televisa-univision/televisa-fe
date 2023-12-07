export default [
  {
    message: 'User Not Found',
    locations: [
      {
        line: 2,
        column: 3,
      },
    ],
    path: [
      'authenticatedUser',
    ],
    extensions: {
      code: 'USER_NOT_FOUND',
      exception: {
        stacktrace: [
          'UserNotFoundError: User Not Found',
          '    at authenticatedUserResolver (/app/dist/resolvers/user/index.js:102:15)',
          '    at processTicksAndRejections (internal/process/task_queues.js:97:5)',
        ],
      },
    },
  },
];
