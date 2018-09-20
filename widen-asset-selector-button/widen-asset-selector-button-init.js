/**
* Creates a new Agility Custom Rich Text Area Buttion.
* @class
*/
var WidenAssetButton = function () {

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
    self.ReferenceName = "WidenAssetButton";

    /**
     * TinyMCE editor instance that will be initialized when it is rendered
     */
    self.Editor = null;

    self.Custom = new function() {
        var c = this;
        c.accessToken = "{{access token goes here}}"; //i.e. cloud/abcdefghifklmnopqrstuvwxyz
        c.templateID = "widen-flyout-editor";
        c.templateInlineCodeReferenceName = "WidenAssetButtonTemplate";
        c.openFlyout = function (callback) {
            var rightPanel = null;
            var panel = new c.widenFlyout({ accessToken: c.accessToken, callback: callback });
            rightPanel = new ContentManager.ViewModels.RightPanel(c.templateID, panel);
            ContentManager.ViewModels.Navigation.panelStack.push(rightPanel);
        },
        c.loadTemplate = function(callback) {
            var $tmpl = $('#' + c.templateID);
            if($tmpl.size() == 0) {
                //load it into the DOM
                ContentManager.Global.CustomInputFieldGetTemplate(c.templateInlineCodeReferenceName, function(html) {
                    $('body').append(html);
                    callback();
                });
            } else {
                //loaded in DOM already
                callback();
            }
        },
        c.widenFlyout = function (params) {
            var w = this;
            w.accessToken = params.accessToken;
            w.loading = ko.observable(true);
            w.iFrameUrl = ko.observable(null);
            w.onSelected = params.callback;
            w.methods = new function () {
                var m = this;
                m.getIFrameUrl = function () {
                    $.ajax({
                        type: "GET",
                        url: "https://api.widencollective.com/v2/integrations/url",
                        dataType: 'json',
                        headers: {
                            Authorization: "Bearer " + w.accessToken
                        },
                        data: {}
                    }).done(function (resp) {
                        w.iFrameUrl(resp.url);
                    }).fail(function (e) {
                        console.error(e);
                    }).always(function () {
                        w.loading(false);
                    });
                }
            }

            w.methods.getIFrameUrl();
        }
    }

    self.Options = {
        text: 'Add Widen Image',
        image: 'https://cdn.agilitycms.com/content-manager/custom-field-shared-assets/widen-asset-selector/widen%20favicon.png',
        icon: false,
        onclick: function () {

            //load flyout template
            self.Custom.loadTemplate(function() {
                //open flyout
                self.Custom.openFlyout(function (embed_code) {
                    self.Editor.insertContent(embed_code);
                });
            });
        }
    };
};

ko.bindingHandlers.widenIFrameFromEditor = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var setAsset = function (event) {
            viewModel.item().onSelected(event.data.items[0].embed_code);
            window.removeEventListener('message', setAsset);
            viewModel.close();
        };
        window.addEventListener('message', setAsset);
    }
};

ContentManager.Global.CustomRichTextAreaButtons.push(new WidenAssetButton());
