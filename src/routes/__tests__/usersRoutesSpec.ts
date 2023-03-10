import supertest from 'supertest'
import app from '../../app'
import { UserModel } from '../../models/user.model'
import db from '../../database'
import { IUser } from '../../interfaces/user.interface'

const request = supertest(app)
let authToken = ''

describe('User Routes Endpoint Testing', function () {
  const user: IUser = {
    email: 'dafi@admin.com',
    username: 'Dafi285',
    firstname: 'Adel',
    lastname: 'Dafi',
    password: 'my_secret_pass'
  }

  beforeAll(async () => {
    const createdUser = await UserModel.create(user)
    user.id = createdUser.id
  })

  afterAll(async () => {
    //    1. Open Connection with database
    const conn = await db.connect()
    //    2. Run the queries
    const q = `DELETE
                   FROM users
                   WHERE true`
    await conn.query(q)
    //    3. Close the connection
    conn.release()
  })

  describe('Authentication Endpoint', function () {
    it('should be able to authenticate with valid credentials and return the token', async function () {
      const response = await request
        .post('/api/users/authenticate')
        .set('Content-Type', 'application/json')
        .send({ email: user.email, password: user.password })
      expect(response.status).toBe(200)
      const { id, email, token } = response.body.data
      expect(id).toBe(user.id)
      expect(email).toBe(user.email)
      expect(token).toBeDefined()
      authToken = token
    })
    it('should be failed to authenticate with invalid credentials ', async function () {
      const response = await request
        .post('/api/users/authenticate')
        .set('Content-Type', 'application/json')
        .send({ email: user.email, password: 'my_fake_pass' })
      expect(response.status).toBe(401)
    })
    it('should be failed to authenticate and return 400 when request body does not contain email or password ', async function () {
      const response = await request
        .post('/api/users/authenticate')
        .set('Content-Type', 'application/json')
        .send({ email: user.email })
      expect(response.status).toBe(400)
    })
  })

  describe('User Routes CRUD Endpoints', function () {
    it('should create a new user & return it', async function () {
      const response = await request
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({
          email: 'testuser@example.com',
          username: 'test_user',
          firstname: 'Test',
          lastname: 'User',
          password: 'testPassword'
        } as IUser)

      expect(response.status).toBe(201)
      const { email, username } = response.body.data
      expect(email).toBe('testuser@example.com')
      expect(username).toBe('test_user')
    })
    it('should return an error 409 status code when email or username already exists', async function () {
      const response = await request
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({
          email: user.email,
          username: user.username,
          firstname: 'Test',
          lastname: 'User',
          password: 'testPassword'
        } as IUser)

      expect(response.status).toBe(409)
    })
    it('should return an error 400 status code when not user properties are set', async function () {
      const response = await request
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({
          email: user.email,
          username: user.username,
          password: 'testPassword'
        } as IUser)

      expect(response.status).toBe(400)
    })

    it('should return array of all Users', async function () {
      const response = await request
        .get('/api/users')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)

      expect(response.status).toBe(200)
      expect(response.body.data.length).toBe(2)
    })
    it('should return 401 unauthorized when no valid token is provided', async function () {
      const response = await request
        .get('/api/users')
        .set('Content-Type', 'application/json')

      expect(response.status).toBe(401)
    })

    it('should return user data if user already exists', async function () {
      const response = await request
        .get(`/api/users/${user.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)

      expect(response.status).toBe(200)
      expect(response.body.data.email).toBe(user.email)
    })
    it('should return 404 status code if id is valid but user does not exist', async function () {
      const response = await request
        .get(`/api/users/9cf6e4e5-8508-4a6a-97e2-cb318201db0a`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
      expect(response.status).toBe(404)
    })
    it('should return 400 status code if id is invalid', async function () {
      const response = await request
        .get(`/api/users/9cf6e4e5`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)

      expect(response.status).toBe(400)
    })

    it('should update the user and return new data', async function () {
      const response = await request
        .patch(`/api/users/${user.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'adeldafi@admin.com',
          username: 'ad019el'
        } as IUser)

      expect(response.status).toBe(200)
      const { email, username } = response.body.data
      expect(email).toBe('adeldafi@admin.com')
      expect(username).toBe('ad019el')
    })
    it('should return 401 unauthorized when no valid token is provided', async function () {
      const response = await request
        .patch(`/api/users/${user.id}`)
        .set('Content-Type', 'application/json')
        .send({
          username: 'Dafi285'
        } as IUser)
      expect(response.status).toBe(401)
    })

    it('should delete the user and return new data', async function () {
      const response = await request
        .delete(`/api/users/${user.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)

      expect(response.status).toBe(200)
      const { id } = response.body.data
      expect(id).toBe(user.id)
    })
  })
})
