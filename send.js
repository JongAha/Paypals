function formatCurrency(value) {
    // Remove non-numeric and non-period characters.
    const number = value.replace(/[^\d.]/g, '');
    const parts = number.split('.');

    // Format integer part with comma separators.
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Handle decimal part.
    if (parts.length === 1) {
        return parts[0] + '.00';
    } else if (parts[1].length === 0) {
        return parts.join('.') + '00';
    } else if (parts[1].length === 1) {
        return parts[0] + '.' + parts[1] + '0';
    } else {
        return parts.join('.');
    }
}

// Full email list containing 100 addresses
const allEmails = [
    "r7v9u2z1@gmail.com", "q3c8d5x4@outlook.com", "m4w7s9p2@yahoo.com", "j1k8z3a5@hotmail.com",
    "d6l2r9e8@gmail.com", "p7o2i4u3@outlook.com", "x5v1q9n7@yahoo.com", "b3m8c2t6@hotmail.com",
    "f9a4k7r2@gmail.com", "z6e2j3p8@outlook.com", "w8g1u4s9@yahoo.com", "h4b7c6x2@hotmail.com",
    "u2k9m3q5@gmail.com", "n1p8r7z4@outlook.com", "c5d3v8j6@yahoo.com", "s7q4l1a9@hotmail.com",
    "o9f3r7t2@gmail.com", "i2m8b5u3@outlook.com", "l6v9z1n4@yahoo.com", "e3p7k2w8@hotmail.com",
    "t4j1q6c9@gmail.com", "g9d2m5x7@outlook.com", "k7r4b1s8@yahoo.com", "v3u8p2a6@hotmail.com",
    "a2c9m7l4@gmail.com", "o4j8v9p1@outlook.com", "x7k3r2b5@yahoo.com", "f3z8u1n7@hotmail.com",
    "r2i6o9q5@gmail.com", "d7p4w8s1@outlook.com", "m9c2t7l3@yahoo.com", "j5r8a2x6@hotmail.com",
    "z1o7u4q9@gmail.com", "e8k5m2w3@outlook.com", "b6v3t8q7@yahoo.com", "n4r1j5a8@hotmail.com",
    "s2m9x6p7@gmail.com", "u8c3v1l4@outlook.com", "i9b2t7r6@yahoo.com", "q4w5u1j3@hotmail.com",
    "l3z7p2d8@gmail.com", "x8m1r9q4@outlook.com", "o7a5t3u2@yahoo.com", "f2v6n1k8@hotmail.com",
    "r5p9c3a7@gmail.com", "d2j8u6s1@outlook.com", "m7k3t4q9@yahoo.com", "i5b1x8p4@hotmail.com",
    "z3o7v2r8@gmail.com", "w1c6m4a9@outlook.com", "q8u2r7s3@yahoo.com", "n5p1k8d4@hotmail.com",
    "j7m3v9t2@gmail.com", "x2a4u6r5@outlook.com", "f7c1p3o8@yahoo.com", "h2k9m4l6@hotmail.com",
    "s5q8t2u7@gmail.com", "b7d1v3x9@outlook.com", "r9m4p1w8@yahoo.com", "c3a7j5u2@hotmail.com",
    "v1x8k2q5@gmail.com", "o6s4z9m2@outlook.com", "l7c3r1t8@yahoo.com", "i4v5p7d2@hotmail.com",
    "n3k8m2w9@gmail.com", "d9u7r5a1@outlook.com", "q1t8v3j5@yahoo.com", "z7c5m2o4@hotmail.com",
    "w2k9u1r7@gmail.com", "e4t3p8x2@outlook.com", "m6a1v9s4@yahoo.com", "j8c2u7d3@hotmail.com",
    "o5r1p4k8@gmail.com", "x2m7j3q9@outlook.com", "s9t4b1w7@yahoo.com", "h5a2u8r3@hotmail.com",
    "v3m6q1d9@gmail.com", "f4k8p2x7@outlook.com", "r1c9t3u5@yahoo.com", "l8v2m4j7@hotmail.com",
    "q7a3p5r2@gmail.com", "z4k1u8s3@outlook.com", "d2m7q6t1@yahoo.com", "i9c3u5r8@hotmail.com",
    "o1v6p4k7@gmail.com", "s4t2m8w3@outlook.com", "j7r5k1a9@yahoo.com", "x3m9u2t6@hotmail.com",
    "f1d4r8q7@gmail.com", "b8v3p2s5@outlook.com", "n4j7c1u6@yahoo.com", "h2m9t4r8@hotmail.com",
    "q3a7v1p5@gmail.com", "z8u2m6x3@outlook.com", "w1t7k4r2@yahoo.com", "l5d8c1u9@hotmail.com",
    "o7m3p2r5@gmail.com", "i4v8a1t7@outlook.com", "s2k9m5u3@yahoo.com", "d7t1r8q4@hotmail.com"
];

