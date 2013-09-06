get '/info/code_domain' do
	Info.get_code_domain.to_json
end