require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

desc "Install dependencies and build"
task :install do
  
  # Install grunt and grunt task contribs
  
  [ 
    'grunt',
    'grunt-contrib-uglify',
    'grunt-contrib-watch',
    'grunt-contrib-concat',
    'grunt-contrib-compass',
    'request-json'
  ].each do | pkg |
      sh "npm install #{pkg} --save"
  end
  
  # Install Ruby and Bower dependencies
  
  sh "bower install"
  sh "bundle install"
  
  # Run grunt commands to build JS and CSS
  
  sh "grunt concat"
  sh "grunt uglify"
  sh "grunt compass"
end