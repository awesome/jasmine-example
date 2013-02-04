describe("Validator", function() {
  var validator;
  beforeEach(function() {
    validator = new Validator();
  });

  describe("#validate", function() {
    describe("when no options passed", function() {
      it("is valid", function() {
        expect(validator.validate("something")).toBeTruthy();
      });
    });

    describe("when validate presence", function() {
      describe("when value present", function() {
        it("is valid", function() {
          expect(validator.validate("something", { presence: true })).toBeTruthy();
        });
        it("error messages is empty", function() {
          validator.validate("something", { presence: true });
          expect(validator.errorMessages()).toEqual([]);
        });
      });

      describe("when value is empty", function() {
        it("is invalid", function() {
          expect(validator.validate("", { presence: true })).toBeFalsy();
        });

        it("error messages contain Cannot be empty", function() {
          validator.validate("", { presence: true })
          expect(validator.errorMessages()).toEqual(["Cannot be empty"]);
        });
      });
    });

    describe("when validate length", function() {
      describe("when value longer than length", function() {
        it("is valid", function() {
          expect(validator.validate("something", { length: 3 })).toBeTruthy();
        });
        it("error messages is empty", function() {
          validator.validate("something", { length: 3 });
          expect(validator.errorMessages()).toEqual([]);
        });
      });

      describe("when value is sortener than length", function() {
        it("is invalid", function() {
          expect(validator.validate("hi", { length: 3 })).toBeFalsy();
        });

        it("error messages contain Is too short", function() {
          validator.validate("hi", { length: 3 })
          expect(validator.errorMessages()).toEqual(["Is too short"]);
        });
      });
    });

    describe("when validate email format", function() {
      describe("when value has a valid email format", function() {
        it("is valid", function() {
          expect(validator.validate("user@example.com", { email: true })).toBeTruthy();
        });
        it("error messages is empty", function() {
          validator.validate("something", { length: 3 });
          expect(validator.errorMessages()).toEqual([]);
        });
      });

      describe("when value hasn't valid email format", function() {
        it("is invalid", function() {
          expect(validator.validate("hi", { email: true })).toBeFalsy();
        });

        it("error messages contain Invalid email format", function() {
          validator.validate("hi", { email: true })
          expect(validator.errorMessages()).toEqual(["Invalid email format"]);
        });
      });
    });
  });

  describe("validates field when field loses focus", function() {
    beforeEach(function() {
      loadFixtures("email.html");
    });

    describe("when valid", function() {
      beforeEach(function() {
        var $email = $("#email");
        $email.validate({email: true});
        $email.val("user@example.com");
        $email.blur();
      });
      it("control-group hasn't error class", function() {
        expect($(".control-group")).not.toHaveClass("error");
      });
      it("don't contans span hint", function() {
        expect($(".controls")).not.toContain("span.help-inline");
      });
    });

    describe("when invalid", function() {
      beforeEach(function() {
        var $email = $("#email");
        $email.validate({email: true});
        $email.val("hi");
        $email.blur();
      });
      it("control-group has error class", function() {
        expect($(".control-group")).toHaveClass("error");
      });
      it("contans span hint", function() {
        expect($(".controls")).toContain("span.help-inline");
      });
      it("span contains text Is too short", function() {
        expect($("span.help-inline")).toHaveText(/Invalid email format/);
      });
    });
  });
});
