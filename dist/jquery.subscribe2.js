/*
 *  subscribe2 - v0.0.1
 *  A jQuery based email subscription widget with Google forms as backend.
 *
 *  Made by Abhas Tandon
 *  Under MIT License
 */
;
(function($, window, document, undefined) {
    "use strict";
    var pluginName = "subscribe2",
        defaults = {
            buttonText: "Request Invite",
            errorMessages: {
                client: "Please enter a valid email address.",
                server: "Error contacting server"
            },
            options: {
                method: "google",
                formkey: "1eiFxDZOpcyjPo9ub7nIwp6vAKUkLIiOxXIPT1TtQvoQ",
                datakey: "entry.57553044"
            },
            successMessage: "Thanks. We have added you to our list and you will be notified soon."
        };
    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function() {
            this.appendSubscribeBox();
        },
        postForm: function(inputValue) {
            var data = {}, that = this;
            data[this.settings.options.datakey] = inputValue;
            var successCallback = function() {
                that.inputView.css({
                    display: "none"
                });
                that.successMessage.css({
                    display: "block"
                }).html(that.settings.successMessage);
            }
            $.ajax({
                url: "https://docs.google.com/forms/d/" + this.settings.options.formkey + "/formResponse",
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: successCallback,
                    200: successCallback
                },
                data: data
            })
        },
        submitHandler: function() {
            var inputValue = $(this.element).find(".subscribe2-control-input").val();
            if (this.validateEmail(inputValue)) {
                this.errorMessage.css({
                    display: "none"
                });
                this.postForm(inputValue);
            } else {
                this.errorMessage.html(this.settings.errorMessages.client).css({
                    display: "block"
                });
            }
        },
        inputKeyUp: function(event) {
            var inputValue = $(this.element).find(".subscribe2-control-input").val();
            if (event.which === 13) {
                this.submitHandler();
            } else {
                this.errorMessage.css({
                    display: "none"
                });
                if (this.validateEmail(inputValue)) {
                    this.validationStatusIcon.css({
                        display: "block"
                    }).addClass("subscribe2-valid").removeClass("subscribe2-invalid").html("Valid");
                } else {
                    this.validationStatusIcon.css({
                        display: "block"
                    }).addClass("subscribe2-invalid").removeClass("subscribe2-valid").html("Invalid");
                }
            }
        },
        validateEmail: function(value) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value);
        },
        appendSubscribeBox: function() {
            var subscribeInputWrp = $("<div>", {
                class: "subscribe2-input-wrp"
            });
            var subscribeInput = $("<input>", {
                type: "email",
                class: "subscribe2-control-input",
                keyup: this.inputKeyUp.bind(this)
            });
            this.validationStatusIcon = $("<div>", {
                class: "validation-status",
                css: {
                    display: "none"
                }
            });
            subscribeInputWrp.append(subscribeInput, this.validationStatusIcon);
            var subscribeButton = $("<button>", {
                text: this.settings.buttonText,
                class: "subscribe2-btn",
                click: this.submitHandler.bind(this)
            });
            this.errorMessage = $("<div>", {
                class: "subscribe2-error",
                css: {
                    display: "none"
                }
            });
            this.successMessage = $("<div>", {
                class: "subscribe2-success",
                css: {
                    display: "none"
                }
            });
            this.inputView = $("<div>", {
                class: "subscribe2-input-view",
                append: [subscribeInputWrp, subscribeButton, this.errorMessage]
            })
            var subscribeBox = $("<div>", {
                class: "subscribe2-wrp"
            });
            $(this.element).append(subscribeBox.append(this.inputView, this.successMessage));
        }
    });
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);