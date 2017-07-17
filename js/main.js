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

function checkfileDown(sender) {
  var fileInputDown = document.getElementById('fileInputDownload');
  var fileDisplayAreaDown = document.getElementById('fileDisplayAreaDownload');
  var fileDown = fileInputDown.files[0];
  var validExts = new Array(".txt");
  var fileExt = sender.value;
  fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
  if (validExts.indexOf(fileExt) < 0) {
    alert("You selected {*" + fileExt + "} file, which is not a valid input file for this tool.\nPlease select valid {*" + validExts.toString() + "} file.");
    $(sender).val("");
    fileDisplayAreaDown.value = "";
    return false;
  } else {
    var readerDown = new FileReader();
    readerDown.onload = function (e) {
      fileDisplayAreaDown.value = this.result;
    }
    readerDown.readAsText(fileDown);
  }
}

function checkfileExp(sender) {
  var fileInputExp = document.getElementById('fileInputExport');
  var fileDisplayAreaExp = document.getElementById('fileDisplayAreaExport');
  var fileExp = fileInputExp.files[0];
  var validExts = new Array(".txt");
  var fileExt = sender.value;
  fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
  if (validExts.indexOf(fileExt) < 0) {
    alert("You selected {*" + fileExt + "} file, which is not a valid input file for this tool.\nPlease select valid {*" + validExts.toString() + "} file.");
    $(sender).val("");
    fileDisplayAreaExp.value = "";
    return false;
  } else {
    var readerExp = new FileReader();
    readerExp.onload = function (e) {
      fileDisplayAreaExp.value = this.result;
    }
    readerExp.readAsText(fileExp);
  }
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

function myFunction() {
  var getCommandType = document.getElementById("getCommandType");
  var getSelectedValue = getCommandType.options[getCommandType.selectedIndex].value;
  var getTypeOptionLen = getCommandType.options.length;
  document.getElementById("empty-fields").innerHTML = " Please fill all the required fields to get output.";
  getInput[0].classList.remove("hide");
  if (getSelectedValue === "opt_0") {
    getInput[1].classList.remove("hide");
    for (var i = 2; i < myInputLen; i++) {
      getInput[i].classList.add("hide");
    }
  } else if (getSelectedValue === "opt_1") {
    for (var i = 1; i < myInputLen; i++) {
      if (i === 2) {
        getInput[i].classList.remove("hide");
      } else {
        getInput[i].classList.add("hide");
      }
    }
  } else if (getSelectedValue === "opt_2") {
    for (var i = 1; i < myInputLen; i++) {
      if (i === 3) {
        getInput[i].classList.remove("hide");
      } else {
        getInput[i].classList.add("hide");
      }
    }
  } else if (getSelectedValue === "opt_3") {
    for (var i = 1; i < myInputLen; i++) {
      if (i === 4) {
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

//splitMulti('a=b,c:d', ['=', ',', ':'])
function splitMulti(str, tokens) {
  var tempChar = tokens[0]; // We can use the first token as a temporary join character
  var rex = /\S/;
  for (var i = 0; i < tokens.length; i++) {
    str = str.split(tokens[i]).join(tempChar);
  }
  str = str.split(tempChar);

  return (str.filter(rex.test.bind(rex)));
}

function generateCommand() {
  var branchName = document.getElementById("getBranchName").value;
  var downloadPath = document.getElementById("getDownloadPath").value;
  var exportPath = document.getElementById("getExportPath").value;
  var downloadSitePath = document.getElementById("getDownSitePath").value;
  var exportSitePath = document.getElementById("getExpSitePath").value;
  var getCommandType = document.getElementById("getCommandType");
  var getSelectedValue = getCommandType.options[getCommandType.selectedIndex].value;
  var getOutput = document.getElementsByClassName("getOutput");
  var fileListDown = splitMulti(document.getElementById('fileDisplayAreaDownload').value, [',', '\n', ';', " "]);
  var fileListExp = splitMulti(document.getElementById('fileDisplayAreaExport').value, [',', '\n', ';', " "]);
  var downSiteTag = document.getElementById("getDownSiteTag").value;
  var expSiteTag = document.getElementById("getExpSiteTag").value;
  var fileListDownLen = fileListDown.length;
  var fileListExpLen = fileListExp.length;
  var fileDisplayAreaDown = document.getElementById('fileDisplayAreaDownload').value;
  var fileDisplayAreaExp = document.getElementById('fileDisplayAreaExport').value;
//  var re = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

  console.log(fileListDown || fileListExp);
  if (getSelectedValue === "opt_0") {
    if (branchName === "" || fileDisplayAreaDown === "") {
      alert("Please fill all the required fields first and then click 'Generate' button.");
    } else {
      var downArr = [];

      for (var i = 0; i < fileListDownLen; i++) {
//      var j = i;
//      if (!re.test(fileListDown[i])) {
//        alert("File @ index {" + j++ + "} i.e. {" + fileListDown[i] + "} is not valid.\nPlease rectify the url and try again.\nThanks!");
//        return false;
//      } else {
        downArr += "--file=" + fileListDown[i] + " ";
//      }
      }
      if (downloadPath !== "") {
        getOutput[0].innerText = "goro download --branch=" + branchName + " " + downArr + downloadPath;
      } else {
        getOutput[0].innerText = "goro download --branch=" + branchName + " " + downArr;
      }
      alert("Download Command Generation Successfull.\n\nPlease copy the command and paste it \ninto terminal to download the files.");
    }
  }
  if (getSelectedValue === "opt_1") {
    if (branchName === "" || fileDisplayAreaExp === "") {
      alert("Please fill all the required fields first and then click 'Generate' button.");
    } else {
      var expArr = [];

      for (var i = 0; i < fileListExpLen; i++) {
//      var j = i;
//      if (!re.test(fileListExp[i])) {
//        alert("File @ index {" + j++ + "} i.e. {" + fileListExp[i] + "} is not valid.\nPlease rectify the url and try again.\nThanks!");
//        return false;
//      } else {
        expArr += "--file=" + fileListExp[i] + " ";
//      }
      }
      if (exportPath !== "") {
        getOutput[1].innerText = "goro export --branch=" + branchName + " " + expArr + exportPath;
      } else {
        getOutput[1].innerText = "goro export --branch=" + branchName + " " + expArr;
      }
      alert("Export Command Generation Successfull.\n\nPlease copy the command and paste it \ninto terminal to export the files.");
    }
  }
  if (getSelectedValue === "opt_2") {
    if (branchName === "" || downSiteTag === "") {
      alert("Please fill all the required fields first and then click 'Generate' button.");
    } else {
      if (downloadSitePath !== "") {
        getOutput[2].innerText = "goro download --branch=" + branchName + " --site=" + downSiteTag + " " + downloadSitePath;
      } else {
        getOutput[2].innerText = "goro download --branch=" + branchName + " --site=" + downSiteTag;
      }
      alert("Download Command Generation Successfull.\n\nPlease copy the command and paste it \ninto terminal to download all the files of the site.");
    }
  }
  if (getSelectedValue === "opt_3") {
    if (branchName === "" || expSiteTag === "") {
      alert("Please fill all the required fields first and then click 'Generate' button.");
    } else {
      if (exportSitePath !== "") {
        getOutput[3].innerText = "goro export --branch=" + branchName + " --site=" + expSiteTag + " " + exportSitePath;
      } else {
        getOutput[3].innerText = "goro export --branch=" + branchName + " --site=" + expSiteTag;
      }
      alert("Export Command Generation Successfull.\n\nPlease copy the command and paste it \ninto terminal to export all the files of the site.");
    }
  }
}

function showReply() {
  generateCommand();
  var getCommandType = document.getElementById("getCommandType");
  var getSelectedIndex = getCommandType.selectedIndex;
  var getTypeOptionLen = getCommandType.options.length;

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
  var getCommandType = document.getElementById("getCommandType");
  var getSelectedIndex = getCommandType.selectedIndex;
  var getTypeOptionLen = getCommandType.options.length;
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
