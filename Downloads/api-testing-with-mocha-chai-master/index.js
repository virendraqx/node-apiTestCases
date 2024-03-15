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
fastify.get('/api/tasks' , (request, reply) => {
	reply.send(tasks);
});

// GET (BY ID)
fastify.get('/api/tasks/:id' , (request, reply) => {
	const taskId = request.params.id;
	const task = tasks.find(task => task.id === parseInt(taskId));
	if(!task) return reply.status(404).send('The task with the provided ID does not exist.');
	reply.send(task);
});

// POST
fastify.post('/api/tasks', (request, reply) => {
	// const { error } = utils.validateTask(request.body);

	if(!(request.body.name && !request.body.completed)) return reply.status(400).send('The name should be at least 3 chars long!');

	const task = {
		id : tasks.length + 1,
		name : request.body.name,
		completed : request.body.completed
	};

	tasks.push(task);
	reply.status(201).send(task);
});

//PUT
fastify.put('/api/tasks/:id', (request, reply) => {
	const taskId = request.params.id;
	const task = tasks.find(task => task.id === Number(taskId));
	if(!task) return reply.status(404).send('The task with the provided ID does not exist.');

	// const { error } = utils.validateTask(request.body);

	if(!(request.body.name && request.body.completed)) return reply.status(400).send('The completed should be true!');

	task.name = request.body.name;
	task.completed = request.body.completed;

	reply.send(task);
});


//DELETE
fastify.delete('/api/tasks/:id', (request, reply) => {
	const taskId = request.params.id;
	const task = tasks.find(task => task.id === Number(taskId));
	if(!task) return reply.status(404).send('The task with the provided ID does not exist.');

	const index = tasks.indexOf(task);
	tasks.splice(index, 1);
	reply.send(task);
});


const port = process.env.PORT || 4000;
// fastify.get('/', (req,rep)=>{
// 	rep.send('hello');
// });

fastify.listen({port});

module.exports = fastify;
