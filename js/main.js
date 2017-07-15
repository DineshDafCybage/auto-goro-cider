"use strict";
window.onload = init;
function init() {
  var warnCloseBtn = document.getElementById("close-warning");
  var showReplyBtn = document.getElementById("show-reply");
  warnCloseBtn.addEventListener("click", closeWarning);
  showReplyBtn.addEventListener("click", showReply);
  assignCopy();
  resetPage();
}

$(document).ready(function () {
  $('select').material_select();
});
function closeWarning() {
  var warnContent = document.getElementsByClassName("warn-content")[0];
  warnContent.classList.add("hide");
}

var inputTable = document.getElementById("table");
var myInput = document.getElementsByClassName(" my-input");
var myOutput = document.getElementsByClassName(" my-output");
var myInputLen = myInput.length;
var myOutputLen = myOutput.length;
var getInput = [];
var getReply = [];
for (var i = 0; i < myInputLen; i++) {
  getInput[i] = document.getElementById("input" + i);
}
for (var i = 0; i < myOutputLen; i++) {
  getReply[i] = document.getElementById("reply" + i);
}
var recSen = document.getElementsByClassName("rec-sen")[0];
function myFunction() {
  var getReplyType = document.getElementById("getReplyType");
  var getSelectedValue = getReplyType.options[getReplyType.selectedIndex].value;
  var getTypeOptionLen = getReplyType.options.length;
  document.getElementById("empty-fields").innerHTML = " Please fill all the required fields to get output.";
  getInput[0].classList.remove("hide");
  if (getSelectedValue === "opt_0") {
    getInput[1].classList.remove("hide");
    for (var i = 2; i < myInputLen; i++) {
      getInput[i].classList.add("hide");
    }
  } else if (getSelectedValue === "opt_1") {
    for (var i = 1; i < myInputLen; i++) {
      getInput[i].classList.add("hide");
    }
  } else if (getSelectedValue === "opt_2") {
    for (var i = 1; i < myInputLen; i++) {
      if (i === 3 || i === 5) {
        getInput[i].classList.remove("hide");
      } else {
        getInput[i].classList.add("hide");
      }
    }
  } else if (getSelectedValue === "opt_3" || getSelectedValue === "opt_4" || getSelectedValue === "opt_5" || getSelectedValue === "opt_7" || getSelectedValue === "opt_8") {
    for (var i = 1; i < myInputLen; i++) {
      if (i === 3) {
        getInput[i].classList.remove("hide");
      } else {
        getInput[i].classList.add("hide");
      }
    }
  } else if (getSelectedValue === "opt_6") {
    for (var i = 1; i < myInputLen; i++) {
      if (i === 1 || i === 5) {
        getInput[i].classList.add("hide");
      } else {
        getInput[i].classList.remove("hide");
      }
    }
  } else if (getSelectedValue === "opt_9") {
    for (var i = 1; i < myInputLen; i++) {
      if (i % 3 === 0) {
        getInput[i].classList.remove("hide");
      } else {
        getInput[i].classList.add("hide");
      }
    }
  } else {
    getReply[0].classList.remove("hide");
  }
  for (var i = 0; i < getTypeOptionLen; i++) {
    if (i === 0) {
      getReply[i].classList.remove("hide");
    } else {
      getReply[i].classList.add("hide");
    }
  }
}

function showReply() {
  var getReplyType = document.getElementById("getReplyType");
  var getSelectedIndex = getReplyType.selectedIndex;
  var getTypeOptionLen = getReplyType.options.length;
  if (getSelectedIndex === 0) {
    getReply[0].classList.remove("hide");
  } else {
    getReply[0].classList.add("hide");
  }
  for (var i = 1; i < getTypeOptionLen; i++) {
    if (i === getSelectedIndex) {
      getReply[i].classList.remove("hide");
    } else {
      getReply[i].classList.add("hide");
    }
  }
}

function assignCopy() {
  var getCopyOutButton = document.getElementsByClassName('copy-data');
  var getCopyLen = getCopyOutButton.length;
  for (var i = 0; i < getCopyLen; i++) {
    getCopyOutButton[i].addEventListener("click", copying);
  }
}

function copying() {
  var getReplyType = document.getElementById("getReplyType");
  var getSelectedIndex = getReplyType.selectedIndex;
  var getTypeOptionLen = getReplyType.options.length;
  var node = document.getElementsByClassName('getOutput');
  for (var i = 0; i < getTypeOptionLen; i++) {
    if (i === getSelectedIndex) {
      var text = node[i - 1].textContent || node[i - 1].innerText;
      var filteredText = text.replace(/^\s*/gm, '');
      copyClipboard(filteredText);
    }
  }
}

function copyClipboard(selected) {
// creating new textarea element and giveing it id 't'
  var t = document.createElement('textarea');
  t.id = 't';
  // Optional step to make less noise in the page, if any!
  t.style.height = 0;
  // You have to append it to your page somewhere, I chose <body>
  document.body.appendChild(t);
  // Copy whatever is in your div to our new textarea
  t.value = selected;
  // Now copy whatever inside the textarea to clipboard
  var selector = document.querySelector('#t');
  selector.select();
  document.execCommand('copy');
  // Remove the textarea
  document.body.removeChild(t);
  alert('Text copied Successfully!!!');
}

var resetPages = document.getElementsByClassName("reset-page");
function resetPage() {
  var resetPageLen = resetPages.length;
  for (var i = 0; i < resetPageLen; i++) {
    resetPages[i].addEventListener("click", reloadPage);
  }
}

function reloadPage() {
  location.reload();
  document.getElementsByClassName("input-section")[0].scrollIntoView(true);
}
