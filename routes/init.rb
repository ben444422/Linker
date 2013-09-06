get '/' do
  render :erb, :main
end

get '/index' do
  render :erb, :main
end


get '/code/:code' do |code|
	url_data = Link.get_urls_of_code(code)
	if url_data[:status] == "success" && url_data[:urls].length == 1
		redirect url_data[:urls][0]
	else
		render :erb, :link	
	end
	
	
end


get '/url' do
	url = params[:url]
	redirect url
end
