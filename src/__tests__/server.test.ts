/* describe("Nuestro primer test", ()=>{
    it('Debe resivar que 1+1 sean 2',()=>{
        expect(1+1).toBe(2)
    })
    it('Debe resivar que 1+1 no sean 3',()=>{
        expect(1+1).not.toBe(3)
    })
}) */
import request from 'supertest'
import server from '../server'
describe('GET /api',()=>{
    it('should send back a json response',async ()=>{
        const res =  await request(server).get('/api')
        
        expect(res.status).toBe(200)
        expect(res.body.msg).toBe('Desde API')
        
        expect(res.header['content-type']).toMatch(/json/)
        
        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})