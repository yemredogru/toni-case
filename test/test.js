let server = require('../index');
let chai=require('chai');
let chaiHttp=require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
describe('Api Test',()=>{
    describe('Auth Test',()=>{
        it('Its failed',(done)=>{
            chai.request('http://localhost:3001')
            .get('-')
            .end((err,res)=>{
                expect(res).to.have.status(201);
                expect(res.body.message).to.equal('-');
              done();
            })
        })
    })
    describe('Post Test',()=>{
        
    })
})