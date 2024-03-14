const Fastify = require('fastify');
const fastify = Fastify({
	logger : true
});
// const express = require('express');
// const app = express();

const tasks = [
	{
		id : 1,
		name : 'Task 1',
		completed : false
	},
	{
		id : 2,
		name : 'Task 2',
		completed : false
	},
	{
		id : 3,
		name : 'Task 3',
		completed : false
	}
];

// GET
fastify.get('/api/tasks' , (request, response) => {
	response.send(tasks);
});

// GET (BY ID)
fastify.get('/api/tasks/:id' , (request, response) => {
	const taskId = request.params.id;
	const task = tasks.find(task => task.id === parseInt(taskId));
	if(!task) return response.status(404).send('The task with the provided ID does not exist.');
	response.send(task);
});

// POST
fastify.post('/api/tasks', (request, response) => {
	// const { error } = utils.validateTask(request.body);

	if(!(request.body.name && !request.body.completed)) return response.status(400).send('The name should be at least 3 chars long!');

	const task = {
		id : tasks.length + 1,
		name : request.body.name,
		completed : request.body.completed
	};

	tasks.push(task);
	response.status(201).send(task);
});

//PUT
fastify.put('/api/tasks/:id', (request, response) => {
	const taskId = request.params.id;
	const task = tasks.find(task => task.id === Number(taskId));
	if(!task) return response.status(404).send('The task with the provided ID does not exist.');

	// const { error } = utils.validateTask(request.body);

	if(!(request.body.name && request.body.completed)) return response.status(400).send('The completed should be true!');

	task.name = request.body.name;
	task.completed = request.body.completed;

	response.send(task);
});


//DELETE
fastify.delete('/api/tasks/:id', (request, response) => {
	const taskId = request.params.id;
	const task = tasks.find(task => task.id === Number(taskId));
	if(!task) return response.status(404).send('The task with the provided ID does not exist.');

	const index = tasks.indexOf(task);
	tasks.splice(index, 1);
	response.send(task);
});


const port = process.env.PORT || 4000;
// fastify.get('/', (req,rep)=>{
// 	rep.send('hello');
// });

fastify.listen({port});

module.exports = fastify;
