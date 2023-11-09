export class WalletItem {
    constructor(id, image, name, price, wishlist, colour, details) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;

        this.wishlist = wishlist;
        this.colour = colour;
        this.details = details;
    }
    bookmark(wishlist) {
        this.wishlist = wishlist;
    }
}
