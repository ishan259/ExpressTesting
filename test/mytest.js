    let expect = require('chai').expect;
    let should = require('chai').should();
    let supertest =require('supertest');
    let app = require('../app');
    let mytes = supertest(app);
    let sinon = require('sinon');
    let schema = require('../model/schema')
    let modelstub = sinon.stub(schema,'find'); 
    let modelstub1 = sinon.stub(schema,'insert');
    let modelstub2 = sinon.stub(schema,'update'); 
    let modelstub3 = sinon.stub(schema, 'remove')
    
    describe('test for server connections',() => {
       it('response from get',(done)=> {
          mytes
          .get('/')
          .expect(200)
          .end((err,res)=>{
            if(err){
                console.log(err);
            } else{
                res.text.should.be.a(String);
            }

            done();
        });
   });
});

    describe('getting movie', () => {
       modelstub.yields(null,{name:'saw',genre:'horror',year:2006})
       it('checking get',(done)=> {
           mytes  
           .get('/fetch')
           .expect(200)
           .expect('Content-Type', /json/)
           .end((err, res)=> { 
            if (err) return done(err);                       
            res.body.should.have.property('name','saw');
            res.body.should.have.property('genre','horror');
            res.body.should.have.property('year',2006);
            done();
        });
       });
   });

    describe('post movie', ()=> {

        it('checking post',(done)=> {
           mytes  
           .post('/insert')
           .send({name:'saw',genre:'horror',year:2006})
           .expect(200)
           .expect('Content-Type', /json/)
           .end((err, res) => { 
            if (err) return done(err);                       
            res.body.should.have.property('name','saw');
            res.body.should.have.property('genre','horror');
            res.body.should.have.property('year',2006);
            done();
        });
       });
    });


    describe('update data', () =>{
/*
    before(()=>{
        modelstub2.withArgs({name:"saw"},
            {$set:{genre:"horror",year:2006}})
        .yields(null,{"ok":1,"nModified":0,"n":0});
    });
*/
    it('checking put',(done)=>{
        mytes
        .put('/update/saw')
        
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .send({genre:'horror',year:2006})
        .end((err,res)=>{
            if(err)
            {
                console.log(err);
            }
            else{
                expect(res.body.ok).to.equal(1)
                expect(res.body.nModified).to.equal(0)
                expect(res.body.n).to.equal(0)
                done();
            }
        });
    });
});



describe('Delete Testing',(done) =>{
        beforeEach(() => {
        modelstub3.withArgs({ name : "saw" }).yields(null, {ok:1, nRemoved: 1, n:1}); 
        });

    it('Delete data',(done) => {
        mytes
            .delete('/delete/saw')
            .send({ name: "saw"})
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.ok).to.equal(1);    
                expect(res.body.nRemoved).to.equal(1);

                expect(res.body.n).to.equal(1);
                
                done();
            
                
            });
           });
    });

