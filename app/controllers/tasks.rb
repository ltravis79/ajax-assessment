require 'json'

get '/' do
	@tasks = Task.all
	erb :index
end

post '/tasks' do 
	p "*" * 50
	p params
	p "*" * 50
	new_task = Task.create!(task_name: params[:task_name])
	if request.xhr?
		content_type :json
		new_task.to_json
	else
		redirect '/'
	end
end

delete '/tasks/:id' do 
	(Task.find(params[:id]).destroy)
	# Question -- What should a return value to JS be for a delete route?
	if request.xhr?
		# What should go here?
	else
		redirect '/'
	end
end