const request = require('supertest');
const app = require('../src');
const urlE2E = require('./mocking-data/url-e2e.json')
const CreeateUserJSON = require('./mocking-data/create-user.json')

describe('User Routes e2e', () => {
  let mockRequest = (payload = {
    method:'GET',
    url: '',
    data: {}
  }) => {}

  beforeEach (async () => {
    mockRequest = (payload = {}) => (request(app)[payload.method.toString().toLocaleLowerCase()](payload.url)).send(payload.data || {})
  })

  it('On Create User', async () => {
    let results = []

    for (const a in CreeateUserJSON) {
      const response = await mockRequest({
        method: 'POST',
        url: urlE2E.user.main,
        data: CreeateUserJSON[a]
      })


      if(!response.status.toString().match(/^2+[0-9]{2}$/g)) {
        results.push(response.body)
        continue
      }
      results.push(response.body.user)
    }
    /** check if the first data is successfully added */
    expect(results[0]?.id).toBe(1)
    /** check if the second data is successfully added */
    expect(results[1]?.id).toBe(2)
    /** check if the third data is failed to added, because the value of "name" not contain a string. */
    expect(results[2]?.error).toBe('"name" must be a string')
  })


  it('On Get List of Users', async () => {
    const response = await mockRequest({
      method: 'GET',
      url: urlE2E.user.main,
      data: {}
    })
    /** check length of inserted data is greater than equal 2 */
    expect(response.body?.length >= 2).toBe(true)
  })

  it('On Update User Data', async () => {
    const response = await mockRequest({
      method: 'PUT',
      url: urlE2E.user.params.replace(':id', 1),
      data: {
        ...CreeateUserJSON[0],
        email: 'aidil_febrian@gmail.com'
      }
    })
    
    /** checking status response */
    expect(response.status).toBe(200)

    /** check if the updated data of user is match */
    expect(response.body?.id).toBe(1)
  })
  
  it('Check on After Updating the Data', async () => {
    const response = await mockRequest({
      method: 'GET',
      url: urlE2E.user.params.replace(':id', 1),
      data: {}
    })
    /** check length of inserted data is greater than equal 2 */
    expect(response.body?.email).toBe('aidil_febrian@gmail.com')
  })

  it('On Deleting the Data', async () => {
    const response = await mockRequest({
      method: 'DELETE',
      url: urlE2E.user.params.replace(':id', 1),
      data: {}
    })
    /** check if user success to deleted. */
    expect(response.body?.message).toBe('User deleted successfully')
  })

  it('Re-Check on After Deleting the Data', async () => {
    const response = await mockRequest({
      method: 'GET',
      url: urlE2E.user.params.replace(':id', 1),
      data: {}
    })
    /** check user, must be not existing anymore*/
    expect(response.body?.message).toBe('User not found')
  })
});
