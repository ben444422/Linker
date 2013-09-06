# returns a new code given an array of urls
get '/links/code' do
	link = Link.new(JSON.parse(params[:urls]), params[:code])
	link.store_code_mappings
	link.code.to_json
end

# returns the urls associated with a code
get '/links/:code/urls' do |code| 
	Link.get_urls_of_code(code).to_json
end

# get the number of urls that a code is linked to
get '/links/:code/count' do |code|
	data = Link.get_urls_of_code(code)
	return 0 if data[:status] == 'failure'
	data[:urls].length
end