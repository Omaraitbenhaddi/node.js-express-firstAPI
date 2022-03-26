const path=require("path")
const express = require("express");
const res = require("express/lib/response");
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
const Student=[
    {name:"omar",dept:"IT",id:"0"},
    {name:"omar",dept:"IT",id:"1"},
    {name:"omar",dept:"IT",id:"2"},
    {name:"omar",dept:"IT",id:"3"},
    {name:"omar",dept:"IT",id:"4"},
    {name:"omar",dept:"IT",id:"5"},
];


const port=process.env.PORT||3000;

app.get("/main",(req,res)=>{
    res.sendFile(path.join(__dirname,"./main.html"))
});


// req querry http://server/path/program?field1=value1&field2=value2&field3=value3.
app.get("/welcome.html",(req,res)=>{
    console.log(req.query.lnm)
    console.log(req.query.fnm)
    res.sendFile(path.join(__dirname,"./welcome.html"))
});

// req body
app.post("/welcome.html",(req,res)=>{
    console.log(req.body)
    res.send(`OK thanks a 5ay ${req.body.fnm} ${req.body.lnm}`)
})

app.get("/", (req,res) => {
    console.log("request received...");
    res.send("jazab awld ba9");
    });


//request all student
app.get("/student",(req,res)=>{
    res.set("Access-Control-Allow-Origin","*")
    res.json(Student);
})
//request student by id

//passing data from client to server via url
app.get("/student/:id",(req,res)=>{
    let id=req.params.id;
    let std=Student.find((val,idx,arr)=>{return val.id==id})
    if(std)
        res.json(std);
        else
        res.send("not found")
})

//new student
app.post("/student",(req,res)=>{
    req.body.id=Student.length+1;
    Student.push(req.body);
    res.json(req.body)
})

//delete student 
app.delete("/student/:id",(req,res)=>{
    var idx=Student.findIndex((val)=>{
            return val.id==req.params.id
    });
    if(idx!=-1){
        Student.splice(idx,1);
        res.send("student deleted")

    }
    else{
        res.send("student n'existe pas")
    }


})

//update student

app.put("/student/:id",(req,res)=>{
    let idx=Student.findIndex((val)=>{
        return val.id==req.params.id
    });
    if(idx!=-1){
        for (i in req.body){
            Student[idx][id]=req.body[i];
        }
        res.json(Student)

    }
    else{
        res.send("index not found")
    }

})




app.listen(port,()=>{
    console.log( `listen to ${port}`)
});


