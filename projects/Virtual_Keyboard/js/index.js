window.addEventListener("load", function () {
    const darkSwitch = document.querySelector("#darkSwitch");
    const cssLink = document.querySelector("#link");
    const buttons = document.querySelectorAll("input[type=button]");
    const textOutput = document.querySelector("#text-output");
    const capsLock = document.querySelector("#caps-lock");
    const circle = document.querySelector(".circle");
    let specials = document.querySelectorAll(".special")
    let isCapsLock = false;

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
        if (isCapsLock === false) {
            circle.style.backgroundColor = "green";
            isCapsLock = true;

            document.querySelectorAll(".letter").forEach(button =>
                button.value = button.value.toUpperCase()
            )

            for (let i = 0; i < specials.length; i++) {
                specials[i].value = majArray[i];
            }

        } else {
            circle.style.backgroundColor = "red";
            isCapsLock = false;

            document.querySelectorAll(".letter").forEach(button =>
                button.value = button.value.toLowerCase()
            )

            for (let i = 0; i < specials.length; i++) {
                specials[i].value = minArray[i];
            }
        }
    });

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
                    textOutput.value += this.value;
            }
        })
    )

})