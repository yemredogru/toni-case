let chai=require('chai');
let chaiHttp=require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var url = 'http://localhost:3001'
describe('Api Test',()=>{
    describe('Register Test',()=>{
        it('Must be 201',(done)=>{
            chai.request(url)
            .post('/user/register')
            .send({firstName:'deneme',lastName:'test',phone_number:'123',email:'test@test.com',password:'12345678'})
            .end((err,res)=>{
                expect(res).to.have.status(201);
              done();
            })
        })
    })
    describe('Register Test - Failed',()=>{
        it('Must be 404',(done)=>{
            chai.request(url)
            .post('/user/register')
            .send({firstName:'deneme',lastName:'test',phone_number:'123',email:'test@test.com',password:'12345678'})
            .end((err,res)=>{
                expect(res).to.have.status(404);
              done();
            })
        })
    })
    describe('Login Test ',()=>{
        it('Must be 200',(done)=>{
            chai.request(url)
            .post('/user/login')
            .send({email:'test@test.com',password:'12345678'})
            .end((err,res)=>{
                expect(res).to.have.status(200);
              done();
            })
        })
    })
    describe('User Information ',()=>{
        it('Must be 200',(done)=>{
            chai.request(url)
            .get('/user/user/648f675705eb0517aeaf7484')
            .end((err,res)=>{
                expect(res).to.have.status(200);
              done();
            })
        })
    })
    describe('User Information Fail',()=>{
        it('Must be 404',(done)=>{
            chai.request(url)
            .get('/user/user/648f675705eb0517aeaf7482')
            .end((err,res)=>{
                expect(res).to.have.status(404);
              done();
            })
        })
    })
    describe('Post Test',()=>{
        describe('All Posts',()=>{
            it('Must be 200',(done)=>{
                chai.request(url)
                .get('/post/posts')
                .end((err,res)=>{
                    expect(res).to.have.status(200);
                  done();
                })
            })
        })
        describe('Unauthorized - New Post',()=>{
            it('Must be 403',(done)=>{
                chai.request(url)
                .post('/post/newpost')
                .send({description:'test'})
                .end((err,res)=>{
                    expect(res).to.have.status(403);
                  done();
                })
            })
        })
    })
})