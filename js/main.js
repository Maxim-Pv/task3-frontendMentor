const inputValue = document.getElementById('input');
const persentBtn = document.querySelectorAll('.percent__btn');
const outputTotal = document.getElementById('total');
const outputTipAmount = document.getElementById('tipAmount');
const inputPerson = document.getElementById('inputPerson');
const resetButton = document.querySelector('.btn-reset');
const alertLabel = document.querySelector('.alert-label');
const customInput = document.querySelector('.custom__input');

function updateValues() {
    if (!inputValue.value) return
    inputValue.value = Number(inputValue.value).toFixed(2);
    inputValue.value =  inputValue.value.replace(/(\.?0+)$/, ''); 

    let total = Number(inputValue.value) * Number(this.value);
    let tipAmount = Number(inputPerson.value);

    outputTotal.textContent = '$' + Number(total.toFixed(2))
    
    resetButton.classList.add('btn-reset-ready');

    if (Number(inputPerson.value) < 1 ) {
        window.getComputedStyle(alertLabel).getPropertyValue('display');
        alertLabel.style.display = 'block';
        inputPerson.classList.add('alert-input')
        outputTipAmount.textContent = '$0.00';
        outputTotal.textContent = '$0.00';
    } else {
        inputPerson.value = parseInt(inputPerson.value, 10);
        alertLabel.style.display = 'none';
        outputTipAmount.textContent = '$' + Number((total / tipAmount).toFixed(2));           
        inputPerson.classList.remove('alert-input');
    };
};

function customInputChanged() {
    if (Number(customInput.value) < 1 || Number(customInput.value) > 100) {
        customInput.value = '';
    } else {
        updateValues.call({ value: customInput.value / 100 });
    };
};

function resetValues() {
    resetButton.classList.remove('btn-reset-ready');
    inputValue.value = '';
    inputPerson.value = '';
    customInput.value = '';

    outputTipAmount.textContent = '$0.00';
    outputTotal.textContent = '$0.00';
    
    inputPerson.classList.remove('alert-input');
    alertLabel.style.display = 'none';
};

inputValue.addEventListener('change', () => {
    if (!inputValue.value) {
        alertLabel.style.display = 'none';
        inputPerson.classList.remove('alert-input');
        inputPerson.value = '';
        resetButton.classList.remove('btn-reset-ready');
    }
})

persentBtn.forEach((btn) => {
    btn.addEventListener('click', updateValues.bind(btn));
});

customInput.addEventListener('change', customInputChanged);

resetButton.addEventListener('click', resetValues);