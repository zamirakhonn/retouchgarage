// const scriptURL = 'https://script.google.com/macros/s/AKfycbzBuhLU2T_r5LLJp4Y3xhpk1qW74ya1XG_r_lvoWKFMMuD22yvq2cVMDkVrdryLx0mXsA/exec';
// const form = document.forms['contact-form'];
// const submitButton = document.getElementById('submit');

// form.addEventListener('submit', e => {
//   e.preventDefault();

//   submitButton.disabled = true;
//   submitButton.innerText = 'Submitting...';

//   fetch(scriptURL, { method: 'POST', body: new FormData(form) })
//     .then(response => response.text())
//     .then(text => {
//       const data = JSON.parse(text);
//       if (data.result === 'success') {
//         alert("Thank you! Form is submitted");
//         form.reset();
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
//       submitButton.innerText = 'Send';
//     });
// });


const scriptURL = 'https://script.google.com/macros/s/AKfycbzBuhLU2T_r5LLJp4Y3xhpk1qW74ya1XG_r_lvoWKFMMuD22yvq2cVMDkVrdryLx0mXsA/exec';
const crmURL = 'http://apps.kpi.com/services/api/v3/leads/create';

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

