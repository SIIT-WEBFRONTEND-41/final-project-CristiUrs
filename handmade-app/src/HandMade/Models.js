export class WalletItem {
    constructor(id, image, name, price, currency, wishlist, details) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.wishlist = wishlist;
        this.details = details;
    }
    bookmark(wishlist) {
        this.wishlist = wishlist;
    }
}
