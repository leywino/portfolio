const form = document.getElementById("gform");
const username = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const validation = checkInput();
    if (validation) {
        const scriptURL =
            "https://script.google.com/macros/s/AKfycbw5BKHxuTz7s1cI5glyuyWvIf-_IeDcwtWdXCq9YEZp5wxHcgW45jkDvnVc7_36DLa3Qw/exec";

        fetch(scriptURL, { method: "POST", body: new FormData(form) })
            .then((response) => {
                alert("Success!", response);

                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-start",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                Toast.fire({
                    icon: "success",
                    title: "Form Submitted Successfully",
                });

                setTimeout(function () {
                    location.reload();
                }, 3000);
            })
            .catch((error) => {
                console.error("Error!", error.message);
            });
    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-start",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: "error",
            title: "Something Went Wrong",
        });
    }
});

function checkInput() {
    const isvalid = new Array();
    const nameval = username.value;
    const emailval = email.value.trim();
    const subjectval = subject.value.trim();
    const messageval = message.value.trim();

    if (nameval === "" || nameval.match(/^ *$/) !== null) {
        document.getElementById("name-error").innerText =
            "Name cannot be blank.";
        isvalid.push(false);
    } else {
        isvalid.push(true);
    }

    if (emailval === "") {
        document.getElementById("email-error").innerText =
            "Email field can't be blank";
        isvalid.push(false);
    } else if (!isEmail(emailval)) {
        document.getElementById("email-error").innerText =
            "Please enter a valid email";
        isvalid.push(false);
    } else {
        isvalid.push(true);
    }

    if (subjectval === "" || subjectval.match(/^ *$/) !== null) {
        isvalid.push(false);
        document.getElementById("subject-error").innerText =
            "Subject field can't be empty";
    } else {
        isvalid.push(true);
    }

    if (messageval === "" || messageval.match(/^ *$/) !== null) {
        document.getElementById("msg-error").innerText =
            "Message field is empty";
        isvalid.push(false);
    } else {
        isvalid.push(true);
    }

    if (isvalid.includes(false)) return false;
    else return true;
}

function isEmail(email) {
    const filter =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email)) return true;
    else return false;
}