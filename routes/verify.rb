get '/verify/link_input' do
	Verify.is_link_valid(params[:link].strip).to_json
end

get '/verify/tag' do
	Verify.is_tag_valid(params[:tag].strip).to_json
end