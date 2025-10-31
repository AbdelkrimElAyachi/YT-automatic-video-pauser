// tests/setup.js
global.chrome = {
  runtime: {
    onMessage: {
      addListener: jest.fn().mockImplementation((cb)=>{
        global._onMessageListener = cb;
      }),
    },
  },
};
