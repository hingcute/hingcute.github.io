/* Hứa Thái Hưng - B1909922 */
//Dựa theo ví dụ nhỏ của thầy


function isExistedInCart(item, arrCart) {
    let myIndex = -1;
    arrCart.forEach((itemCard, index) => {
        if (item.id == itemCard.id) myIndex = index;
    });
    return myIndex;
}

function loadShopingCart() {
    // adding product items to localstorage
    let updatedCart = []; //chứa các mặt hàng hiện có của giỏ hàng 
    const selectedItems = (evt) => {
        const linkClicked = evt.target;
        alert("Đã thêm vào giỏ hàng sản phẩm có mã: " + linkClicked.previousElementSibling.children[0].textContent);
        if (typeof Storage !== undefined) {
            let newItem = {
                id: linkClicked.previousElementSibling.children[0].textContent,
                name: linkClicked.previousElementSibling.children[1].textContent,
                price: linkClicked.previousElementSibling.children[2].textContent,
                quantity: 1
            };

            /*  Kiểm  tra  xem  giỏ  hàng,  cartItems,  
            đã  có  tồn  tại  trong  localStorage  chưa, nếu  chưa  thì  tạo  mới  nó.  */
            if (JSON.parse(localStorage.getItem('cartItems')) === null) {
                updatedCart.push(newItem);
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                window.location.reload();
            } else { //localStorage đã tồn tại
                // convert text into a JavaScript object
                const updatedCart = JSON.parse(localStorage.getItem('cartItems'));
                //Array.isArray(updatedCart) -> true

                /*Trh1: Nếu  newItem.id  đã tồn tại trong giỏ thì cập nhật số lượng  của nó */
                if ((index = isExistedInCart(newItem, updatedCart)) >= 0) {
                    updatedCart[index].quantity++;
                } else { /*Trh2:  Nếu  newItem  chưa  có  mặt  trong  giỏ  hàng  =>  thêm  mới  vào  giỏ*/
                    updatedCart.push(newItem);
                }

                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                window.location.reload();
            }
        } else {
            alert('Local storage is not working on your browser');
        }
    }

    const attachingEvent = evt => evt.addEventListener('click', selectedItems);

    const add2CartLinks = document.getElementsByClassName('btn-buy');
    let arrCartLinks = Array.from(add2CartLinks); //Array.isArray(arrCartLinks)  ->  true 
    arrCartLinks.forEach(attachingEvent);

}

function showCart() {
    if (localStorage.cartItems == undefined) {
        alert('Giỏ hàng chẳng có gì cả :( ');
        location.href = "trangchu.html";
    } else {
        let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
        const tblHead = document.getElementsByTagName('thead')[0];
        const tblBody = document.getElementsByTagName('tbody')[0];
        const tblHFoot = document.getElementsByTagName('tfoot')[0];
        let headColumns = bodyRows = footColumns = '';
        headColumns += '<tr><th>STT</th><th>Mã Sản Phẩm</th><th>Tên Sản Phẩm</th><th>Số Lượng</th><th>Giá</th><th>Loại Bỏ</th> </tr>';
        tblHead.innerHTML = headColumns;

        vat = total = amountPaid = 0;
        no = 0; /*  ordinalNumber  =  0;  */
        if (custommerCart[0] === null) {
            bodyRows += '<tr><td colspan="5">No items found</td></tr>'
        } else {
            custommerCart.forEach(item => {
                total += Number(item.quantity) * Number(item.price.replace(/[^0-9]/g, ""));
                bodyRows += '<tr><td>' + ++no + '</td><td>' + item.id + '</td><td>' + item.name +
                    '</td><td>' + item.quantity + '</td><td>' + formatCurrency(item.price.replace(/[^0-9]/g, "")) + '</td><td><a  href="#" onclick=deleteCart(this);>Delete</a></td></tr>';
            });
        }

        tblBody.innerHTML = bodyRows;

        footColumns += '<tr><td colspan="4">Tổng:</td> <td>' + formatCurrency(total) + '</td><td rowspan="3"></td></tr>';
        footColumns += '<tr><td  colspan="4">Thuế VAT (10%):</td>  <td>' + formatCurrency(Math.floor(total * 0.1)) + '</td></tr>';
        footColumns += '<tr><td  colspan="4">Tổng hóa đơn (đã bao gồm VAT):</td>  <td>' + formatCurrency(Math.floor(1.1 * total)) + '</td></tr>';

        tblHFoot.innerHTML = footColumns;
    }
}

function deleteCart(evt) {
    let updatedCart = [];
    let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
    custommerCart.forEach(item => {
        if (item.id != evt.parentElement.parentElement.children[1].textContent) {
            updatedCart.push(item);
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    window.location.reload();
};

//// 	Currency  &  Percentage  format 	 

const formatCurrency = (amount, locale = "vi-VN") => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
};