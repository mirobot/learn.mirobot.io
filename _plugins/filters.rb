module Jekyll
  module TagCloudFilter
    def tag_hash(input)
      output = {}
      input.each { |el|
        output[el] ||= 0
        output[el] += 1
      }
      output
    end
  end
end

Liquid::Template.register_filter(Jekyll::TagCloudFilter)