# HTML Field Custom Buttons
This repository showcases how you can add and build custom buttons in AgilityCMS for use in the WYSIWYG Editor. These implementations interface with the TinyMCE javscript sdk to register a button and also provide a reference to TinyMCE functions and objects such as the "editor" instance for further customization.

TODO: Image

## Example
**Code (js):**
```javascript
/**
* Creates a new Agility Custom Rich Text Area Button.
* @class
* https://www.tiny.cloud/docs/advanced/creating-a-custom-button/
* 
*/

var FirstCustomButton = function () {

    /**
    * The type definition of this Agility Custom Rich Text Area Button.
    * @var {object} self
    */
    var self = this;

    /**
    * The internal reference name of the Custom Rich Text Area.
    * Must not contain any special characters and must be unique.
    * @member {string}
    */
    self.ReferenceName = "FirstCustomButtonName";

    /**
     * TinyMCE editor instance that will be initialized by CMS when the editor is rendered.
     */
    self.Editor = null;

    /**
     * Options of the custom tinymce editor button
     * @member {object}
     * Button configuration properties:
     * text - the text that will show up on the button
     * icon - CSS class for the icon (from one of the loaded stylesheets)
     * image - URL of the image (16x16 recommended) to use as an icon (overrides icon option if defined)
     * tooltip - tooltip to pop up on hover
     * onclick - callback to call when button is clicked
     * onpostrender - callback to call when button is rendered
     * cmd - editor command to invoke, when button is clicked (command should be registered prior to this, either by editor or by you)
     */
    self.Options = {
        text: 'My new button',
        icon: false,
        onclick: function () {
            self.Editor.insertContent('&nbsp;<strong>It\'s my button!</strong>&nbsp;');
        }
    };
};

ContentManager.Global.CustomRichTextAreaButtons.push(new FirstCustomButton());
```

**Button on HTML Field:**
TODO: Image

**Result of Clicking Button:**
TODO: Image

## How it Works
Similar to Custom Fields [TODO:Link], you need to implement a customization JS script file. This file will register your custom buttons and the function to be executed upon click. Your JS script file is a single file that can be stored externally and imported over a URL, or it can be stored within Inline Code in Agility.

## Setup Instructions
1. Within the Agility Content Manager, go to Settings > Customization/Development > Content Editor and click on the Advanced Tab
[TODO: Image]