const dataList = document.getElementById("emailSuggestions");

let currentBalance = localStorage.getItem('currentBalance');


const userInput = document.getElementById('userInput');
const amountInput = document.getElementById('amountInput');
const currentUser = document.getElementById('currentUser');
const rechargeButton = document.getElementById('rechargeButton');
const continueButton = document.getElementById('continueButton');
const loadingIndicator = document.getElementById('loadingIndicator');


// userinput
userInput.addEventListener("input", function () {
    const inputValue = this.value.toLowerCase();
    // Filter emails based on the input value (case-insensitive match)
    const filtered = allEmails.filter(email => email.toLowerCase().includes(inputValue));
    // Clear current datalist options
    dataList.innerHTML = "";
    // Append only the first 5 filtered suggestions
    filtered.slice(0, 5).forEach(email => {
        const option = document.createElement("option");
        option.value = email;
        dataList.appendChild(option);
    });
});
// Handle amount input
let inputDigits = ''; // 累计所有用户输入的数字字符

amountInput.addEventListener('focus', function () {
    if (inputDigits === '') {
        this.value = '0.00';
    } else {
        this.value = formatFromDigits(inputDigits);
    }
});

amountInput.addEventListener('blur', function () {
    if (inputDigits === '') {
        this.value = '0.00';
    } else {
        this.value = formatFromDigits(inputDigits);
    }
});

// 监听按键输入（不允许小数点，只记录数字）
amountInput.addEventListener('input', function (e) {
    // 过滤输入为纯数字
    const newChar = e.data;
    if (!newChar || !/^\d$/.test(newChar)) {
        this.value = formatFromDigits(inputDigits);
        return;
    }

    // 累加数字
    inputDigits += newChar;

    // 格式化显示
    this.value = formatFromDigits(inputDigits);
});

