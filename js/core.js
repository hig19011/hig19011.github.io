let lastModified = document.lastModified;
document.getElementById("lastModified").innerHTML = lastModified;
let modified = new Date(lastModified);
let currentYear = modified.getFullYear();
document.getElementById("copywriteYear").innerHTML = currentYear;