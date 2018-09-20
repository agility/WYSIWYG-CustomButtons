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
