const contactUsBtn = document.getElementById("contact_us_send");
contactUsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const companyName = document.getElementById("contact_us_name");
    const email = document.getElementById("contact_us_email");
    const message = document.getElementById("contact_us_message");
    if (email.value === "") {
        document.getElementById("em").style.display = "block";
        return;
    };
    sendEmail("", message.value, companyName.value, email.value, window.location.href);
    companyName.value = "";
    email.value = "";
    message.value = "";
    document.querySelectorAll(".modal-main")[0].classList.remove("active");
});

document.getElementById("contact_us_2_send").addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("contact_us_2_email");
    const file = document.getElementById("contact_us_2_upload");
    if (email.value === "") {
        document.getElementById("em2").style.display = "block";
        return;
    };
    let formData = new FormData();
    formData.append("file", file.files[0]);
    let url = window.location.href.split("/");
    let fullurl = "";
    for (var i = 0; i < url.length; i++) {
        if (url[i].endsWith(".ru") || url[i].endsWith(".uz") || url[i].endsWith(".com")) {
            fullurl = "https://" + url[i];
        }
    }
    photo = `${fullurl}/upload/${file.files[0].name}`;
    fetch(`${fullurl}/upload.php`, { method: "POST", body: formData }).then(res => {
        sendEmail("", "", "", email.value, window.location.href, photo);
        email.value = "";
        document.querySelectorAll(".modal-upload")[0].classList.remove("active");
    });
});

document.getElementById("contact_us_2_upload").addEventListener("change", () => {
    if (document.getElementById("contact_us_2_upload").files.length > 0) {
        document.getElementById("pls-img").style.display = "none";
        document.getElementById("upt").style.display = "none";
        document.getElementById("fch").style.display = "block";
        document.getElementById("fn").innerText = document.getElementById("contact_us_2_upload").files[0].name;
    } else {
        document.getElementById("pls-img").style.display = "block";
        document.getElementById("upt").style.display = "block";
        document.getElementById("fch").style.display = "none";
        document.getElementById("fn").innerText = "";

    }
});

document.getElementById("contact_us_2_email").addEventListener("input", () => {
    if (document.getElementById("contact_us_2_email").value !== "") {
        document.getElementById("em2").style.display = "none";
    } else {
        document.getElementById("em2").style.display = "block";
    }
});

document.getElementById("contact_us_email").addEventListener("input", () => {
    if (document.getElementById("contact_us_email").value !== "") {
        document.getElementById("em").style.display = "none";
    } else {
        document.getElementById("em").style.display = "block";
    }
});

window.onload = () => {
    document.getElementById("em").style.margin = "10px";
    document.getElementById("em2").style.margin = "10px";
}