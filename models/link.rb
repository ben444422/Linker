# Takes care of saving and generating of a new link
class Link
	attr_accessor :urls, :code
	def initialize(urls, code)
		@urls = urls.uniq
		@code = code ? code : Link.get_new_code
	end
	
	def self.exists?(code)
		db = get_db
		sql = "select count(cl.code) count from data.code_link cl where cl.code = ?"
		code_count = db.fetch(sql, code).all
		return code_count.first[:count].to_i > 0
	end
	
	def self.get_new_code
		code = nil
		begin 
			code = SecureRandom.hex[0..6]
		end while Link.exists?(code)
		return code
	end
	
	def self.get_urls_of_code(code)
		db = get_db
		sql = "select cl.link link from data.code_link cl where cl.code = ?"
		links = db.fetch(sql, code).all
		if !links.first
			return {:status => "failure", :reason => "code mapping does not exist"}
		end
		urls = []
		links.each {|row|
			urls.push(row[:link])
		}
		return {:status => "success", :urls => urls}
	end
	
	def store_code_mappings 
		table = get_db[:code_link]
		
		@urls.each { |url|
			table.insert(:code => @code, :link => url)
		}
		return {:status => "success"}
	end
	
end

