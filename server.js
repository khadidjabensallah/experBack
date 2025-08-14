const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const article =require("./models/article");
app.get('/', (req, res) => {
    res.send('welcome to the subscription tracker API !');
});
app.listen(3000, ()=>{
    console.log('Subscription tracker API is running on http://localhost:3000');
});


mongoose.connect('mongodb://127.0.0.1:27017/learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.post('/postest', (req, res)=>{
    let numbers = " ";
    for(let i=0; i<=100;i++){
      numbers=numbers +i +"-";  
    };
    res.render("numbers.ejs",{
        name: req.body.name,
        numbers:numbers
    });
//res.send(`your test is successefully work !${numbers}`);
});
app.get('/otherTest', (req, res) => {
    res.send('your testtt is wooork');
});
app.get('/findSum/:num1/:num2', (req, res) => {
   let number1=parseInt(req.params.num1);
   let number2=parseInt(req.params.num2);
    let sum =(number1, number2)=> number1 + number2;

    res.send(`the sum is : ${sum(number1, number2)}`);
});
app.post('/bodytest', (req, res)=>{
   // res.send(`hello ${req.body.firstname} age is ${req.query.age}`);
   res.json({
    name : req.body.firstname + req.body.lastname,
    age : req.query.age

   })
});
app.get('/htmltest', (req, res)=>{
res.sendFile(__dirname +"/views/numbers.html");
})
app.post('/createArticle', async (req, res) => {
    try {
        const newArticle = new article();
        newArticle.title = req.body.arTitle;
        newArticle.body = req.body.arBody;
        newArticle.numOfLikes = 0;

        await newArticle.save(); // now await works because the function is async

        res.json(newArticle);
    } catch (err) {
        console.error("Error saving article:", err);
        res.status(500).json({ error: "Failed to create article" });
    }
});
app.get("/articles", async(req, res) =>{
    const articles = await article.find();
    res.json(articles);
});
app.get("/articles/:articleId", async(req, res) =>{
    const id = req.params.articleId;
    try {
const Article =await article.findById(id);
res.json(Article);
return;
    }catch(error){
        console.log("error while reading article of id ", id );
        return res.send("error");
    }
    
    //const articles = await article.find();
    
});
app.put("/articleUpdates/:arId", async (req, res)=>{
const id = req.params.arId;
try{
    const Article = await article.findById(id);
    Article.title=req.body.arTitle;
    Article.body=req.body.arBody;
    Article.numOfLikes=req.body.likesNum;
    await Article.save();
    res.json(Article);
}catch(err){

        console.error("Error saving article:", err);
        res.status(500).json({ error: "Failed to create article" });
}
})
app.delete("/artDelete/:arDId", async(req, res)=>{
    const id = req.params.arDId;
    try{
        const Article = await article.findByIdAndDelete(id);
        res.json(Article);
        return;
    }catch(error){
             console.error("Error deleting  article:", error);
        res.status(500).json({ error: "Failed to create article" });   
    }
})
app.get("/showArticles", async(req, res)=>{
   // res.render("articles.ejs");
   const Articles = await article.find();
   res.render("articles.ejs", {
    allArticles: Articles,
   });

});
