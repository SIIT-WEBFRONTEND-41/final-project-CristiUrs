export class WalletItem {
    constructor(id, image, name, price, currency, wishlist) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.wishlist = wishlist;
    }
    bookmark(wishlist) {
        this.wishlist = wishlist;
    }
}
