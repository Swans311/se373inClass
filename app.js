const express = require('express')
const exphbs = require('express-handlebars')
const port = process.env.port || 3000
const app = express()

//set the view engine
app.engine('hbs', exphbs.engine({
    defaultLayout:'main',
    extname:'.hbs',
    helpers:{
        getShortComment(comment){
            if(comment.length < 60){
                return comment
            }
            return comment.substring(0,60)+'...'
        }
    }
}))
app.set('view engine', 'hbs')
//route to render the page
app.get('/', (request, response)=>{
    response.render('home', {
        post:[{
            author:"Jordan D",
            image:"https://picsome.photos/500/500",
            comments:["Comment 1", "comment 2", "Magna enim dolore veniam eiusmod do nulla id nulla ad id reprehenderit aliqua. Culpa consectetur exercitation quis cupidatat esse nostrud labore. Velit anim minim tempor aliqua aliqua proident voluptate laboris. Sint sunt occaecat magna pariatur laboris irure ex ut dolore cillum eiusmod qui cupidatat. Sit aliqua consequat sit nulla ipsum ut consequat tempor non incididunt do.", "Comment 100938478248932"]

        },
        {
            author:"Shrek",
            image:"https://picsome.photos/500/500?2",
            comments:["Comment 1", "comment 4", "Pariatur mollit officia aliquip cillum mollit do cupidatat Lorem aliqua. Officia esse quis eu minim tempor dolore et quis sit enim nisi et laboris dolore. Pariatur velit id eiusmod aute excepteur officia pariatur ipsum laboris. Sint eu nulla ex minim. Pariatur exercitation proident qui excepteur pariatur qui est anim ut fugiat proident incididunt aliquip. Amet amet nisi ex ea dolor tempor. Ut velit enim exercitation et minim est proident ad incididunt magna quis."]

        },{
            author:"Godzilla",
            image:"https://picsome.photos/500/500?30",
            comments:["Good for an overgrown lizard, trash for anything else."]

        }]
    })

})
//set up port for connection
app.listen(port, ()=>{
    console.log("Connected on port 3000")
})