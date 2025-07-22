const scriptURL = 'https://script.google.com/macros/s/AKfycbzBuhLU2T_r5LLJp4Y3xhpk1qW74ya1XG_r_lvoWKFMMuD22yvq2cVMDkVrdryLx0mXsA/exec';
const form = document.forms['contact-form'];
const submitButton = document.getElementById('submit');

form.addEventListener('submit', e => {
  e.preventDefault();

  submitButton.disabled = true;
  submitButton.innerText = 'Submitting...';

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => response.text())
    .then(text => {
      const data = JSON.parse(text);
      if (data.result === 'success') {
        alert("Thank you! Form is submitted");
        form.reset();
      } else {
        alert("Submission failed. Please try again.");
        console.error('Error data:', data);
      }
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert("There was an error submitting the form. Please try again.");
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.innerText = 'Send';
    });
});
