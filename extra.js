// const scriptURL = 'https://script.google.com/macros/s/AKfycbwL2KG6SNG4-gmcpqFUqdXOZKWmK-Pln2pT0Qc6QUDk_uQi9aiT79mBq-xpAQjut2aA8A/exec'; // your actual deployed Apps Script URL

// const form = document.forms['contact-form'];
// const submitButton = document.getElementById('contact_us_send');

// form.addEventListener('submit', e => {
//   e.preventDefault();

//   submitButton.disabled = true;
//   submitButton.innerText = 'Submitting...';

//   fetch(scriptURL, { method: 'POST', body: new FormData(form) })
//     .then(response => response.json())
//     .then(data => {
//       if (data.result === 'success') {
//         alert("Thank you! Form is submitted");
//         form.reset();
//         document.querySelector(".modal-main").classList.remove("active");
//       } else {
//         alert("Submission failed. Please try again.");
//         console.error('Error data:', data);
//       }
//     })
//     .catch(error => {
//       console.error('Error!', error.message);
//       alert("There was an error submitting the form. Please try again.");
//     })
//     .finally(() => {
//       submitButton.disabled = false;
//       submitButton.innerText = 'Send and get a quick response';
//     });
// });

const scriptURL = 'https://script.google.com/macros/s/AKfycbzBuhLU2T_r5LLJp4Y3xhpk1qW74ya1XG_r_lvoWKFMMuD22yvq2cVMDkVrdryLx0mXsA/exec';
const crmURL = 'https://apps.kpi.com/services/api/v3/leads/create';

const form = document.forms['contact-form'];
const submitButton = document.getElementById('contact_us_send');

form.addEventListener('submit', e => {
  e.preventDefault();

  submitButton.disabled = true;
  submitButton.innerText = 'Submitting...';

  const formData = new FormData(form);
  const companyName = formData.get('company-name');
  const companyEmail = formData.get('company-email');
  const message = formData.get('message');

  // send to google Sheet
  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => response.text())
    .then(text => {
      const data = JSON.parse(text);

      // KPI CRM API
      const crmPayload = {
        assigneeId: 0,
        firstName: "Zamira",
        lastName: "",
        middleName: "",
        otherName: "",
        jobTitle: "string",
        department: "string",
        refIndNumber: "string",
        assets: "string",
        accountIndustry: "string",
        telegram: "string",
        imAddresses: ["string"],
        webAddresses: ["string"],
        emails: [{
          email: companyEmail,
          primary: true
        }],
        companyId: 0,
        status: "string",
        source: "retouch.garage.com",
        campaignId: 0,
        phoneNumbers: [{
          phoneCategory: "VIBER",
          number: "string",
          primary: true
        }],
        addresses: [{
          addressType: "HOME",
          name: companyName,
          addressLine: "string",
          addressLine2: "string",
          city: "string",
          country: "string",
          state: "string",
          postcode: "string",
          primary: true
        }],
        customFields: [{
          alias: "message",
          value: message
        }],
        industry: {
          id: 0,
          code: "string",
          objectKey: "string"
        },
        entityId: 0
      };

      return fetch(crmURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accessToken': '941F87FF-730D-4E94-AEF1-19418323D941',
          'x-auth': 'FREE$327733$IvZbXhQ-vEFttEBle7_u0Q'
        },
        body: JSON.stringify(crmPayload)
      });
    })
    .then(crmRes => {
      if (crmRes && crmRes.ok) {
        alert("Thank you! Your info was sent to CRM too.");
        form.reset();
      } else {
        alert("Form sent to sheet, but failed to send to CRM.");
        console.error("CRM response error");
      }
    })
    .catch(error => {
      console.error('Submission error!', error.message);
      alert("There was an error submitting the form.");
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.innerText = 'Send and get a quick response';
    });
});



document.getElementById("contact_us_2_send").addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("contact_us_2_email");
    const file = document.getElementById("contact_us_2_upload");
    const name = document.getElementById("contact_us_2_name");
    const message = document.getElementById("contact_us_2_msg");
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
        sendEmail("", message.value, name.value, email.value, window.location.href, photo);
        email.value = "";
        document.querySelectorAll(".modal-upload")[0].classList.remove("active");
    });
});

// pass another modal
document.querySelector('#pass_to_another_modal').addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector('.modal-upload').classList.remove('active');
    document.querySelector('.modal-main').classList.add('active');
})

document.querySelector('.close-modal-icon').addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector('.modal-upload').classList.remove('active');
})
// pass another modal

// Link modal
// window.addEventListener('DOMContentLoaded', function(event){
//     const urlSearchParams = new URLSearchParams(window.location.search);
//     const params = Object.fromEntries(urlSearchParams.entries());
//     if(urlSearchParams.has('modal')){
//         document.querySelector('.modal-upload').classList.add('active');
//     }
// })
document.body.style.overflow = 'auto';
// Link modal

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