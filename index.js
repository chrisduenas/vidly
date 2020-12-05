const express = require('express');
const app = express();

// middleware
app.use(express.json());

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'}
];

app.get('/', (req,res) => {
    res.send('hello world!!');
})

app.get('/api/courses', (req,res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course with given Id does not exist');
    res.send(course);
})

app.post('/api/courses', (req,res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name, // need to parse json objects because by default, this feature is not enabled in express
    };
    courses.push(course);
    res.send(course);
})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}...`)
});