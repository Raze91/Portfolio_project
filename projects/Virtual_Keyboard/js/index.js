window.addEventListener("load", function () {
    const darkSwitch = document.querySelector("#darkSwitch");
    const cssLink = document.querySelector("#link");
    const buttons = document.querySelectorAll("input[type=button]");
    const textOutput = document.querySelector("#text-output");
    const capsLock = document.querySelector("#caps-lock");
    const capsCircle = document.querySelector(".capsCircle");
    const shift = document.querySelector("#shift");
    const shiftCircle = document.querySelector(".shiftCircle");
    let specials = document.querySelectorAll(".special")
    let isCapsLock = false;
    let isShift = false;

    let majArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "°", "+", "¨", "£", "%", "µ", ">", "?", ".", "/", "§"];
    let minArray = ["&", "é", "\"", "'", "(", "-", "è", "_", "ç", "à", ")", "=", "^", "$", "ù", "*", "<", ",", ";", ":", "!"];

    // Dark Mode 
    cssLink.href = "css/keyboard-dark.css";
    darkSwitch.addEventListener("click", function () {
        if (this.checked === true) {
            cssLink.href = "css/keyboard-dark.css";
        } else {
            cssLink.href = "css/keyboard-light.css";
        }
    });

    // Caps Lock
    capsLock.addEventListener("click", function () {
        togglecapsLock();
        capsLocked(isCapsLock, capsCircle);
    });

    // Shift
    shift.addEventListener("click", function () {
        toggleShift();
        capsLocked(isShift, shiftCircle);
    })

    function capsLocked(boolean, circle) {
        if (boolean === true) {
            circle.style.backgroundColor = "green";

            document.querySelectorAll(".letter").forEach(button =>
                button.value = button.value.toUpperCase()
            )

            for (let i = 0; i < specials.length; i++) {
                specials[i].value = majArray[i];
            }
        } else {
            circle.style.backgroundColor = "red";
            if (isCapsLock === false) {
                document.querySelectorAll(".letter").forEach(button =>
                    button.value = button.value.toLowerCase()
                )
                for (let i = 0; i < specials.length; i++) {
                    specials[i].value = minArray[i];
                }
            }
        }
    }

    function togglecapsLock() {
        isCapsLock = !isCapsLock;
    }
    function toggleShift() {
        isShift = !isShift;
    }

    // onclick
    buttons.forEach(button =>
        button.addEventListener("click", function () {
            switch (this.value) {
                case "SPACE":
                    textOutput.value += " ";
                    break;
                case "Delete":
                    textOutput.value = textOutput.value.substring(0, textOutput.value.length - 1);
                    break;
                case "Enter":
                    textOutput.value += "\n";
                    break;
                case "Tab":
                    textOutput.value += "   "
                    break;
                default:
                    if (isShift === true) {
                        toggleShift();
                        textOutput.value += this.value;
                        capsLocked(isShift, shiftCircle)
                    } else {
                        textOutput.value += this.value;
                    }

            }
        })
    )

})