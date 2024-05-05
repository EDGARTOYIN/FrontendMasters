const getScreenValue = (screen_ref) => {
    return screen_ref.textContent.trim();
};

const getButtonValue = (button_ref) => {
    return button_ref.textContent.trim();
};

// Agrego el evento de onclick a todos los botones de numeros en la calculadora
const AddBtnNumberEvent = ({ button_numbers, screen_number }) => {
    button_numbers.forEach((btn) => {
        btn.addEventListener('click', () => {
            //get the values
            let scr_num = getScreenValue(screen_number);
            let btn_num = getButtonValue(btn);

            if (scr_num === '0') {
                scr_num = btn_num;
                screen_number.textContent = scr_num;
            } else {
                screen_number.textContent = scr_num + btn_num;
            }
        });
    });
};

const AddDeleteEvent = (btn_ref, screen_number) => {
    btn_ref.addEventListener('click', () => {
        if (screen_number.textContent.length > 1) {
            screen_number.textContent = screen_number.textContent.slice(0, screen_number.textContent.length - 1);
        } else {
            screen_number.textContent = '0';
        }
    });
};

const AddClearEvent = (screen_ref, btn_clear) => {
    btn_clear.addEventListener('click', () => {
        screen_ref.textContent = '0';
    });
};

addBtnOperatorEvent = ({ operators, screen_number }) => {
    let n1 = 0;
    let lastOperator = null;

    const operations = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '÷': (x, y) => x / y,
        x: (x, y) => x * y,
    };

    operators.forEach((btn) =>
        btn.addEventListener('click', () => {
            const op = btn.textContent.trim();
            if (op === '=') {
                if (lastOperator) {
                    const func_op = operations[lastOperator];
                    const result = func_op(n1, Number(screen_number.textContent));
                    screen_number.textContent = result;
                    n1 = 0;
                    lastOperator = null;
                }
            } else {
                if (lastOperator) {
                    const func_op = operations[lastOperator];
                    const result = func_op(n1, Number(screen_number.textContent));
                    screen_number.textContent = result;
                    n1 = 0;
                } else {
                    n1 = Number(screen_number.textContent);
                    screen_number.textContent = '0';
                }
                lastOperator = op;
            }
        })
    );
};

const Main = () => {
    // Get Button elements -> screen, numbers, get operators
    const button_numbers = document.querySelectorAll('[data-n]');
    const screen_number = document.querySelector('[data-result]');
    const operators = document.querySelectorAll('[data-operator]');
    const btn_delete = document.querySelector('[data-delete]');
    const btn_clear = document.querySelector('[data-clear]');

    AddBtnNumberEvent({ button_numbers, screen_number });
    addBtnOperatorEvent({ operators, screen_number });
    AddDeleteEvent(btn_delete, screen_number);
    AddClearEvent(screen_number, btn_clear);
};

Main();
