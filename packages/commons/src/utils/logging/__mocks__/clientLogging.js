const { default: clientLogging } = jest.genMockFromModule('../clientLogging');

clientLogging.mockImplementation(jest.fn((error, info) => {
  return Promise.resolve({ error, info });
}));

export default clientLogging;
