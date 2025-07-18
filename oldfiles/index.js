function sendEmail(subject, message, company, email, page, photo = "") {
    let text = "";
    if (subject !== "") {
        text += `Topic > ${subject}<br/>`;
    }
    if (company !== "") {
        text += `(Company) Name: ${company}<br/>`;
    }
    if (email !== "") {
        text += `E-mail: ${email}<br/><br/>`;
    }
    if (message !== "") {
        text += `Message: ${message}<br/><br/>`;
    }
    text += `Page: ${page}
    `;

    if (photo !== "") text += `<br/>Photo link ${photo}`;

    Email.send({
        Host: "smtp.gmail.com",
        Username: "retouchgarage@gmail.com",
        Password: "retouchgarage@2021@",
        To: "teamwork.uz@gmail.com",
        From: "retouchgarage@gmail.com",
        Subject: "Retouch Garage new request",
        Body: text,
    });

    Email.send({
        Host: "smtp.gmail.com",
        Username: "retouchgarage@gmail.com",
        Password: "retouchgarage@2021@",
        To: "Jamil@finnetlimited.com",
        From: "retouchgarage@gmail.com",
        Subject: "Retouch Garage new request",
        Body: text,
    });

    document.querySelectorAll(".modal-success")[0].classList.add("active");
}