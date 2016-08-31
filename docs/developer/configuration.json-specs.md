---
layout: single
---

# iVXjs JSON Specifications

{% include toc %}

## Overview

The core of all iVX.js experiences is the configuration JSON you feed into its init function. Without a
proper configuration, the experience won't load and you will not be able to use any of the features in
iVX.js. This configuration document will help guide you in making the a correct JSON spec and be a reference
to what is needed to implement the features you want. 

## Note about documentation

To keep things standard, the JSON documentation will be utilizing JSOND schema standard. For more information about 
JSOND schemas you can go here: [JSON Schema Org](http://json-schema.org/). 

Also, to make the schemas shorter, the schemas for each section will not be complete with 
the possiblities inside, so it isn't recommended to try to use 
these for validation purposes. 

# Base Structure

_Description_

This is the base structure for the configuration file. 

_Sample Data_

[base-structure-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/base-structure-sample.json)

_Schema_

```
 {
 	"name" : "iVX.js Base",
 	"description" : "These are all the base data structures for iVX.js",
 	"type" : "object",
 	"properties" : {
 		"ui" : {
 			"type" : "string",
 			"description" : "This indicates the UI Framework you wish to use in your project. If this is missing then it will set its value to 'default'",
 			"enum" : ["semanticUI", "bootstrap", "default"]
 		},
 		"selector" : {
 			"type" : "string",
 			"description" : "Indicates which selector this iVX.js experience will be bootstrapped to. If it is missing, iVX.js will make an empty div and attach it to the body."
 		},
 		"metadata" : {
 			"type" : "object",
 			"description" : "Holds all data about this experience such as the title",
 			"properties" : {
 				"title" : {
 					"type" : "string",
 					"description" : "The title of this experience. This will replace the page title of the experience if given."
 				}
 			}
 		},
 		"states" : {
 			"type" : "array",
 			"description" : "All the different states for this experience.",
 			"items" : {
 				"type" : "object",
 				"description" : "States object. The schema for which are in the States section of this documentation"
 			},
 			"minLength" : 1,
 			"required" : true
 		},
 		"defaultState" : {
 			"type" : "array",
 			"description" : "Utilizing the experience's rule function, this will define what is the initial state the user goes to by evaluating the rule. The first rule that evaluates to true, it will go to that stateId. If no rule is given, it goes to that a state by default",
 			"minLength" : 1,
 			"required" : true,
 			"items" : {
 				"type" : "object",
 				"description" : "Indicates which state to go to next based on its stateId and rule",
 				"properties" : {
 					"stateId" : {
 						"type" : "string",
 						"description" : "The stateId the user will go to if the rule is evaluated to true or missing.",
 						"required" : true
 					},
 					"rule" : {
 						"type" : "object",
 						"description" : "Supplies the rule information for this experiences rule function to evaluate if this state should be used.",
 						"properties" : {
 							"key" ; {
 								"type" : "string",
 								"desription" : "The key from the experience.data object or a keyword the rule function uses to get the correct data.",
 								"required" : true
 							},
 							"is" : {
 								"type" : "string",
 								"description" : "The type of comparison this key will be evaluated against the value",
 								"enum" : ["lt", "lte", "gt", "gte", "equals", "notEquals"],
 								"required" : true
 							},
 							"value" : {
 								"type" : "any",
 								"description" : "The value to evaluate the data found in the 'key'.",
 								"required" : true
 							}
 						}
 					}
 				}
 			}
 		},
		 "pageNotFoundState" : {
 			"type" : "array",
 			"description" : "Utilizing the experience's rule function, this will define what is the state the user goes to when an invalid state URL is added. If this object doesn't exist, this will default to the default state. The first rule that evaluates to true, it will go to that stateId. If no rule is given, it goes to that state by default",
 			"minLength" : 1,
 			"required" : true,
 			"items" : {
 				"type" : "object",
 				"description" : "Indicates which state to go to next based on its stateId and rule",
 				"properties" : {
 					"stateId" : {
 						"type" : "string",
 						"description" : "The stateId the user will go to if the rule is evaluated to true or missing.",
 						"required" : true
 					},
 					"rule" : {
 						"type" : "object",
 						"description" : "Supplies the rule information for this experiences rule function to evaluate if this state should be used.",
 						"properties" : {
 							"key" ; {
 								"type" : "string",
 								"desription" : "The key from the experience.data object or a keyword the rule function uses to get the correct data.",
 								"required" : true
 							},
 							"is" : {
 								"type" : "string",
 								"description" : "The type of comparison this key will be evaluated against the value",
 								"enum" : ["lt", "lte", "gt", "gte", "equals", "notEquals"],
 								"required" : true
 							},
 							"value" : {
 								"type" : "any",
 								"description" : "The value to evaluate the data found in the 'key'.",
 								"required" : true
 							}
 						}
 					}
 				}
 			}
 		}
 	}
 }
```

# States

_Description_

State data is the most complex and varied amongst the JSON schemas. There are multiple state types and each with their own specs.

## Shared State Schema

_Description_

All states have the following data below. Assume the specific states types have this data schema with the data schema defined in their respective schema.

_Sample Data_

[shared-state-data-sample.json]({https://influencetech.github.io/ivx-js/developer/sample-JSON/shared-state-data-sample.json)

_Schema_

```
{
	"name" : "iVX.js Shared State Data",
	"description" : "This is the schema that is shared by all states and is supported regardless by type",
	"type" : "object",
	"properties" : {
		"id" : {
			"type" : "string",
			"description" : "A unique identifier for the state. Used by iVX.js to create unique state experiences for customization and navigation. It must be unique to all states.",
			"required" : true
		},
		"name" : {
			"type" : "string",
			"description" : "A human readable name of the state. Used by some states to add a default header to a state if none is given.",
			"required" : true
		},
		"url" : {
			"type" : "string",
			"description" : "The url pathname which this state can be found. These need to be preceded by a /",
			"required" : true
		},
		"audio" : {
			"type" : "object",
			"description" : "All settings for state-wide audio that plays when a user enters the state.",
			"properties" : {
				"src" : {
					"type" : "string",
					"description" : "The path to the audio for this state",
					"required" : true
				},
				"loop" : {
					"type" : "boolean",
					"description" : "Determines if the state wide audio should loop"
				},
				"cuePoints" : {
					"type" : "array",
					"items" : {
						"type" : "object",
						"properties": { 
							"timeAt" : {
								"type" : "number",
								"description" : "Time in the audio at which this event should fire.",
								"required" : true
							},
							"once": {
								"type": "boolean",
								"description" : "Indicates that this event should fire once (just in case the audio loops)"
							},
							"eventName": {
								"type" : "string",
								"description" : "The event to be fired."
							},
							"args": {
								"type" : "object",
								"description" : "Arguments for this event."
							}
						}
					}
				},
				"onEnd" : {
					"type" : "array",
					"description" : "Events to fire when the audio clip is finished."
				}
			}
		},
		"type" : {
			"type" : "string",
			"description" : "The type of state this state will render.",
			"enum" : ["video", "html", "input", "navigation"]
		},
		"header" : {
			"type" : "object",
			"description" : "Contains all the settings for the header which appears before the main section of the state. (Note: not all states support header. Check documentation to make sure which ones)",
			"properties" : {
				"html" : {
					"type" : "string",
					"description" : "HTML to be inserted in the <header></header> section of the state."
				},
				"classes" : {
					"type" : "string",
					"description" : "Classes to add to the <header></header>. Used mostly for injecting classes for ui frameworks."
				},
				"templateUrl" : {
					"type" :"string",
					"description" : "Url path to an external .html file"
				}
			}
		},
		"footer" : {
			"type" : "object",
			"description" : "Contains all the settings for the footer which appears before the main section of the state. (Note: not all states support footer. Check documentation to make sure which ones)",
			"properties" : {
				"html" : {
					"type" : "string",
					"description" : "HTML to be inserted in the <footer></footer> section of the state."
				},
				"classes" : {
					"type" : "string",
					"description" : "Classes to add to the <footer></footer>. Used mostly for injecting classes for ui frameworks."
				},
				"templateUrl" : {
					"type" :"string",
					"description" : "Url path to an external .html file"
				}
			}
		},
		"next" : {
			"type" : "array",
 			"description" : "Utilizing the experience's rule function, this will define what is the next state the user goes to by evaluating the rule. The first rule that evaluates to true, it will go to that stateId. If no rule is given, it goes to that a state by default",
 			"minLength" : 1,
 			"required" : true,
 			"items" : {
 				"type" : "object",
 				"description" : "Indicates which state to go to next based on its stateId and rule",
 				"properties" : {
 					"stateId" : {
 						"type" : "string",
 						"description" : "The stateId the user will go to if the rule is evaluated to true or missing.",
 						"required" : true
 					},
 					"rule" : {
 						"type" : "object",
 						"description" : "Supplies the rule information for this experiences rule function to evaluate if this state should be used.",
 						"properties" : {
 							"key" ; {
 								"type" : "string",
 								"desription" : "The key from the experience.data object or a keyword the rule function uses to get the correct data.",
 								"required" : true
 							},
 							"is" : {
 								"type" : "string",
 								"description" : "The type of comparison this key will be evaluated against the value",
 								"enum" : ["lt", "lte", "gt", "gte", "equals", "notEquals"],
 								"required" : true
 							},
 							"value" : {
 								"type" : "any",
 								"description" : "The value to evaluate the data found in the 'key'.",
 								"required" : true
 							}
 						}
 					}
 				}
 			}

		},
		"onEnter" : {
			"type" : "array",
			"description" : "An array of event data to run when a user enters the state",
			"items" : {
				"type" : "object",
				"descriptions" : "Event data as defined in the event section of this documentation"
			}
		},
		"onExit" : {
			"type" : "array",
			"description" : "An array of event data to run when a user exits the state",
			"items" : {
				"type" : "object",
				"descriptions" : "Event data as defined in the event section of this documentation"
			}
		}  
	}	
}
```

## HTML State Schema

_Description_

The HTML State's data is simple and is designed to help make it easy to inject any HTML into a state.

_Sample Data_

[html-state-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/html-state-sample.json)

_Schema_

```
{
	"name" : "iVX.js HTML State Data",
	"description" : "Data to create and render a html state",
	"type" : "object",
	"properties" : {
		"html" : {
			"type" : "string",
			"description" : "HTML to render in this state",
			"required" : true
		},
		"timeoutInMs" : {
			"type" : "number",
			"description" : "Since there is no native way of progressing to the next state, this will indicate the time in milliseconds for the state to go to the next state."
		},
		"onTimeout" : {
			"type" : "array",
			"description" : "An array of event data to run when a window is timed out but before it navigates to the next state.",
			"items" : {
				"type" : "object",
				"descriptions" : "Event data as defined in the event section of this documentation"
			}
		},
		"templateUrl" : {
			"type" :"string",
			"description" : "Url path to an external .html file"
		}
	}
}
```

## Input State Schema

_Description_

The input state's data allows the developer to create a state with a form and collect data from inputs.

_Sample Data_

[input-state-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/input-state-sample.json)


_Schema_

```
{
	"name" : "iVX.js Input State",
	"description" : "Data to create an input state to collect user data",
	"type" : "object",
	"properties" : {
		"form" : {
			"type" : "object",
			"description" : "Settings for the form and the submit button",
			"properties" : {
				"classes" : {
					"type" : "string",
					"description" : "Classes to add to the form"
				},
				"label" : {
					"type" : "string",
					"description" : "Label to appear before the input in a form"
				},
				"labelHTML" : {
					"type" : "string",
					"description" : "HTML to appear before the inputs in a form."
				},
				"labelTemplateUrl" : {
					"type" : "string",
					"description" : "Url path to a template for this label"
				},
				"submit" : {
					"type" :  "object",
					"description" : "Settings for the submit button",
					"properties" : {
						"classes" : {
							"type" : "string",
							"description" : "Classes to add to the submit button"
						},
						"label" : {
							"type" : "string",
							"description" : "Label string to appear on the submit button"
						},
						"labelHTML" : {
							"type" : "string",
							"description" : "HTML to appear on the submit button"
						},
						"labelTemplateUrl" : {
							"type" : "string",
							"description" : "Url path to a template for this label"
						},
					}
				}
			}
		},
		"onSubmit" : {
			"type" : "array",
			"description" : "An array of event data to run when a user submits the data but before it navigates to the next state.",
			"items" : {
				"type" : "object",
				"description" : "Event data as defined in the event section of this documentation"
			}
		},
		"inputs" : {
			"type" : "array",
			"description" : "All inputs and settings to be shown in this form.",
			"items" : {
				"type" : "object",
				"description" : "Input information. The settings of which is under the 'input' portion of this documentation"
			}
		}
	}
}
```

## Navigation State Schema

_Description_

Settings for the navigation state with the data to set up the links for this state.

_Sample Data_

[navigation-state-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/navigation-state-sample.json)

_Schema_

```
{
	"name" : "iVX.js Navigation State Schema",
	"type" : "object",
	"properties" : {
		"links" : {
			"type" : "array",
			"description" : "The list of links and their settings to be created in this navigation state.",
			"items" : {
				"type" : "object",
				"description" : "Contains the data to create a link using the anchor's UI class. A link requires a href, an id.",
				"properties" : {
					"id" : {
						"type" : "string",
						"description" : "A unique id for this link so it can be targeted using CSS/Javascript",
						"required" : true
					},
					"href" : {
						"type" : "string",
						"description" : "The value to add to the href.",
						"required" : true
					},
					"attributes" : {
						"type" : "object",
						"description" : "Attributes to add to this link.",
						"properties" : {
							"target" : {
								"type" : "string",
								"enum" : "_blank",
								"description" : "If you have the _blank in the target, this will open the link in a new tab/window depending on the browser."
							} 
						}
					},
					"label" : {
						"type" : "string",
						"description" : "The label to add to this anchor tag (the value between the <a></a>). If this or labelHTML is missing, it will use the value in the href property"
					},
					"labelHTML" : {
						"type" : "string",
						"description" : "HTML to add to this anchor tag (the value between the <a></a>). If this or label is missing, it will use the value in the href property"
					},
					"labelTemplateUrl" : {
						"type" : "string",
						"description" : "Url path to a template for this label"
					},
					"onClick" : {
						"type" : "array",
						"description" : "An array of events to fire prior to this link redirecting to the URL referenced in the href."
					}
				}
			}
		}
	}

}
```

## Video State Schema

_Description_ 

The Video State's data has various sections that tell iVX.js what personalization html to render, cuepoints to activate and the settings for the player.

_Sample Data_

[video-state-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/video-state-sample.json)

_Schema_

```
{
	"name" : "iVX.js Video State",
	"description" : "Data to create different types of video players from different sources.",
	"type" : "object",
	"properties" : {
		"playerSettings" : {
			"type" : "object",
			"description" : "The player settings for the video player types. Depending on the settings, it will create the appropriate video players to support the settings. Though none of the elements are required, there needs to be at least src, sources, vimeoId, or youtubeId.",
			"properties" : {
				"autoplay" : {
					"type" : "boolean",
					"description" : "Informs if this video should autoplay when a user enters the state.  It defaults to false. (Doesn't work with iPhone)"
				},
				"controls" : {
					"type" : ["boolean", "string"],
					"desciption" : "Decides which controls to use for this video. If true, the native controls appear. If false, as many of the native controls are hidden. If the value is equal to 'default', this will trigger the default controls for this instance of iVX.js.",
					"enum" : ["default"]
				},
				"attributes" : {
					"type" : "object",
					"description" : "Any other attributes the user wants to add to the video player. The key of the data is the attribute name and the value is the attribute's value. (HTML5 Only)"
				},
				"src" : {
					"type" : "string",
					"description" : "Filepath to the video file to play in the HTML5 video element. Is required if there are no 'sources', 'vimeoId', or 'youtubeId' is defined"
				},
				"youtubeId" : {
					"type" : "string",
					"description" : "The video id of the YouTube video to play during this video state. The youtubeId can be found in the YouTube video url: https://www.youtube.com/watch?v=[youtubeId]."
				},
				"vimeoId" : {
					"type" : "string",
					"description" : "The video id of the Vimeo video to play during this video state. The vimeoId can be found in the Vimeo video url: https://vimeo.com/[vimeoId]"
				},
				"sources" : {
					"type" : "array",
					"description" : "If using the HTML5 video element, these are the settings for source tags between the video element.",
					"items" : {
						"type" : "object",
						"description" : "Settings for this source tag",
						"properties" : {
							"src" : {
								"type" : "string",
								"description" : "The path to the this video source.",
								"required" : true
							},
							"type" : {
								"type" : "string",
								"description" : "The file type of the video source, required by this source tag",
								"required" : true

							}
						}
					}
				},
				"tracks" : {
					"type" : "array",
					"description" : "If using the HTML 5 video element, this will the settings for the tracks element in the elements used for close captioning",
					"items" : {
						"type" : "object",
						"description" : "Settings for the track element",
						"properties" : {
							"src" : {
								"type" : "string",
								"description" : "Path to the .VTT file for this track",
								"required" : true
							},
							"kind" : {
								"type" : "string",
								"description" : "Kind of track such as chapter"
							},
							"default" : {
								"type" : "boolean",
								"description" : "Determines if this track is the default track for this video"
							}
						}
					}

				}
			}
		},
		"personalizations" : {
			"type" : "array",
			"description" : "An array of settings for personalizations for this video state.",
			"items" : {
				"type" : "object",
				"description" : "Settings for this personalization HTML element",
				"properties" : {
					"id" : {
						"type" : "string",
						"description" : "The id for this personalization that will be targeted by CSS/JS.",
						"required" : true
					},
					"html" : {
						"type" : "string",
						"description" : "The HTML to be inside this personalization.",
						"required" : true
					},
					"templateUrl" : {
						"type" :"string",
						"description" : "Url path to an external .html file"
					}
				}
			}
		},
		"cuePoints" : {
			"type" : "array",
			"description" : "An array of cuepoints data which will tell what event to fire and when during a video",
			"items" : {
				"type" : "object",
				"description" : "Settings for the cue point",
				"properties" : {
					"eventName" : {
						"type" : "string",
						"description" : "Event name to be fired",
						"required" : true
					},
					"args" : {
						"type" : "object",
						"description" : "Arguments for the event to be fired"
					}
					"timeAt" : {
						"type" : "number",
						"description" : "Time in seconds where this event is fired",
						"required" : true
					},
					"always" : {
						"type" : "boolean",
						"description" : "By default, an event only fires once. If the event needs to fire whenever the video is at the point in the video, this needs to be true"
					}
				}
			}
		},
		"onVideoEnd" : {
			"type" : "array",
			"description" : "An array of event data to run when a user finishes the video and before the navigation to the next state is fired if there is next state.",
			"items" : {
				"type" : "object",
				"descriptions" : "Event data as defined in the event section of this documentation"
			}
		}
	}
}
```

# Inputs

_Description_

Inputs are standard form inputs used for gathering user information using the input state. The settings for them are varied based on the input type.

## Shared Input Data

_Description_

Most inputs share attributes to record data and here are the settings that most inputs share. 

_Sample Data_

[input-data-shared-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/input-data-shared-sample.json)

_Schema_

```
{
	"name" : "iVX.js Shared Input Data",
	"type" : "object",
	"properties" : {
		"id" : {
			"type" : "string",
			"description" : "The id of this input that can be targeted by CSS/Javascript",
			"required" : true
		},
		"name" : {
			"type" : "string",
			"description" : "The name of this input. This will be the key for the setData event and the value is this input's value.",
			"required" : true
		},
		"attributes" : {
			"type" : "object", 
			"description" : "Attributes to add to the input",
			"properties" : {
				"required" : {
					"type" : "boolean",
					"description" : "Makes this input required indicating that the user must provide information inorder to submit the form"
				},
				"placeholder" : {
					"type" : "string",
					"description" : "The text for this placeholder."
				}
			}
		},
		"settings" : {
			"type" : "object",
			"description" : "The settings for this input's input and container.",
			"properties" : {
				"input" : {
					"type" : "object",
					"description" : "Input settings for this input",
					"properties" : {
						"classes" : {
							"type" : "string",
							"description" : "Classes to add to the input element"
						}
					}
				},
				"container" : {
					"type" : "object",
					"description" : "Container settings for this input",
					"properties" : {
						"classes" : {
							"type" : "string",
							"description" : "Classes to add to the container surrounding the input."
						}
					}
				},
				"width" : {
					"type" : "string",
					"description" : "Indicates the width of this input depending on the grid system in use. It uses the format X/Y"
				}
			}
		},
		"errors" : {
			"type" : "object",
			"description" : "Depending on the key of this object, the value of each attribute will override the default error message for this input."
		},
		"label" : {
			"type" : "string",
			"description" : "The label to add to this input. If none is present, it will use this input's name"
		},
		"labelHTML":{
			"type" : "string",
			"description" : "HTML to add to the input's label."
		},
		"labelTemplateUrl" : {
						"type" : "string",
						"description" : "Url path to a template for this label"
					},
		"onChange" : {
			"type" : "array",
			"description" : "Overrides the default behavior when a valid input is put in."
		}
	}
}
```

## Buttons

_Description_

Buttons data allows the user to create a group of buttons that set values on click.

_Sample Data_

[input-button-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/input-button-data-sample.json)

_Schema_

```
{
	"name" : "iVX.js Input Button Schema",
	"type" : "object",
	"properties" : {
		"type" : {
			"type" : "string",
			"description" : "Indicates the type of input, in this case needs to be set to buttons",
			"enum" : ["buttons"],
			"required" : true
		},
		"settings" : {
			"type" : "object",
			"description" : "In addition to the other settings, this will add a boolean to determine whether to show the button's label.",
			"properties" : {
				"showLabel" : {
					"type" : "boolean",
					"description" : "Determines if the label should show up"
				}
			}
		},
		"buttons" : {
			"type" : "array",
			"description" : "A collection of button data to render the button in the input",
			"required" : true,
			"minLength" : 1,
			"items" : {
				"type" : "object",
				"description" : "The various settings for the button",
				"properties" : {
					"value" : {
						"type" : "any",
						"description" : "When this button is clicked, it will set the name of this input's data to the value provided.",
						"required" : true
					},
					"label" : {
						"type" : "string",
						"description" : "A string to appear between the <button></button> element in this button"
					},
					"labelHTML" : {
						"type" : "string",
						"description" : "HTML to appear between the <button></button> element in this button"
					},
					"labelTemplateUrl" : {
						"type" : "string",
						"description" : "Url path to a template for this label"
					},
					"classes" : {
						"type" : "string",
						"description" : "Classes to add to this specific button input"
					},
					"onClick" : {
						"type" : "array",
						"description" : "Overrides the default behavior of a button on click. Normally, when a user clicks a button it calls this experience's setData with the name of this input as its key and the value of this button. If this onClick array exist it will only do the events in this event",
						"items" : {
							"type" : "object",
							"description" : "An event to fire when a user clicks this button."
						}
					}
				}
			}
		}
	}
}
```

## Checkbox

_Description_

Settings for the input to render a checkbox.

_Sample Data_

[input-checkbox-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/input-checkbox-data-sample.json)


_Schema_

```
{
	"name" : "iVX.js Checkbox Input",
	"description" : "JSON Schema for checkbox settings."
	"type" : "object",
	"properties" : {
		"type" : {
			"type" : "string",
			"description" : "Indicates to create a checkbox input",
			"enum" : ["checkbox"],
			"required" : true
		}
	}
}
```

## Date

_Description_

Settings for the date input type

_Sample Data_

[input-date-data-sample.json]({% include base_path %}/developer/sample-json/input-date-data-sample.json)

_Schema_

```
{
	"name" : "iVX.js Date Input",
	"type" : "object",
	"description" : "Schema for date input types",
	"properties" : {
		"type" : {
			"type" : "string",
			"description" : "Indicates to create a date type input",
			"enum" : ["date"],
			"required" : true
		},
		"attributes" : {
			"type" : "object",
			"description" : "The attributes to add to this date",
			"properties" : {
				"min" : {
					"type" : "string",
					"description" : "The minimum date for this date input. Must be in this format: mm/dd/yyyy"
				},
				"max" :{
					"type" : "string",
					"description" : "The maximum date to this date input. Must be in this format: mm/dd/yyyy"
				}
			}
		}
	}
}
```

## Datetime-Local

_Description_

Settings for the datetime-local input type

_Sample Data_

[input-datetime-local-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/input-datetime-local-data-sample.json)

_Schema_

```
{
	"name" : "iVX.js Datetime-Local Input",
	"type" : "object",
	"description" : "Schema for datetime-local input types",
	"properties" : {
		"type" : {
			"type" : "string",
			"description" : "Indicates to create a datetime-local type input",
			"enum" : ["datetime-local"],
			"required" : true
		},
		"attributes" : {
			"type" : "object",
			"description" : "The attributes to add to this datetime-local.",
			"properties" : {
				"required" : {
					"type" : "boolean",
					"description" : "Determines if this datetime-local is required"
				},
				"min" : {
					"type" : "string",
					"description" : "The minimum date for this datetime-local input. Must be in this format: mm/dd/yyyy"
				},
				"max" :{
					"type" : "string",
					"description" : "The maximum date to this datetime-local input. Must be in this format: mm/dd/yyyy"
				}
			}
		}
	}
}
```

## Email

_Description_

Settings for this email input type

_Sample Data_

[input-email-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/sample-json/input-email-data-sample.json)


_Schema_

```
{
	"name" : "iVX.js Email Input",
	"type" : "object",
	"description" : "Settings to render an email input",
	"properties" : {
		"type" : {
			"type" : "string",
			"description" : "Indicates to render an email type",
			"enum" : ["email"],
			"required" : true
		},
		"errors" : {
			"type" : "object",
			"description" : "Overrides the default message based on the attributes",
			"properties" : {
				"email" : {
					"type" : "string",
					"description" : "Overrides the invalid email message if the email is not in a valid email format."
				}
			}
		}
	}
}
```

## Number

_Description_

Settings for the number input type

_Sample Data_

[input-number-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/input-number-data-sample.json)


_Schema_

```
{
	"name" : "iVX.js Number Input",
	"type" : "object",
	"description" : "Settings for the number input",
	"properties" : {
		"type" : {
			"type" : "string",
			"description" : "Indicates to render a number type",
			"enum" : ["number"],
			"required" : true
		},
		"attributes" : {
			"type" : "object",
			"description" : "Attributes unique to the number input",
			"properties" : {
				"min" : {
					"type" : "number",
					"description" : "The minimal number this input can go to"
				},
				"max" : {
					"type" : "number",
					"description" : "The maximum number this number can go to"
				},
				"step" : {
					"type" ; "number",
					"description" : "The amount this number input increments"
				}
			}
		}
	}
}
```

## Options

_Description_

Settings for this select/options input

_Sample Data_

[input-options-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/input-options-data-sample.json)


_Schema_

```
{
	"name" : "iVX.js Options/Select Input settings",
	"type" : "object",
	"description" : "Settings for this option input",
	"properties" : {
		"type" : {
			"type" : "string",
			"description" : "Indicates that this input is an option type",
			"enum" : ["options"],
			"required" true
		},
		"defaultDisplay" : {
			"type" : "string",
			"description" : "The default display for this input if no value is selected."
		},
		"options" : {
			"type" : "array",
			"description" : "The various options for this options input",
			"required" : true,
			"minLength" : 2
			"items" : {
				"type" : "object",
				"description" : "The display and value setting",
				"properties" : {
					"value" : {
						"type" : "string",
						"description" : "The value to set this option to",
						"required" : true,
						"minLength" : 1
					},
					"display" : {
						"type" : "string",
						"description" : "The display that will appear in the input",
						"required" : true,
						"minLength" : 1
					}
				}
			}
		}
	}
}
```

## Radio Buttons

_Description_

Settings to render radio buttons 

_Sample Data_

[input-radio-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/input-radio-data-sample.json)


_Schema_

```
{
	"name" : "iVX.js Radio Button Schema",
	"description" : "Settings to render radio buttons",
	"type" : "object",
	"properties" : {
		"radioButtons" : {
			"type" : "array",
			"description" : "The settings for each of the radio inputs",
			"required" : true,
			"minLength" : 2,
			"items" : {
				"type" : "object",
				"description" : "The settings for each individual radio button",
				"properties" : {
					"value" : {
						"type" : "string",
						"description" : "The value set if this radio button is clicked",
						"required" : true,
						"minLength" : 1
					},
					"label" : {
						"type" : "string",
						"description" : "The label to use along side this radio button"
						
					},
					"labelHTML" : {
						"type" : "string",
						"description" : "HTML to plug into the label."
					},
					"labelTemplateUrl" : {
						"type" : "string",
						"description" : "Url path to a template for this label"
					},
					"classes" : {
						"type" : "string",
						"description" : "Classes to add to a specific radio button"
					}
				}

			}
		}
	}
}
```

## Text

_Description_

Settings for the text type input

_Sample Data_

[input-text-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/input-text-data-sample.json)


_Schema_

```
{
	"name" : "iVX.js Text Input",
	"description" : "Settings to render a text input",
	"type" : "object",
	"properties" : {
		"type" : {
			"type" : "string",
			"description" : "Type indicating to render a text type input",
			"required" : true,
			"enum" :["text"]
		},
		"attributes" : {
			"placeholder" : {
				"type" : "string",
				"description" : "The value to put in the placeholder of this input"
			},
			"minlength" : {
				"type" : "number",
				"description" : "The minimum number of characters of this input"
			},
			"maxlength"  :{
				"type" : "number",
				"description" : "The maximum number of character of this input"
			}
		}
	}
}
```

## Text Area

_Description_

Settings for the textarea type input

_Sample Data_

[input-textarea-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/input-textarea-data-sample.json)

_Schema_

```
{
	"name" : "iVX.js Text Area Input",
	"description" : "Settings to render a text area input",
	"type" : "object",
	"properties" : {
		"type" : {
			"type" : "string",
			"description" : "Type indicating to render a text area type input",
			"required" : true,
			"enum" :["textarea"]
		},
		"attributes" : {
			"placeholder" : {
				"type" : "string",
				"description" : "The value to put in the placeholder of this input"
			},
			"minlength" : {
				"type" : "number",
				"description" : "The minimum number of characters of this input"
			},
			"maxlength"  :{
				"type" : "number",
				"description" : "The maximum number of character of this input"
			}
		}
	}
}
```

## Url

_Description_

Settings for this Url input type

_Sample Data_

[input-url-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/input-url-data-sample.json)


_Schema_

```
{
	"name" : "iVX.js Url Input",
	"type" : "object",
	"description" : "Settings to render an url input",
	"properties" : {
		"type" : {
			"type" : "string",
			"description" : "Indicates to render an url type",
			"enum" : ["url"],
			"required" : true
		},
		"errors" : {
			"type" : "object",
			"description" : "Overrides the default message based on the attributes",
			"properties" : {
				"url" : {
					"type" : "string",
					"description" : "Overrides the invalid Url message if the url is not in a valid url format."
				}
			}
		}
	}
}
```

# Events / Actions

_Description_

To tell iVX.js to run events in the various places in the states and inputs, the user must set up the event data in a certain way.

_Sample Data_

For all the following schemas, the sample data can be found here:

[ivxjs-event-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/ivxjs-event-data-sample.json)


## Basic Event Structure

_Description_

Simple structure for indicating to run an event in the various event arrays.

_Schema_

```
{
	"name" : "Basic iVX.js Event Object Settings",
	"description" : "The basic structure for the event name structure",
	"type" : "object",
	"properties" : {
		"eventName" : {
			"type" : "string",
			"description" : "This the event name to run by the experience. iVX.js will fire this event on its bus and try to perform the event using actions.",
			"required" : true
		},
		"args" : {
			"type" : "object",
			"description" : "All the arguments for this event. The key is the argument name and the value is the value it is set."
		}
	}
}
```

## animateElement

_Description_

Indicates to iVX.js to run the native animateElement action.

_Schema_

```
{
	"name" : "iVX.js animateElement action settings",
	"description" ; "Settings to run the animate element event",
	"type" : "object",
	"properties" : {
		"eventName" : {
			"type" : "string",
			"description" : "Indicates to run the animateElement event",
			"required" : true,
			"enum" : ["animateElement"]
		},
		"args" : {
			"type" : "object",
			"description" : "The settings to animate the element",
			"required" : true,
			"properties" : {
				"element" : { 
					"type" : "string",
					"description" : "The selector to the element to animate",
					"required" : true
				},
				"animationClass" : {
					"type" : "string",
					"description" : "The class/classes to cause an animation.",
					"required" : true
				}
			}
		}
	}
}
```

## goToNextState

_Description_

The settings that takes a set of rules and navigates to a state based on them.

_Schema_

```
{
	"name" : "iVX.js goToNextState Action Settings",
	"description" : "Settings to navigate to a state based on a set of rules",
	"type" : "object",
	"properties" : {
		"eventName" : {
			"type" : "string",
			"enum" : ["goToNextState"]
		},
		"args" : {
			"type" : "object",
			"description" : "Arguments for goToNext state which is called next which is similar to a rules array",
			"properties": {
				"next" : {
					"type" : "array",
					"description" : "Utilizing the experience's rule function, this will define what is the next state the user goes to by evaluating the rule. The first rule that evaluates to true, it will go to that stateId. If no rule is given, it goes to that a state by default",
					"minLength" : 1,
					"required" : true,
					"items" : {
						"type" : "object",
						"description" : "Indicates which state to go to next based on its stateId and rule",
						"properties" : {
							"stateId" : {
								"type" : "string",
								"description" : "The stateId the user will go to if the rule is evaluated to true or missing.",
								"required" : true
							},
							"rule" : {
								"type" : "object",
								"description" : "Supplies the rule information for this experiences rule function to evaluate if this state should be used.",
								"properties" : {
									"key" ; {
										"type" : "string",
										"desription" : "The key from the experience.data object or a keyword the rule function uses to get the correct data.",
										"required" : true
									},
									"is" : {
										"type" : "string",
										"description" : "The type of comparison this key will be evaluated against the value",
										"enum" : ["lt", "lte", "gt", "gte", "equals", "notEquals"],
										"required" : true
									},
									"value" : {
										"type" : "any",
										"description" : "The value to evaluate the data found in the 'key'.",
										"required" : true
									}
								}
							}
						}
				}
			}
		}
	}
}
```

## goToState

_Description_

Settings to fire the goToState event. 

_Schema_

```
{
	"name" : "iVX.js goToState Event Settings",
	"description" : "Settings to fire the goToState",
	"type" : "object",
	"properties" : {
		"eventName" : {
			"type" : "string",
			"description" : "Indicates to run the goToState event",
			"required" : true,
			"enum" : ["goToState"]
		},
		"args" : {
			"type" : "object",
			"description" : "The settings to run the goToState",
			"required" : true,
			"properties" : { 
				"stateId" : {
					"type" : "string",
					"description" : "The stateId to go to.",
					"required" : true
				}
			}
		}
	}

}
```

## playAudioClip

_Description_

Loads and plays a piece of audio. 

_Schema_

```
	{
		"name" : "iVX.js playAudioClip Action Settings",
		"description" : "Settings to run the playAudioClip",
		"type" : "object",
		"properties": {
			"eventName" : {
				"type" :"string",
				"description" : "The event name."
				"required" : true,
				"enum" : ["playAudioClip"]
			},
			"args": {
				"type": "object",
				"required" : true,
				"description" : "The arguments for this event.",
				"properties" : {
					"id": {
						"type" : "string",
						"description" : "The id of the Audio element that will play the clip. By default there are two audio ids: \"state-audio\" and \"experience-audio.\"",
						"required" : true
					},
					"src" : {
						"type" : "string",
						"description" : "The path to the audio for this state",
						"required" : true
					},
					"loop" : {
						"type" : "boolean",
						"description" : "Determines if the state wide audio should loop"
					},
					"cuePoints" : {
						"type" : "array",
						"items" : {
							"type" : "object",
							"properties": { 
								"timeAt" : {
									"type" : "number",
									"description" : "Time in the audio at which this event should fire.",
									"required" : true
								},
								"once": {
									"type": "boolean",
									"description" : "Indicates that this event should fire once (just in case the audio loops)"
								},
								"eventName": {
									"type" : "string",
									"description" : "The event to be fired."
								},
								"args": {
									"type" : "object",
									"description" : "Arguments for this event."
								}
							}
						}
					},
					"onEnd" : {
						"type" : "array",
						"description" : "Events to fire when the audio clip is finished."
					}
				}
			}	
		}
	}
```

## setData

_Description_

The settings to raise the setData event

_Schema_

```
{
	"name" : "iVX.js setData Action Settings",
	"description" : "Settings to run the setData action",
	"type" : "object",
	"properties" : {
		"eventName" : {
			"type" : "string",
			"description" : "Indicates to run the setData event",
			"required" : true,
			"enum" : ["setData"]
		},
		"args" : { 
			"type" : "object",
			"description" : "The settings for data to be set",
			"required" : true,
			"properties" : {
				"key" : {
					"type" : "string",
					"description" : "The key in the experience.data object to set this value to",
					"required" : true
				},
				"value" : {
					"type" : "any",
					"description" : "The value to set the experience.data[key] to",
					"required" : true
				}
			}
		}
	}
}
```

# iVX.io Events/Actions

_Description_

These are the settings specifically if the iVX.js experience is using the iVX.io data module.

_Sample Data_

For all the following schemas, the sample data can be found here:

[ivxio-event-data-sample.json](https://influencetech.github.io/ivx-js/developer/sample-JSON/ivxio-event-data-sample.json)


## recordEvent

_Description_

Raises an iVX.io event defined by the platform

_Schema_

```
{
	"name" : "iVX.io recordEvent Action Settings",
	"description" : "Settings to run the recordEvent action",
	"type" : "object",
	"properties" : {
		"eventName" : {
			"type" : "string",
			"description" : "Indicates to run the recordEvent event",
			"required" : true,
			"enum" : ["recordEvent"]
		},
		"args" : { 
			"type" : "object",
			"description" : "The custom event to raise.",
			"required" : true,
			"properties" : {
				"customEvent" : {
					"type" : "string",
					"description" : "The event to raise in the platform",
					"required" : true
				}
			}
		}
	}
}
```

## setComplete

_Description_

Sets this iVX.io experience's progress to complete

_Schema_

```
{
	"name" : "iVX.io setComplete Action Settings",
	"description" : "Settings to raise the setComplete event through the iVX platform",
	"type" : "object",
	"properties" : {
		"eventName" : {
			"type" : "string",
			"description" : "Indicates to raise the iVX.io's setComplete event",
			"required" : "true",
			"enum" : ["setComplete"]
		}
	}
}
```

## setConverted

_Description_

Sets this iVX.io's experience progress to converted

_Schema_

```
{
	"name" : "iVX.io setConverted Action Settings",
	"description" : "Settings to raise the setConverted action through the iVX platform.",
	"type" : "object",
	"properties" : {
		"eventName" : {
			"type" : "string",
			"description" : "Indicates to raise the iVX.io's setConverted event",
			"required" : true,
			"enum" : ["setConverted"]
		},
		"args" : {
			"type" : "object",
			"description" : "Settings for the setConverted event",
			"properties" : {
				"label" : {
					"type" : "string",
					"description" : "Conversion label for this setConverted event if one exists"
				}
			}
		}
	}
}
```

## setMilestone

_Description_

Sets this iVX.io's experience to a specific milestone

_Schema_

```
{
	"name" : "iVX.io's setMilestone Action Settings",
	"description" : "Settings to raise the setMileston action through the iVX platform",
	"type" : "object",
	"properties" : {
		"eventName" : {
			"type" : "string",
			"description" : "Indicates to raise the iVX.io's setMilestone action",
			"required" : true,
			"enum" : ["setMilestone"]
		},
		"args" : {
			"type" : "object",
			"description" : "Settings to successfully raise this setMileston action",
			"required" : true,
			"properties" : {
				"milestone" : {
					"type" : "string",
					"description" : "The name of the milestone to be set",
					"required" : true
				}
			}
		}
	}
}
```
