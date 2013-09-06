require_relative '../../init.rb'

describe Verify do
	it "should detect if a url is of length 0" do
		Verify.is_link_valid("")[:valid].should be_false
	end
	
	it "should detect if an invalid url is invalid" do
		Verify.is_link_valid("dogs")[:valid].should be_false 
	end
	

	it "should detect if a valid url is valid" do
		Verify.is_link_valid("http://google.com").should be_true
	end
	
	it "should detect is a tag contains invalid characters" do
		Verify.is_tag_valid("fsdf ff")[:valid].should be_false
	end
	
	it "should detect if a tag already exists" do
		if Verify.is_tag_valid("testtag")[:valid]
			link = Link.new(["test_url"], "testtag")
			link.store_code_mappings
		end
		#testtag is a tag already in the database
		Verify.is_tag_valid("testtag")[:valid].should be_false
	end
	

end
