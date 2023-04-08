const request = require('supertest');
const { app, server } = require('./index');
const http = require('http');

afterAll(() => {
  server.close();
});

describe('POST /convert-code', () => {
  it('returns 200 and valid response when given valid input', async () => {
    const from = 'python';
    const to = 'javascript';
    const code = 'print("Hello, world!")';
    const response = await request(http.createServer(app))
      .post('/convert-code')
      .send({ from, to, code });
    expect(response.status).toEqual(200);
    expect(response.body.data.choices.length).toBeGreaterThan(0);
  });

  it('returns 200 and valid response when given valid input', async () => {
    const from = 'javascript';
    const to = 'c++';
    const code = `const num1 = 5;
    const num2 = 3;

    // add two numbers
    const sum = num1 + num2;

    // display the sum
    console.log('The sum of ' + num1 + ' and ' + num2 + ' is: ' + sum);`;;
    const response = await request(http.createServer(app))
      .post('/convert-code')
      .send({ from, to, code });
    expect(response.status).toEqual(200);
    expect(response.body.data.choices.length).toBeGreaterThan(0);
    console.log(response.body.data.choices.length);
  });
});
