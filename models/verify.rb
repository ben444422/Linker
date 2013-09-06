# does form verification
class Verify
	def self.is_link_valid(link)
		if link.length == 0
			return {
				:valid => false,
				:reason => "The url is empty",
				:message => "I need something here."
			}
		end
		if !(link =~ /#{URI::regexp}/)
			return {
				:valid => false,
				:reason => "The string is not a valid url",
				:message => "Please enter a valid URL."
			}
		end
		return {
			:valid => true
		}
	end
	
	def self.is_tag_valid(tag)
		if tag.length == 0
			return {
				:valid => false,
				:reason => "The url is empty",
				:message => "Please provide a custom tag."
			}
		end
		
		match = /^([a-zA-z\d\-\_])+$/.match(tag)
		match = match ? match[0] : match
		
		print "match"
		print match
		if match != tag
			return {
				:valid => false,
				:reason => "There was an invalid character",
				:message => "Only letters, numbers, '-', and '_' allowed."
			}
		end
		if Link.exists?(tag)
			return {
				:valid => false,
				:reason => "This link already exists",
				:message => "This tag has already been taken"
			}
		end
		
		return { :valid => true }
	end
end