// 将纯数字字符串转换成格式化货币字符串
function formatFromDigits(digits) {
    if (!digits) return '0.00';

    // 保证至少3位（前补0），方便切割最后两位为“假小数”
    digits = digits.padStart(3, '0');

    const integer = digits.slice(0, -2);
    const decimal = digits.slice(-2);

    // 加千分位
    const withCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${withCommas}.${decimal}`;
}


rechargeButton.addEventListener('click', async () => {

    if (!userInput.value) {
        alert('Please enter a username.');
        return;
    }

    rechargeButton.disabled = true;
    rechargeButton.innerText = 'Processing...';

    await new Promise(resolve => setTimeout(resolve, 1000));

    userInputContainer = document.getElementById('userInputContainer');
    amountInputContainer = document.getElementById('amountInputContainer');
    currentUser.innerText = userInput.value;
    userInputContainer.style.display = 'none';
    amountInputContainer.style.display = 'flex';

})

continueButton.addEventListener('click', async () => {

    amountInputContainer.style.display = 'none';
    loadingIndicator.style.display = 'block';
    await new Promise(resolve => setTimeout(resolve, 2000));

    const amount = parseFloat(amountInput.value.replace(/[^\d.]/g, ''));
    currentBalance = parseFloat(currentBalance.replace(/[^\d.]/g, ''));

    if (amount > currentBalance) {
        alert('Insufficient balance. Please enter a valid amount.');
        window.location.href = 'index.html';
        return;
    }
    // Update main balance

    const newBalance = currentBalance - amount;

    currentBalance = formatCurrency(newBalance.toString());
    localStorage.setItem('currentBalance', currentBalance);


    //动态改变modal-text中的内容为userInput和amountInput的值
    const modalText = document.getElementById('modalText');
    const currencySymbol = localStorage.getItem('currencySymbol');
    const currencySymbolContent = localStorage.getItem('currencySymbolContent');

    modalText.innerText = `You have sent ${amountInput.value} ${currencySymbol}${currencySymbolContent} to ${userInput.value}.`;

    modalOverlay.classList.add('show'); // Show the modal

    // 记录发送记录
    const sendRecord = {
        title: "Payment Sent",
        details: `Transfer to ${userInput.value}`,
        amount: `-€${amountInput.value}`,
        amountColor: "#333"
    }
    // 将发送记录添加到localStorage
    let activities = JSON.parse(localStorage.getItem("activityCardsData")) || [];
    activities.unshift(sendRecord);
    localStorage.setItem("activityCardsData", JSON.stringify(activities));

    // Reset and close
    loadingIndicator.style.display = 'none';
    rechargeButton.disabled = false;
    rechargeButton.innerText = 'Next';
    amountInput.value = '0.00';
    userInput.value = '';


})

function parseCurrency(formattedValue) {
    // 移除所有逗号并转换为浮点数
    const rawValue = formattedValue.replace(/,/g, '');
    return parseFloat(rawValue);
}


const modalOverlay = document.getElementById('modalOverlay');
// const closeBtn = document.querySelector('.close-btn');
const modal = document.querySelector('.modal');
const sendButton = document.getElementById('sendButton');
const goToButton = document.getElementById('goToButton');

sendButton.addEventListener('click', () => {
    modalOverlay.classList.remove('show');
    userInputContainer = document.getElementById('userInputContainer');
    userInputContainer.style.display = 'block';
    inputDigits=''
});

goToButton.addEventListener('click', () => {
    window.location.href = 'index.html';
    inputDigits=''
})
// Close modal when clicking the close button
// closeBtn.addEventListener('click', () => {
//     modalOverlay.classList.remove('show');
    
// });

// Close modal when clicking outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('show');
    }
});

// Prevent modal close when clicking inside modal
modal.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
        modalOverlay.classList.remove('show');
    }
});



document.addEventListener('DOMContentLoaded', function () {
    // 获取输入框元素
    const topLInput = document.getElementById('topLInput');
    const topRInput = document.getElementById('topRInput');
    const bottomLInput = document.getElementById('bottomLInput');
    const bottomRInput = document.getElementById('bottomRInput');
    const currencySymbolContent = document.getElementById('currencySymbolContent');

    // 加载本地存储的数据
    function loadFromLocalStorage() {
        [topLInput, topRInput, bottomLInput, bottomRInput, currencySymbolContent].forEach(input => {
            const savedValue = localStorage.getItem(input.id);
            if (savedValue) input.value = savedValue;

            // 对右侧输入框进行初始化格式化
            if (input === topRInput || input === bottomRInput) {
                input.value = formatCurrency(input.value);
            }
        });
    }

    // 初始化加载数据
    loadFromLocalStorage();

    // 处理右侧输入框格式化
    function handleRInputFormat(event) {
        const input = event.target;
        const formattedValue = formatCurrency(input.value);
        input.value = formattedValue;
        localStorage.setItem(input.id, formattedValue);
    }

    // 绑定事件监听
    topRInput.addEventListener('blur', handleRInputFormat);
    bottomRInput.addEventListener('blur', handleRInputFormat);

    // 通用存储函数
    function handleInput(event) {
        const input = event.target;
        localStorage.setItem(input.id, input.value);
    }

    // 为所有输入框绑定input事件
    [topLInput, topRInput, bottomLInput, bottomRInput, currencySymbolContent].forEach(input => {
        input.addEventListener('input', handleInput);
    });
});

