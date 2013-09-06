require_relative '../../init.rb'

describe Link do
	it "should ensure that a nonexistent code does not exist in the database" do
		Link.exists?("1").should be_false
	end
	
	it "should be able to get a new random code" do
		code = Link.get_new_code
		code.should be
	end
	
	it "should insert code link mappings in the database" do
		link = Link.new(["www.google.com", "www.yahoo.com", "www.dogs.net"], nil)
		link.store_code_mappings[:status].should == "success"
	end
	
	it "should be able to retrieve the urls for a valid code" do
		urls = ["link1", "link2", "link3", "link4"]
		link = Link.new(urls, nil)
		code = link.code
		link.store_code_mappings[:status].should == "success"
		urls_mapped = Link.get_urls_of_code(code)
		urls_mapped[:status].should == "success"
		valid = true
		urls_mapped[:urls].each { |url|
			if !urls.include? url
				valid = false
				break
			end	
			urls.delete(url)
		}
		valid.should be_true
	end
	
	it "should fail to get the urls of a nonexistent code" do
		Link.get_urls_of_code("--")[:status].should == "failure"
	end
	
	
end
