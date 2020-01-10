var lastModified = document.lastModified;
document.getElementById("lastModified").innerHTML = lastModified;
var modified = new Date(lastModified);
var currentYear = modified.getFullYear();
document.getElementById("copywriteYear").innerHTML = currentYear;