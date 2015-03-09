# JackAPP

JackAPP is a JackSON AngularJS application starter-kit.
It was designed to make building link-data web applications simple.

## Features

* Decoupling of ontology terms with an application data-model.
	* Ontology terms can be modified and not break internal integrity of the application.
		* Developers can concentrate exclusively on building internally consistent data-models.  
				* If a better ontology term is discovered it can be used with a simple configuration change.  No new code will be written.

* Handy services for...
	* Saving data to, and retrieving data from, a JackSON server.
	* Querying a SPARQL endpoint.

## Files and directories explained

* json
	* JSON data templates and configuration
* json/context
	* JSON-LD ontologies
* json/config.json 
	maps JSON template to ontology and UI element.



