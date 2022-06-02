
const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = `${BASE_URL}/catalogData.json`;
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}/getBasket.json`

function service(url) {

return new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    if (xhr.readyState === 4) {
      resolve(JSON.parse(xhr.response))
    }
  }
})
}

class GoodsItem {
  constructor ({ product_name = '', price = ''}) {
    this.title = product_name;
    this.price = price;
  }
render() {
  return `
    <div class="goods-item">
      <h3>${this.title}</h3>
      <p>${this.price}</p>
    </div>
  `;
}
}

class GoodsList {
  items = [];
  filteredItems = []
  fetchGoods() {
    return service(GOODS).then((data) => {
      this.items = data;
      this.filteredItems = data;
      return data;
    });
  }
  filter(str) {
    this.filteredItems = this.items.filter(({ product_name }) => {
      return (new RegExp(str, 'i')).test(product_name);
  })
  }
  calculatePrice() {
    return this.items.reduce((prev, { price }) => prev + price, 0);
  }
  render() {
    const goods = this.filteredItems.map(item => {
      const goodItem = new GoodsItem(item);
      return goodItem.render();
    }).join('');
  
    document.querySelector('.goods-list').innerHTML = goods;
  }
}

class BasketGoods {
  items = [];
  fetchGoods(callback = () => {}) {
    service(GET_BASKET_GOODS_ITEMS, (data) => {
      this.items = data;
      callback()
    });
  }
}

const basketGoods = new BasketGoods ();
basketGoods.fetchGoods();

const goodsList = new GoodsList();
goodsList.fetchGoods(() => {
  goodsList.render();
});

document.getElementsByClassName('search-button')[0].addEventListener('click', () => {
  const input = document.getElementsByClassName('goods-search')[0];
  goodsList.filter(input.value);
  goodsList.render();
})
