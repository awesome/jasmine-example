
function Validator() {
  this.cannotBeEmptyError = "Cannot be empty";
  this.isTooShortError = "Is too short";
  this.invalidEmailFormat = "Invalid email format";
  this.doNotMatch = "Do not match";
  this.errors = [];
  this.emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
}

Validator.prototype.validate = function(value, options) {
  var options = options || {}
  var isValid = true;
  this.errors = [];

  if (options.presence && value == "") {
    isValid = false;
    this.errors.push(this.cannotBeEmptyError);
  }

  if (options.length && value.length < options.length) {
    isValid = false;
    this.errors.push(this.isTooShortError);
  }

  if (options.email && !value.match(this.emailPattern)) {
    isValid = false;
    this.errors.push(this.invalidEmailFormat);
  }

  if (options.compared_with && value != options.compared_with) {
    isValid = false;
    this.errors.push(this.doNotMatch);
  }

  return isValid;
}

Validator.prototype.errorMessages = function() {
  return this.errors;
};

(function($) {
  $.fn.validate = function(options) {
    return this.each(function() {
      var $this = $(this);
      var $group = $this.closest("div.control-group");
      var $wrapper = $this.closest("div");
      $this.on("blur", function() {
        var validator = new Validator();
        $group.removeClass("error");
        $wrapper.children("span.help-inline").remove();
        if (options.compare) {
          options.compared_with = $(options.compare).val();
        }
        if (!validator.validate($this.val(), options)) {
          $group.addClass("error");
          message = validator.errorMessages().join(", ");
          $wrapper.append("<span class='help-inline'>" + message + "</span>");
        }
      });
    });
  };
})(jQuery);

