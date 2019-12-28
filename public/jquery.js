$(document).ready(function() {
  $("button#details-button").click(function() {
    // $.get("http://directory.com/viewDetails");

    window.location.href = "viewDetails";
  });
  $("button#rules-button").click(function() {
    window.location.href = "viewRulesDetails";
  });
  $('input[type="submit"]').click(function(event) {
    event.preventDefault();
    console.log("u clicked me, hooray");
    console.log($(this).attr("id"));
    let url = "/post";
    let formId = "my-form";
    let id = $(this).attr("id");
    if (id == "submitForRules") {
      url = "/postRules";
      formId = "rules-form";
    }
    let dataId = "#" + String(formId);
    var request = $.ajax({
      url: url,
      type: "POST",
      data: $(dataId).serialize(),
      dataType: "json",
      success: function(data) {
        console.log(data);
        var message = $("<p id = 'message'> </p>");
        message.text("Successfuly Submitted!");
        let selector = "#" + String(id);
        message.insertAfter($(selector));
        message.css({
          color: "green",
          "background-color": "yellow",
          "font-size": "130%",
          "border-radius": "90%",
          "text-align": "center",
          width: "260px"
        });

        message.fadeOut(1500);
      }
    });
  });
  $("button#show-complaints").click(function() {
    console.log("click complaints success");
    id = $(this).attr("id");
    if (id == "show-complaints") {
      $("#rules-form").show("5");
      $(this).text("Hide Rules Form");
      $(this).attr("id", "hide-complaints");
    } else {
      $(this).attr("id", "show-complaints");
      $(this).text("Show Rules Form");
      $("#rules-form").hide("5");
    }
  });
  $("button#hide").click(function() {
    id = $(this).attr("id");
    if (id == "hide") {
      $("#my-form").show("5");
      $(this).text("Hide Form");
      $(this).attr("id", "show");
      console.log("hide clause");
    } else {
      console.log("show clause");
      $(this).attr("id", "hide");
      $("#my-form").hide("5");
      $(this).text("Show Form");
    }
  });
});
