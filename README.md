# Vortex Visualization

## Install

Install node, npm, and grunt then run...

	npm install
	grunt

When developing be sure to run...

	grunt watch

...so the newly modified source is concatenated and minified.

## Config

	config/config.js

Right now this config file is only used to configure Capitain's Sparrow.

## Layout

Here's the basic layout of the visualization.

	[ keyword-frequency ][ image-list ]
	[ text-list         ][		...     ]

## Interactivity

Click the bars in keyword-frequency to filter the image-list and text-list.
Click an image thumbnail in the image-list to pop-up full sized image.
Click label in text-list to open the text.

## Test Data

	script/test_data.js

This produces dummy records for testing.
Uses JSON template files in json/tmpl and creates sample files in json/data.

### Commands

	node test_data.js 

build `json/data/vortex.json`

	node test_data.js tag

build `json/data/tag.json`

### UI - Data connection

`json/data/vortex.json` populates the image-list and text-list.
`json/data/tag.json` populates the keyword-frequency.

The data-structure is really simple and should be self-explanatory just extend as needed.

## NOTES

CTS XML to HTML transform still needs to be performed.
See... `ui/cts-reader/cts-reader.ui.js $scope.urn()`